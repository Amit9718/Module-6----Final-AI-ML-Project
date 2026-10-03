import SkillBadge from "./SkillBadge";

export default function Results({ data }) {
  const {
    skillsInResume = [],
    skillsRequired = [],
    matchingSkills = [],
    missingSkills = [],
    suggestions = [],
    matchScore = 0,
    summary = "",
  } = data;

  const scoreColor =
    matchScore >= 70
      ? "text-green-600"
      : matchScore >= 40
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="mt-10 space-y-6">
      {/* Match Score */}
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500 text-sm mb-1">Overall Job Fit Score</p>
        <p className={`text-6xl font-bold ${scoreColor}`}>{matchScore}%</p>
        <div className="mt-3 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700"
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-2">Summary</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <SkillSection
          title="Skills in Resume"
          skills={skillsInResume}
          badgeType="neutral"
          emptyMsg="No skills detected."
        />
        <SkillSection
          title="Skills Required"
          skills={skillsRequired}
          badgeType="neutral"
          emptyMsg="No requirements detected."
        />
        <SkillSection
          title={`Matching Skills (${matchingSkills.length})`}
          skills={matchingSkills}
          badgeType="match"
          emptyMsg="No matching skills found."
        />
        <SkillSection
          title={`Missing Skills (${missingSkills.length})`}
          skills={missingSkills}
          badgeType="missing"
          emptyMsg="No missing skills — great fit!"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-3">
            Improvement Suggestions
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="text-sm text-gray-600">
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function SkillSection({ title, skills, badgeType, emptyMsg }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-semibold text-gray-700 mb-3 text-sm">{title}</h2>
      {skills.length === 0 ? (
        <p className="text-gray-400 text-sm italic">{emptyMsg}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <SkillBadge key={i} label={skill} type={badgeType} />
          ))}
        </div>
      )}
    </div>
  );
}
