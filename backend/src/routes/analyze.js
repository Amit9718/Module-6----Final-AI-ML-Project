const express = require("express");
const { analyzeResume } = require("../services/geminiService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !resumeText.trim()) {
    return res.status(400).json({ error: "Resume text is required." });
  }
  if (!jobDescription || !jobDescription.trim()) {
    return res.status(400).json({ error: "Job description is required." });
  }
  if (resumeText.length > 15000 || jobDescription.length > 10000) {
    return res.status(400).json({ error: "Input text too long." });
  }

  try {
    const result = await analyzeResume(resumeText, jobDescription);
    res.json(result);
  } catch (err) {
    if (err.message.includes("API_KEY")) {
      return res.status(500).json({ error: "AI service configuration error." });
    }
    console.error("Analysis error:", err.message);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
});

module.exports = router;
