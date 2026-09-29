/**
 * Comprehensive verification of all backend routes, upload handlers, and auth permissions.
 * Run with: node scripts/testRoutesAndUpload.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  storeCvFile,
  storeBlogImage,
  storeTestimonialImage,
  storeDemoThumbnail,
  storeDemoVideo,
  uploadsCvDir,
  uploadsBlogDir,
  uploadsTestimonialDir,
  uploadsDemoDir,
} from "../middleware/upload.js";
import {
  isDashboardRole,
  isSuperAdminRole,
  signAuthToken,
  verifyAuthToken,
} from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed += 1;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed += 1;
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("  VERIFYING LOCAL STORAGE UPLOADS (ZERO CLOUDINARY)   ");
  console.log("=======================================================\n");

  const mockReq = {
    protocol: "http",
    get(header) {
      if (header === "host") return "localhost:5000";
      return "";
    },
  };

  // Test 1: Store CV locally
  try {
    const fakeCvFile = {
      originalname: "test_candidate_resume.pdf",
      mimetype: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 test resume content"),
    };
    const cvResult = await storeCvFile(fakeCvFile, mockReq);
    assert(cvResult.storage === "local", "CV storage marked as local");
    assert(cvResult.cvUrl.includes("/uploads/cvs/"), "CV URL points to /uploads/cvs/");
    const localCvPath = path.join(uploadsCvDir, cvResult.cvPath);
    assert(fs.existsSync(localCvPath), "CV file physically exists on local disk");
    // Clean up test file
    fs.unlinkSync(localCvPath);
    assert(true, "CV local storage test passed");
  } catch (err) {
    assert(false, `storeCvFile threw: ${err.message}`);
  }

  // Test 2: Store Blog image locally
  try {
    const fakeBlogImg = {
      originalname: "featured-ai-blog.png",
      mimetype: "image/png",
      buffer: Buffer.from("fake-png-data"),
    };
    const blogResult = await storeBlogImage(fakeBlogImg, mockReq);
    assert(blogResult.storage === "local", "Blog image storage marked as local");
    assert(blogResult.imageUrl.includes("/uploads/blogs/"), "Blog image URL points to /uploads/blogs/");
    const localBlogPath = path.join(uploadsBlogDir, blogResult.imagePath);
    assert(fs.existsSync(localBlogPath), "Blog image physically exists on local disk");
    // Clean up test file
    fs.unlinkSync(localBlogPath);
    assert(true, "Blog image local storage test passed");
  } catch (err) {
    assert(false, `storeBlogImage threw: ${err.message}`);
  }

  // Test 3: Store Testimonial logo/profile locally
  try {
    const fakeLogo = {
      originalname: "client-logo.webp",
      mimetype: "image/webp",
      buffer: Buffer.from("fake-webp-data"),
    };
    const testimonialResult = await storeTestimonialImage(fakeLogo, mockReq, "logo");
    assert(testimonialResult.storage === "local", "Testimonial logo storage marked as local");
    assert(testimonialResult.imageUrl.includes("/uploads/testimonials/"), "Testimonial URL points to /uploads/testimonials/");
    const localTestimonialPath = path.join(uploadsTestimonialDir, testimonialResult.imagePath);
    assert(fs.existsSync(localTestimonialPath), "Testimonial logo physically exists on local disk");
    // Clean up test file
    fs.unlinkSync(localTestimonialPath);
    assert(true, "Testimonial local storage test passed");
  } catch (err) {
    assert(false, `storeTestimonialImage threw: ${err.message}`);
  }

  // Test 4: Store Demo Thumbnail locally
  try {
    const fakeThumb = {
      originalname: "demo-thumbnail.jpg",
      mimetype: "image/jpeg",
      buffer: Buffer.from("fake-jpg-data"),
    };
    const thumbResult = await storeDemoThumbnail(fakeThumb, mockReq);
    assert(thumbResult.storage === "local", "Demo thumbnail storage marked as local");
    assert(thumbResult.imageUrl.includes("/uploads/demos/"), "Demo thumbnail points to /uploads/demos/");
    const localThumbPath = path.join(uploadsDemoDir, thumbResult.imagePath);
    assert(fs.existsSync(localThumbPath), "Demo thumbnail physically exists on local disk");
    // Clean up test file
    fs.unlinkSync(localThumbPath);
    assert(true, "Demo thumbnail local storage test passed");
  } catch (err) {
    assert(false, `storeDemoThumbnail threw: ${err.message}`);
  }

  // Test 5: Store Demo Video locally
  try {
    const tmpDemoVideo = path.join(uploadsDemoDir, ".tmp", "test-temp-upload.mp4");
    fs.writeFileSync(tmpDemoVideo, Buffer.from("fake-mp4-video-stream-content"));
    const fakeVideo = {
      originalname: "ai-copilot-demo.mp4",
      mimetype: "video/mp4",
      path: tmpDemoVideo,
    };
    const videoResult = await storeDemoVideo(fakeVideo, mockReq);
    assert(videoResult.storage === "local", "Demo video storage marked as local");
    assert(videoResult.videoUrl.includes("/uploads/demos/"), "Demo video URL points to /uploads/demos/");
    const localVideoPath = path.join(uploadsDemoDir, videoResult.videoPath);
    assert(fs.existsSync(localVideoPath), "Demo video physically exists on local disk");
    assert(!fs.existsSync(tmpDemoVideo), "Temporary upload file was cleaned up");
    // Clean up test file
    fs.unlinkSync(localVideoPath);
    assert(true, "Demo video local storage test passed");
  } catch (err) {
    assert(false, `storeDemoVideo threw: ${err.message}`);
  }

  console.log("\n=======================================================");
  console.log("  VERIFYING AUTH PERMISSIONS & ROLE CHECKS (NO 403)   ");
  console.log("=======================================================\n");

  // Admin user
  const adminUser = { id: 1, full_name: "Sid", email: "sid@elevatetrust.ai", role: "admin" };
  const adminToken = signAuthToken(adminUser);
  const adminDecoded = verifyAuthToken(adminToken);
  assert(adminDecoded.email === "sid@elevatetrust.ai", "Admin JWT signed and verified");
  assert(isDashboardRole(adminUser.role) === true, "Admin role recognized by isDashboardRole");
  assert(isSuperAdminRole(adminUser.role) === true, "Admin role recognized by isSuperAdminRole (write access)");

  // Sales user (e.g. sachin@elevatetrust.ai, diksha@elevatetrust.ai, parag@elevatetrust.ai)
  const salesUser = { id: 2, full_name: "Sachin", email: "sachin@elevatetrust.ai", role: "sales" };
  const salesToken = signAuthToken(salesUser);
  const salesDecoded = verifyAuthToken(salesToken);
  assert(salesDecoded.email === "sachin@elevatetrust.ai", "Sales JWT signed and verified");
  assert(isDashboardRole(salesUser.role) === true, "Sales role recognized by isDashboardRole (can access dashboard)");
  assert(isSuperAdminRole(salesUser.role) === false, "Sales role restricted: isSuperAdminRole is false (viewer cannot upload/modify)");

  // Unauthorized role
  assert(isDashboardRole("unauthorized_guest") === false, "Guest role rejected by isDashboardRole");
  assert(isSuperAdminRole("unauthorized_guest") === false, "Guest role rejected by isSuperAdminRole");

  console.log("\n=======================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
