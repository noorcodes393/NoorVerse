import { Project } from "@/types";
import Tag from "@/components/ui/Tag";

const STATUS_STYLES: Record<NonNullable<Project["status"]>, string> = {
  "In Progress": "text-amber-400 border-amber-500/40",
  Completed: "text-cyan-400 border-cyan-500/40",
  Planned: "text-paper-400 border-ink-600",
};

export default function ProjectCard({ project }: { project: Project }) {
  if (project.isPlaceholder) {
    return (
      <div className="flex h-full flex-col justify-center rounded-xl border border-dashed border-ink-600 bg-ink-800/40 p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-paper-400">
          Reserved slot
        </p>
        <p className="mt-2 text-sm leading-relaxed text-paper-400">
          {project.description}
        </p>
      </div>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-xl border border-ink-700 bg-ink-800 p-6 transition-colors hover:border-ink-600">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-paper-100">
          {project.name}
        </h3>
        {project.status && (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px] ${STATUS_STYLES[project.status]}`}
          >
            {project.status}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-paper-400">
        {project.description}
      </p>

      {project.features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2 text-sm text-paper-200"
            >
              <span aria-hidden="true" className="text-amber-400">
                ›
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {project.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4 border-t border-ink-700 pt-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
