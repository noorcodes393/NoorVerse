import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";
import { contactLinks } from "@/data/contact";

/**
 * Builds a single plain-text block describing NoorVerse's real, structured
 * data. This is the ONLY source of truth the assistant is given about
 * Noor — it must not answer from general knowledge about anything
 * personal.
 *
 * IMPORTANT: only import this from server-side code (API routes, server
 * components). It's plain data (no secrets), but it has no reason to be
 * in the client bundle.
 */
export function buildNoorverseContext(): string {
  const skillLines = skills
    .map((s) => `- ${s.name} (${s.category})${s.note ? `: ${s.note}` : ""}`)
    .join("\n");

  const projectLines = projects
    .map((p) => {
      if (p.isPlaceholder) {
        return `- [Placeholder — not yet documented] ${p.description}`;
      }
      const links = p.links.map((l) => `${l.label}: ${l.url}`).join(", ");
      return [
        `- ${p.name}${p.status ? ` (${p.status})` : ""}: ${p.description}`,
        p.technologies.length ? `  Technologies: ${p.technologies.join(", ")}` : "",
        p.features.length ? `  Features: ${p.features.join("; ")}` : "",
        links ? `  Links: ${links}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const certificateLines = certificates.length
    ? certificates
        .map(
          (c) =>
            `- ${c.name} — ${c.issuer}${c.date ? ` (${c.date})` : ""}${
              c.credentialUrl ? ` [${c.credentialUrl}]` : ""
            }`,
        )
        .join("\n")
    : "- None listed yet.";

  const contactLines = contactLinks
    .map((c) =>
      c.isPlaceholder
        ? `- ${c.label}: not published yet`
        : `- ${c.label}: ${c.value}`,
    )
    .join("\n");

  return `
PROFILE
- Name: ${profile.name}
- Role: ${profile.role}
- Focus areas: ${profile.focusAreas.join(", ")}
- Education: ${profile.education.degree}, ${profile.education.status}
- Short intro: ${profile.shortIntro}

ABOUT
${profile.aboutParagraphs.join("\n\n")}

CURRENTLY LEARNING
${profile.currentlyLearning.map((i) => `- ${i}`).join("\n")}

SKILLS
${skillLines}

PROJECTS
${projectLines}

CERTIFICATES
${certificateLines}

CONTACT
${contactLines}
`.trim();
}
