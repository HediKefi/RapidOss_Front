import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="RAPIDOSS home"
    >
      <span className="grid h-8 w-8 place-items-center bg-volt clip-tag transition-transform duration-300 group-hover:-rotate-6">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M1 8h7M5 3l5 5-5 5M9 3l5 5-5 5" stroke="#0a0a08" strokeWidth="2" />
        </svg>
      </span>
      <span className="font-sans text-lg font-bold tracking-tight">
        RAPID<span className="text-volt">OSS</span>
      </span>
    </Link>
  );
}
