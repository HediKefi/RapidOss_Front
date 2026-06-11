import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import RouteCanvas from "@/components/RouteCanvas";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Network — RAPIDOSS",
  description:
    "12 hubs, 12 nightly trunk routes, 1,200+ vehicles. The RAPIDOSS delivery network across France and Western Europe.",
};

const HUBS = [
  { code: "CDG-7", city: "Paris", role: "PRIMARY SORT", docks: 64, throughput: "18K/DAY" },
  { code: "SUD-2", city: "Lyon", role: "SOUTH GATEWAY", docks: 38, throughput: "9K/DAY" },
  { code: "P-4", city: "Marseille", role: "PORT INTERFACE", docks: 30, throughput: "7K/DAY" },
  { code: "NRD-1", city: "Lille", role: "BENELUX LINK", docks: 26, throughput: "6K/DAY" },
  { code: "W-3", city: "Bordeaux", role: "ATLANTIC ARC", docks: 22, throughput: "4K/DAY" },
  { code: "M-6", city: "Toulouse", role: "AERO CORRIDOR", docks: 20, throughput: "4K/DAY" },
  { code: "A-5", city: "Nantes", role: "WEST RELAY", docks: 18, throughput: "3K/DAY" },
  { code: "E-2", city: "Strasbourg", role: "RHINE CROSSING", docks: 18, throughput: "3K/DAY" },
  { code: "RT-9", city: "Rotterdam", role: "SEA FREIGHT IN", docks: 34, throughput: "8K/DAY" },
  { code: "MX-3", city: "Milano", role: "ALPINE SOUTH", docks: 24, throughput: "5K/DAY" },
  { code: "BC-8", city: "Barcelona", role: "IBERIA GATE", docks: 22, throughput: "5K/DAY" },
  { code: "FR-1", city: "Frankfurt", role: "CENTRAL EU", docks: 28, throughput: "7K/DAY" },
];

export default function NetworkPage() {
  return (
    <>
      <PageHeader
        index="02"
        kicker="Where we run"
        title="The network"
        lede="Twelve hubs stitched together by nightly trunk routes. Capacity is engineered for your worst Friday, not your average Tuesday."
      />

      {/* live map panel */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <Reveal>
          <div className="relative h-[420px] overflow-hidden border border-edge bg-carbon clip-notch md:h-[520px]">
            <div className="grid-lines absolute inset-0" />
            <RouteCanvas className="absolute inset-0 h-full w-full" />
            <div className="absolute top-5 left-6 font-mono text-[10px] tracking-[0.25em] text-volt uppercase">
              <span className="animate-blink mr-2 inline-block h-1.5 w-1.5 bg-volt align-middle" />
              Network telemetry — live
            </div>
            <div className="absolute right-6 bottom-5 hidden gap-6 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase sm:flex">
              <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-volt align-middle" />Hub</span>
              <span><span className="mr-2 inline-block h-2 w-2 rounded-full bg-bone/40 align-middle" />Relay</span>
              <span><span className="mr-2 inline-block h-px w-5 bg-volt align-middle" />Active haul</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* aggregate numbers */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-px border border-edge bg-edge md:grid-cols-4">
          {[
            { value: 12, suffix: "", label: "Sorting hubs" },
            { value: 1284, suffix: "", label: "Vehicles in fleet" },
            { value: 92, suffix: "%", label: "EU pop. within 24h" },
            { value: 344, suffix: "", label: "Daily route loops" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="bg-panel px-6 py-8 text-center md:py-10">
                <p className="text-4xl font-bold text-volt md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* hub manifest */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tighter uppercase md:text-4xl">
            Hub manifest
          </h2>
        </Reveal>

        <div className="mt-8 overflow-x-auto border border-edge">
          <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-edge bg-carbon text-left text-[9px] tracking-[0.25em] text-smoke uppercase">
                <th className="px-5 py-3.5 font-medium">Code</th>
                <th className="px-5 py-3.5 font-medium">City</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Docks</th>
                <th className="px-5 py-3.5 font-medium">Throughput</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {HUBS.map((hub, i) => (
                <tr
                  key={hub.code}
                  className={`border-b border-edge transition-colors hover:bg-volt/[0.04] ${
                    i % 2 ? "bg-panel" : "bg-void"
                  }`}
                >
                  <td className="px-5 py-4 font-semibold text-volt">{hub.code}</td>
                  <td className="px-5 py-4 tracking-wider uppercase">{hub.city}</td>
                  <td className="px-5 py-4 text-ash">{hub.role}</td>
                  <td className="px-5 py-4 text-ash">{hub.docks}</td>
                  <td className="px-5 py-4 text-ash">{hub.throughput}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-bone">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
                      ONLINE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-edge bg-panel p-8 clip-notch md:p-10">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter uppercase">
              Not on the map yet?
            </h3>
            <p className="mt-2 max-w-md text-sm text-ash">
              We open new lanes when client volume justifies them — and volume
              starts with a conversation.
            </p>
          </div>
          <MagneticButton href="/contact">Request coverage</MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
