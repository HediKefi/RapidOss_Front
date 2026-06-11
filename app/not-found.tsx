import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="grid-lines absolute inset-0" />
      <div className="relative">
        <p className="font-mono text-[11px] tracking-[0.35em] text-volt uppercase">
          {"// Routing exception"}
        </p>
        <ScrambleText
          as="h1"
          text="404"
          className="mt-4 block text-[28vw] leading-none font-bold tracking-tighter text-stroke-volt md:text-[14rem]"
        />
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ash">
          This address isn&apos;t on any of our manifests. The parcel you&apos;re
          looking for may have been re-routed.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block bg-volt px-8 py-4 font-mono text-xs font-semibold tracking-[0.25em] text-black uppercase clip-tag transition-colors hover:bg-volt-hot"
        >
          Return to hub →
        </Link>
      </div>
      <div className="hazard absolute inset-x-0 bottom-0 h-2" />
    </section>
  );
}
