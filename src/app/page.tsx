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
    <>
      <Hero />

      <Section
        eyebrow="About"
        title="A quick introduction"
        description={profile.aboutParagraphs[0]}
      >
        <Button href="/about" variant="secondary">
          Read the full story
        </Button>
      </Section>

      <Section
        eyebrow="Skills"
        title="What I work with"
        description="A structured look at the languages, frameworks, and tools I use — including what I'm learning in AI engineering."
        className="border-t border-ink-700"
      >
        <SkillsGrid skills={skills} />
        <div className="mt-8">
          <Button href="/skills" variant="secondary">
            See the full skills breakdown
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Projects"
        title="Selected work"
        description="Reusable project cards backed by structured data — placeholders stay clearly marked until real details are added."
        className="border-t border-ink-700"
      >
        <ProjectsGrid projects={projects} />
        <div className="mt-8">
          <Button href="/projects" variant="secondary">
            View all projects
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="AI Assistant"
        title="Ask NoorVerse about Noor"
        //escription="A real Claude-powered assistant that answers questions using only this site's structured data — and says so clearly when it doesn't know something."
        className="border-t border-ink-700"
      >
        <Button href="/ai-assistant">Talk to the AI Assistant</Button>
      </Section>
    </>
  );
}
