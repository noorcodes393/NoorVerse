"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/resume", label: "Resume" },
  { href: "/ai-assistant", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu on route change. Deriving this during render
  // (rather than in a useEffect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-paper-100"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/40 bg-ink-800 font-mono text-sm text-amber-400"
          >
            &gt;_
          </span>
          Noor<span className="text-amber-400">Verse</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : "text-paper-400 hover:text-paper-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="focus-ring inline-flex items-center justify-center rounded-md border border-ink-700 p-2 text-paper-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">
            {open ? "Close navigation menu" : "Open navigation menu"}
          </span>
          {open ? (
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-700 bg-ink-900 px-4 pb-4 lg:hidden"
      >
        <ul className="flex flex-col gap-1 pt-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-ring block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-ink-800 text-amber-400"
                      : "text-paper-400 hover:bg-ink-800 hover:text-paper-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
