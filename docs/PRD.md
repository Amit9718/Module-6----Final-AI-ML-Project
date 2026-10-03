# PRD — AI Resume-to-Job Gap Analyzer

## Problem Statement
Job seekers struggle to tailor their resumes for specific job descriptions, often missing critical skills that ATS systems and recruiters look for. There is no quick, structured way to identify the skill gap between a resume and a job posting.

## Solution
A full-stack web application where users can paste their resume and a job description to receive an AI-powered gap analysis — including matching skills, missing skills, and actionable improvement suggestions.

## Features
- Resume and JD text input
- AI-powered skill extraction (Gemini API)
- Matching / missing skill breakdown
- Improvement suggestions
- Clean, responsive UI
- Result display with visual indicators

## Architecture
```
User → React Frontend → Express Backend → Gemini AI API
                              ↓
                        (Optional: MongoDB for history)
```

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- AI: Google Gemini API
- Optional DB: MongoDB

## Security
- API keys in environment variables only
- Input validation on both client and server
- `.env` excluded from version control

## Acceptance Criteria
- User can input resume and JD and receive structured analysis
- All error states handled (empty input, API failure)
- UI is responsive on mobile and desktop
- No secrets committed to repository
