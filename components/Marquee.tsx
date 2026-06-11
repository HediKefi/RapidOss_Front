export default function Marquee({
  items,
  fast = false,
  className = "",
}: {
  items: string[];
  fast?: boolean;
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6">{item}</span>
          <span className="text-volt">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    // dir=ltr keeps the loop geometry stable when the page is RTL
    <div className={`overflow-hidden ${className}`} dir="ltr">
      <div
        className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
