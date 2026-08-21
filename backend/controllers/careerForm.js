import {
  createCareerApplication,
  deleteAllCareerApplications,
  deleteCareerApplication,
  listCareerApplications,
} from "../module/careerModules.js";
import { storeCvFile } from "../middleware/upload.js";
import {
  FORM_LIMITS,
  validateEmail,
  validatePhone,
  validatePlainField,
} from "../utils/formSecurity.js";

export async function careerForm(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required (PDF, DOC, or DOCX).",
      });
    }

    const fullName = validatePlainField(req.body?.fullName, {
      required: true,
      maxLength: FORM_LIMITS.fullName,
      label: "Full name",
    });
    const email = validateEmail(req.body?.email);
    const phone = validatePhone(req.body?.phone);
    const jobTitle = validatePlainField(req.body?.jobTitle, {
      maxLength: FORM_LIMITS.jobTitle,
      label: "Job title",
    });
    const education = validatePlainField(req.body?.education, {
      maxLength: FORM_LIMITS.education,
      label: "Education",
    });
    const expertise = validatePlainField(req.body?.expertise, {
      maxLength: FORM_LIMITS.expertise,
      label: "Expertise",
    });
    const message = validatePlainField(req.body?.message, {
      maxLength: FORM_LIMITS.message,
      label: "Message",
    });

    const firstError = [fullName, email, phone, jobTitle, education, expertise, message].find(
      (item) => !item.ok,
    );
    if (firstError) {
      return res.status(400).json({
        success: false,
        message: firstError.message,
      });
    }

    const storedCv = await storeCvFile(req.file, req);

    if (!storedCv.cvUrl) {
      return res.status(500).json({
        success: false,
        message: "Unable to store resume file. Please try again.",
      });
    }

    await createCareerApplication({
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
      jobTitle: jobTitle.value,
      education: education.value,
      expertise: expertise.value,
      message: message.value,
      cvFilename: String(storedCv.cvFilename || "resume").slice(0, 180),
      cvPath: storedCv.cvPath,
      cvUrl: storedCv.cvUrl,
    });

    return res.status(201).json({
      success: true,
      message:
        "Your application was sent successfully. Our team will contact you soon.",
    });
  } catch (error) {
    console.error("Career form submit error:", {
      name: error?.name,
      code: error?.code,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now. Please try again.",
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
    console.error("List career applications error:", error?.name || error);
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
    console.error("Delete career application error:", error?.name || error);
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
    console.error("Delete all career applications error:", error?.name || error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete applications right now.",
    });
  }
}
