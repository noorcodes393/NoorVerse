import { Skill, SkillCategory } from "@/types";

function groupByCategory(
  skills: Skill[],
): Record<SkillCategory, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      acc[skill.category] = acc[skill.category] ?? [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>,
  );
}

export default function SkillsGrid({
  skills,
}: {
  skills: Skill[];
}) {
  const grouped = groupByCategory(skills);

  return (
    <div className="card-grid grid gap-6 sm:grid-cols-2">
      {Object.entries(grouped).map(([category, items], index) => (
        <div
          key={category}
          className="animated-card rounded-xl border border-ink-700 bg-ink-800 p-6"
          style={
            {
              "--card-delay": `${Math.min(index * 70, 350)}ms`,
            } as React.CSSProperties
          }
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            {category}
          </h3>

          <ul className="mt-4 space-y-3">
            {items.map((skill) => (
              <li key={skill.name}>
                <p className="font-medium text-paper-100">
                  {skill.name}
                </p>

                {skill.note && (
                  <p className="mt-0.5 text-sm text-paper-400">
                    {skill.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}