"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61586099996307";
const INSTAGRAM_URL = "https://www.instagram.com/rapidossdelivery2026";
const LOGIN_URL = "https://rapidoss.loxbox.tn";

function SocialIcon({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center border border-edge text-ash transition-colors hover:border-volt hover:text-volt"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Footer() {
  const { dict } = useI18n();
  const f = dict.footer;

  const links: [string, string, boolean][] = [
    [f.links.services, "/#services", false],
    [f.links.engagements, "/#engagements", false],
    [f.links.about, "/#apropos", false],
    [f.links.track, "/track", false],
    [f.links.devis, "/#devis", false],
    [f.links.courier, "/devenir-livreur", false],
    [f.links.login, LOGIN_URL, true],
  ];

  return (
    <footer id="contact" className="border-t border-edge bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo label="RAPIDOSS" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">{f.blurb}</p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
            {f.dispatch}
          </p>
          <p className="mt-1 font-mono text-xs tracking-wider text-bone" dir="ltr">
            {f.phones}
          </p>
          <div className="mt-6 flex gap-2">
            <SocialIcon
              href={FACEBOOK_URL}
              label="Facebook"
              path="M13.5 9H16l.5-3h-3V4.5c0-.9.3-1.5 1.6-1.5H16.6V.2C16.3.2 15.3 0 14.2 0 11.8 0 10 1.5 10 4.2V6H7.5v3H10v9h3.5V9z"
            />
            <SocialIcon
              href={INSTAGRAM_URL}
              label="Instagram"
              path="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM18.4 6.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
            />
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            {f.navigate}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map(([label, href, external]) => (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ash transition-colors hover:text-volt"
                  >
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="text-ash transition-colors hover:text-volt">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">{f.hq}</h3>
          <p className="mt-5 text-sm leading-relaxed text-ash">
            {f.address1}
            <br />
            {f.address2}
            <br />
            <span className="text-smoke">{f.email}</span>
          </p>
        </div>

        <div className="border border-edge bg-panel p-6 clip-tag self-start">
          <h3 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
            {f.feedbackKicker}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ash">{f.feedbackBody}</p>
          <a
            href={`mailto:${f.email}`}
            className="mt-4 inline-block font-mono text-[10px] font-semibold tracking-[0.2em] text-volt uppercase underline-offset-4 hover:underline"
          >
            {f.feedbackCta} <span className="inline-block rtl:-scale-x-100">→</span>
          </a>
        </div>
      </div>

      <div className="overflow-hidden px-5 sm:px-8" aria-hidden>
        <p className="text-center text-[18vw] leading-[0.78] font-bold tracking-tighter text-stroke-faint select-none md:text-[13vw]">
          RAPIDOSS
        </p>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase sm:px-8">
          <span>{f.copyright}</span>
          <span>{f.tagline}</span>
        </div>
      </div>
      <div className="hazard h-2" />
    </footer>
  );
}
