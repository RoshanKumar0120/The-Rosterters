import { generateMedicalPanel } from "./panels.service.js";

export async function medicalPanel(req, res) {
  try {
    const { medicalCase } = req.body || {};
    if (!medicalCase) return res.status(400).json({ message: "medicalCase is required." });
    const result = generateMedicalPanel(medicalCase);
    return res.json(result);
  } catch (error) { console.error("Medical panel generation failed:", error); return res.status(500).json({ message: "Failed to generate medical panel.", error: error.message }); }
}
