import express from "express";
import { submitContactLead } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactLead);

export default router;
