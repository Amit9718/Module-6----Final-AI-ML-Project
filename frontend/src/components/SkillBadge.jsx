const styles = {
  match: "bg-green-100 text-green-700 border border-green-300",
  missing: "bg-red-100 text-red-700 border border-red-300",
  neutral: "bg-gray-100 text-gray-700 border border-gray-300",
};

export default function SkillBadge({ label, type = "neutral" }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type] ?? styles.neutral}`}
    >
      {label}
    </span>
  );
}
