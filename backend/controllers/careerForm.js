import {
  createCareerApplication,
  deleteAllCareerApplications,
  deleteCareerApplication,
  listCareerApplications,
} from "../module/careerModules.js";
import { storeCvFile } from "../middleware/upload.js";

function requiredFields(body) {
  const missing = [];
  if (!body.fullName?.trim()) missing.push("fullName");
  if (!body.email?.trim()) missing.push("email");
  if (!body.phone?.trim()) missing.push("phone");
  return missing;
}

export async function careerForm(req, res) {
  try {
    const missing = requiredFields(req.body);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required (PDF, DOC, or DOCX).",
      });
    }

    const email = String(req.body.email).trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const storedCv = await storeCvFile(req.file, req);

    if (!storedCv.cvUrl) {
      return res.status(500).json({
        success: false,
        message: "Unable to store resume file. Please try again.",
      });
    }

    const application = await createCareerApplication({
      fullName: String(req.body.fullName).trim(),
      email,
      phone: String(req.body.phone).trim(),
      jobTitle: req.body.jobTitle?.trim() || "",
      education: req.body.education?.trim() || "",
      expertise: req.body.expertise?.trim() || "",
      message: req.body.message?.trim() || "",
      cvFilename: storedCv.cvFilename,
      cvPath: storedCv.cvPath,
      cvUrl: storedCv.cvUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Your application was sent successfully. Our team will contact you soon.",
      data: application,
    });
  } catch (error) {
    console.error("Career form submit error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to submit your application right now. Please try again.",
    });
  }
}

export async function getCareerApplications(_req, res) {
  try {
    const applications = await listCareerApplications();
    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("List career applications error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load applications right now.",
    });
  }
}

export async function removeCareerApplication(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid application id.",
      });
    }

    const deleted = await deleteCareerApplication(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted.",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error("Delete career application error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete application right now.",
    });
  }
}

export async function removeAllCareerApplications(_req, res) {
  try {
    const deletedCount = await deleteAllCareerApplications();
    return res.status(200).json({
      success: true,
      message:
        deletedCount > 0
          ? `${deletedCount} application(s) deleted.`
          : "No applications to delete.",
      data: { deletedCount },
    });
  } catch (error) {
    console.error("Delete all career applications error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete applications right now.",
    });
  }
}
