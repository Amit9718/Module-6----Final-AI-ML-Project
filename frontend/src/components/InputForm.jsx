import { useState } from "react";

export default function InputForm({ onAnalyze, loading }) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!resumeText.trim()) e.resume = "Resume text is required.";
    if (!jobDescription.trim()) e.jd = "Job description is required.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onAnalyze({ resumeText, jobDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Resume Text
        </label>
        <textarea
          className={`w-full h-48 p-3 border rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.resume ? "border-red-400" : "border-gray-300"
          }`}
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          disabled={loading}
          aria-label="Resume text"
        />
        {errors.resume && (
          <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          className={`w-full h-48 p-3 border rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.jd ? "border-red-400" : "border-gray-300"
          }`}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={loading}
          aria-label="Job description"
        />
        {errors.jd && (
          <p className="text-red-500 text-xs mt-1">{errors.jd}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </form>
  );
}
