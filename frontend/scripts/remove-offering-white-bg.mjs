import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets/OurServices");

/** Near-white margins only (UI/UX + website cards that keep a blue rounded panel) */
const whiteMarginFiles = [
  "product-discovery.png",
  "wireframes.png",
  "high-fidelty.png",
  "interactive-prototypes.png",
  "responsive.png",
  "handoff.png",
  "corporate.png",
  "cms.png",
  "seo.png",
  "integration-forums.png",
  "ongoing.png",
];

/** Pale blue-grey full-canvas margins (mobile / ecommerce offering art) */
const paleMarginFiles = [
  "iosandroid.png",
  "cross-platform.png",
  "mvp-scale.png",
  "api-backend.png",
  "push-notification.png",
  "launch-support.png",
  "catalog.png",
  "promotion.png",
  "order-fullfilment.png",
  "landingpages-conversion.png",
];

function isNearWhite(data, pixelIndex) {
  const r = data[pixelIndex];
  const g = data[pixelIndex + 1];
  const b = data[pixelIndex + 2];
  return r >= 248 && g >= 248 && b >= 248;
}

function isPaleBlueGrey(data, pixelIndex) {
  const r = data[pixelIndex];
  const g = data[pixelIndex + 1];
  const b = data[pixelIndex + 2];
  if (isNearWhite(data, pixelIndex)) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const isPale = r >= 228 && g >= 232 && b >= 240 && max >= 240;
  const isDesaturated = max - min <= 28;
  return isPale && isDesaturated;
}

function removeEdgeBackground({ data, width, height, isBackground }) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBg = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const pixelIndex = idx * 4;
    // Continue flood through already-transparent edge pixels
    if (data[pixelIndex + 3] === 0) {
      visited[idx] = 1;
      queue.push([x, y]);
      return;
    }
    if (!isBackground(data, pixelIndex)) return;
    visited[idx] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBg(x, 0);
    pushIfBg(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    pushIfBg(0, y);
    pushIfBg(width - 1, y);
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const pixelIndex = (y * width + x) * 4;
    data[pixelIndex + 3] = 0;

    pushIfBg(x + 1, y);
    pushIfBg(x - 1, y);
    pushIfBg(x, y + 1);
    pushIfBg(x, y - 1);
  }
}

async function processFile(file, isBackground) {
  const inputPath = path.join(assetsDir, file);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  removeEdgeBackground({
    data: pixels,
    width: info.width,
    height: info.height,
    isBackground,
  });

  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(inputPath);

  console.log(`Processed ${file}`);
}

for (const file of whiteMarginFiles) {
  await processFile(file, isNearWhite);
}

for (const file of paleMarginFiles) {
  await processFile(file, isPaleBlueGrey);
}
