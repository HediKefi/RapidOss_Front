import ScrambleText from "./ScrambleText";
import Reveal from "./Reveal";

export default function PageHeader({
  index,
  kicker,
  title,
  lede,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="relative border-b border-edge">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 md:pt-44 md:pb-20">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-volt uppercase">
            <span className="me-3 text-smoke">{index} /</span>
            {kicker}
          </p>
        </Reveal>
        <ScrambleText
          key={title}
          as="h1"
          text={title}
          delay={250}
          className="mt-5 block text-5xl font-bold tracking-tighter uppercase sm:text-6xl md:text-7xl"
        />
        {lede && (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash md:text-lg">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
