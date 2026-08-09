import { Project } from "@/types";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="card-grid grid gap-6 sm:grid-cols-2">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animated-card"
          style={
            {
              "--card-delay": `${Math.min(index * 70, 350)}ms`,
            } as React.CSSProperties
          }
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}