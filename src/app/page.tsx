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
        
        className="border-t border-ink-700"
      >
        <Button href="/ai-assistant">Talk to the AI Assistant</Button>
      </Section>
    </>
  );
}
