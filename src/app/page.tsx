import Hero from "@/components/home/Hero";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import SkillsGrid from "@/components/skills/SkillsGrid";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export default function Home() {
  return (
    <div className="relative">
      {/* Lightweight page content layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent"
      />

      <div className="reveal">
        <Hero />
      </div>

      <div className="reveal reveal-delay-1">
        <Section
          eyebrow="About"
          title="A quick introduction"
          description={profile.aboutParagraphs[0]}
        >
          <Button href="/about" variant="secondary">
            Read the full story
          </Button>
        </Section>
      </div>

      <div className="reveal reveal-delay-2">
        <Section
          eyebrow="Skills"
          title="What I work with"
          className="border-t border-ink-700"
        >
          <SkillsGrid skills={skills} />

          <div className="mt-8">
            <Button href="/skills" variant="secondary">
              See the full skills breakdown
            </Button>
          </div>
        </Section>
      </div>

      <div className="reveal reveal-delay-3">
        <Section
          eyebrow="Projects"
          title="Selected work"
          description="A selection of projects I've built while learning, experimenting, and developing my skills."
          className="border-t border-ink-700"
        >
          <ProjectsGrid projects={projects} />

          <div className="mt-8">
            <Button href="/projects" variant="secondary">
              View all projects
            </Button>
          </div>
        </Section>
      </div>

      <div className="reveal reveal-delay-4">
        <Section
          eyebrow="AI Assistant"
          title="Ask NoorVerse about Noor"
          description="Explore my background, skills, projects, and experience through the NoorVerse AI Assistant."
          className="border-t border-ink-700"
        >
          <Button href="/ai-assistant">
            Talk to the AI Assistant
          </Button>
        </Section>
      </div>
    </div>
  );
}