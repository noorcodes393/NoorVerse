import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import PromptWindow from "@/components/ui/PromptWindow";

export default function Hero() {
return (
<section className="grid-backdrop relative overflow-hidden border-b border-ink-700">
<div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
<div>
<p className="mb-4 font-mono text-xs uppercase tracking-widest text-cyan-400">
{profile.education.degree} · {profile.education.status}
</p>
<h1 className="text-glow font-display text-4xl font-semibold leading-tight tracking-tight text-paper-100 sm:text-5xl lg:text-6xl">
{profile.name}
</h1>
<p className="mt-3 font-mono text-base text-amber-400 sm:text-lg">
{profile.role}
</p>
<p className="mt-6 max-w-xl text-base leading-relaxed text-paper-400 sm:text-lg">
{profile.shortIntro}
</p>

<div className="mt-8 flex flex-wrap gap-3">  
        <Button href="/projects">Explore my work</Button>  
        <Button href="/ai-assistant" variant="secondary">  
          Ask the AI Assistant  
        </Button>  
        <Button href="/resume" variant="ghost">  
          View Resume / CV  
        </Button>  
      </div>  
    </div>  

    <div className="flex justify-center lg:justify-end">  
      <PromptWindow  
        lines={[  
          {  
            question: "Who is Noor?",  
            answer:  
              "Noor Fatima — a 5th-semester BS Software Engineering student focused on frontend development and AI engineering.",  
          },  
          {  
            question: "What is she building right now?",  
            answer:  
              "NoorVerse: this platform, including an AI Assistant grounded in her real profile data.",  
          },  
        ]}  
      />  
    </div>  
  </div>  
</section>

);
}