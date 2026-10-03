const { GoogleGenerativeAI } = require("@google/generative-ai");

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("GEMINI_API_KEY not configured.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

/**
 * Analyze resume against job description using Gemini.
 * @param {string} resumeText
 * @param {string} jobDescription
 * @returns {Promise<Object>}
 */
async function analyzeResume(resumeText, jobDescription) {
  const model = getModel();

  const prompt = `
You are a professional career coach and resume expert.

Analyze the resume below against the provided job description.
Respond ONLY with valid JSON — no markdown, no extra text.

JSON format:
{
  "skillsInResume": ["skill1", "skill2"],
  "skillsRequired": ["skill1", "skill2"],
  "matchingSkills": ["skill1"],
  "missingSkills": ["skill2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "matchScore": 75,
  "summary": "One paragraph summary of job fit."
}

matchScore should be a number 0-100 representing overall job fit percentage.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  let raw = result.response.text().trim();

  // Strip markdown code fences if present
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```json?\n?/, "").replace(/```$/, "").trim();
  }

  const parsed = JSON.parse(raw);
  return parsed;
}

module.exports = { analyzeResume };
