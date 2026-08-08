import { Certificate } from "@/types";

export default function CertificatesList({
  certificates,
}: {
  certificates: Certificate[];
}) {
  if (certificates.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-ink-600 bg-ink-800/40 p-6 text-sm text-paper-400">
        
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <article
          key={cert.id}
          className="flex flex-col gap-4 rounded-xl border border-ink-700 bg-ink-800 p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-lg font-semibold text-paper-100">
              {cert.name}
            </h3>

            <p className="mt-1 text-sm text-paper-400">
              {cert.issuer}
            </p>
          </div>

          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring shrink-0 rounded border border-amber-500/40 px-4 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-500/10 hover:text-amber-300"
          >
            View Certificate ↗
          </a>
        </article>
      ))}
    </div>
  );
}