# Module 6 — AI Resume-to-Job Gap Analyzer

A full-stack AI-powered web application that analyzes a resume against a job description to identify skill gaps and improvement opportunities.

## Problem Statement
Job seekers often struggle to tailor their resumes for specific job postings, resulting in missed interview opportunities. This tool uses AI to instantly surface matching skills, missing skills, and actionable suggestions.

## Solution
Users paste their resume and a job description — the app returns a structured gap analysis powered by Google Gemini AI.

## Features
- Skill extraction from resume and JD
- Matching skill identification (green)
- Missing skill identification (red)
- Percentage job fit score
- Improvement suggestions
- Responsive UI (mobile + desktop)
- Full error handling (empty input, API failure)

## Architecture
```
React Frontend (Vite + Tailwind)
        ↓
Express Backend (Node.js)
        ↓
Google Gemini AI API
```

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI | Google Gemini 1.5 Flash |

## Installation & Setup

### Prerequisites
- Node.js 18+
- Google Gemini API key (free at https://aistudio.google.com/app/apikey)

### Backend
```bash
cd backend
npm install
copy .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Environment Variables

### Backend `.env`
```
PORT=5000
GEMINI_API_KEY=your_key_here
```

## API Documentation

### POST /api/analyze
Analyzes resume against job description.

**Request body:**
```json
{
  "resumeText": "string (required)",
  "jobDescription": "string (required)"
}
```

**Response:**
```json
{
  "skillsInResume": ["Python", "SQL"],
  "skillsRequired": ["Python", "React", "SQL"],
  "matchingSkills": ["Python", "SQL"],
  "missingSkills": ["React"],
  "suggestions": ["Learn React fundamentals", "..."],
  "matchScore": 67,
  "summary": "..."
}
```

## AI/ML Methodology
Uses Google Gemini 1.5 Flash with structured prompt engineering to extract and compare skills. The model is prompted to return strict JSON to enable reliable parsing.

## Limitations
- Analysis quality depends on how well-structured the input text is
- Gemini API rate limits apply on free tier
- No persistent storage of results in current version

## Future Improvements
- PDF resume upload
- Result history (MongoDB)
- User authentication
- Multiple JD comparison
- ATS keyword density score

## Security
- API keys stored in `.env` only
- Input length limits enforced server-side
- `.env` excluded from version control

## Screenshots
See `/screenshots` folder after running the application.

## Contributors
Codomax AI & ML Internship — Module 6 Final Project
