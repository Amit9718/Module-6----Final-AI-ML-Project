import { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import Loader from "./components/Loader";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async ({ resumeText, jobDescription }) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-4 shadow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">AI Resume Gap Analyzer</h1>
          <p className="text-blue-200 text-sm mt-1">
            Powered by Google Gemini — Codomax Internship Module 6
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <InputForm onAnalyze={handleAnalyze} loading={loading} />

        {loading && <Loader />}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {result && <Results data={result} />}
      </main>
    </div>
  );
}
