export type ParsedResume = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  experiences?: Array<{
    workTitle: string;
    duration: string;
    description: string;
  }>;
};

async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".txt")) {
    return file.text();
  }

  // Mammoth only supports OpenXML .docx (zip-based), not legacy binary .doc
  if (name.endsWith(".doc") && !name.endsWith(".docx")) {
    throw new Error(
      "Legacy .doc files are not supported for autofill. Please upload a .docx or PDF resume.",
    );
  }

  if (name.endsWith(".docx")) {
    try {
      const mammoth = await import("mammoth");
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value || "";
    } catch {
      throw new Error(
        "Unable to read this Word file. Please try a .docx or PDF resume.",
      );
    }
  }

  if (name.endsWith(".pdf")) {
    try {
      const pdfjs = await import("pdfjs-dist");
      // Vite-friendly worker URL from the installed package
      const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data }).promise;
      const pages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        pages.push(pageText);
      }

      return pages.join("\n");
    } catch {
      throw new Error(
        "Unable to read this PDF. Please try another file or fill the form manually.",
      );
    }
  }

  return file.text();
}

function firstMatch(text: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return undefined;
}

export async function parseResumeFile(file: File): Promise<ParsedResume> {
  let raw: string;
  try {
    raw = await extractTextFromFile(file);
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }
    throw new Error(
      "Unable to parse this resume. Please use a .docx or PDF file, or fill the form manually.",
    );
  }

  const text = raw.replace(/\r/g, "\n").replace(/[ \t]+/g, " ").trim();
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const email = firstMatch(text, [
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
  ]);

  const phone = firstMatch(text, [
    /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}(?:[\s-]?\d{3,4})?/,
  ])?.replace(/[^\d+]/g, " ").replace(/\s+/g, " ").trim();

  let firstName: string | undefined;
  let lastName: string | undefined;
  const nameLine = lines.find(
    (line) =>
      !line.includes("@") &&
      !/\d{5,}/.test(line) &&
      /^[A-Za-z][A-Za-z .'-]{2,40}$/.test(line) &&
      line.split(" ").length >= 2 &&
      line.split(" ").length <= 4,
  );

  if (nameLine) {
    const parts = nameLine.split(/\s+/);
    firstName = parts[0];
    lastName = parts.slice(1).join(" ");
  }

  const zipCode = firstMatch(text, [
    /\b(\d{5}(?:-\d{4})?)\b/,
    /\b(\d{6})\b/,
  ]);

  const address1 = firstMatch(text, [
    /((?:\d+[A-Za-z]?\s+)?[A-Za-z0-9 .,'-]{8,60}(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Boulevard|Blvd|Drive|Dr|Colony|Nagar|Society)\.?)/i,
  ]);

  const cityState = firstMatch(text, [
    /([A-Za-z .]+),\s*([A-Za-z .]+)\s+\d{5,6}/,
  ]);
  let city: string | undefined;
  let state: string | undefined;
  if (cityState) {
    const parts = cityState.split(",").map((p) => p.trim());
    city = parts[0];
    state = parts[1]?.replace(/\d.*/, "").trim();
  }

  const experiences: ParsedResume["experiences"] = [];
  const experienceBlock = text.match(
    /(?:experience|work experience|employment)([\s\S]{0,1200})(?:education|skills|projects|$)/i,
  );

  if (experienceBlock?.[1]) {
    const chunk = experienceBlock[1];
    const titleMatch = chunk.match(
      /([A-Za-z][A-Za-z /&-]{2,40})\s*(?:\||-|–|,)?\s*(?:at|@)?\s*[A-Za-z0-9 .&-]{0,40}/,
    );
    const durationMatch = chunk.match(
      /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\s*[-–to]+\s*(?:Present|Current|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4})|\d{4}\s*[-–to]+\s*(?:Present|Current|\d{4}))/i,
    );

    if (titleMatch || durationMatch) {
      experiences.push({
        workTitle: titleMatch?.[1]?.trim() || "",
        duration: durationMatch?.[1]?.trim() || "",
        description: chunk.replace(/\s+/g, " ").trim().slice(0, 500),
      });
    }
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    address1,
    city,
    state,
    zipCode,
    experiences: experiences.length ? experiences : undefined,
  };
}
