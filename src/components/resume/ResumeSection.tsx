import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { projects } from "@/data/projects";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

// Update this once the real PDF is exported and placed at this path.
const RESUME_PDF_PATH = "/resume/noor-fatima-cv.pdf";

export default function ResumeSection() {
  const realProjects = projects.filter((p) => !p.isPlaceholder);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-ink-800 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
            Resume file status
          </p>
        A quick overview of my skills ,eductaion, experience ,education ,and projects.
        </div>
        <div className="flex shrink-0 gap-3">
          <Button href={RESUME_PDF_PATH} variant="secondary" external>
            View Resume
          </Button>
          <Button href={RESUME_PDF_PATH} external>
            Download CV
          </Button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Summary
          </h3>
          <p className="mt-3 text-base leading-relaxed text-paper-200">
            {profile.shortIntro}
          </p>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-cyan-400">
            Education
          </h3>
          <p className="mt-3 text-paper-100">
            {profile.education.degree}{" "}
            <span className="text-paper-400">
              — {profile.education.status}
            </span>
          </p>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-cyan-400">
            Certifications
          </h3>
          <ul className="mt-3 space-y-1.5">
            {certificates.map((cert) => (
              <li key={cert.id} className="text-paper-100">
                {cert.name}{" "}
                <span className="text-paper-400">— {cert.issuer}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Skills
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Tag key={skill.name}>{skill.name}</Tag>
            ))}
          </div>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-cyan-400">
            Projects
          </h3>
          <ul className="mt-3 space-y-1.5">
            {realProjects.map((project) => (
              <li key={project.id} className="text-paper-100">
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
