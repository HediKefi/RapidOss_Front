"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { lookupShipment, type Shipment } from "@/lib/tracking";
import TrackSearch from "./TrackSearch";
import { useI18n } from "@/lib/i18n/I18nProvider";

type Phase = "idle" | "scanning" | "result";

export default function TrackClient() {
  const { locale, dict: full } = useI18n();
  const dict = full.trackPage;
  const params = useSearchParams();
  const id = params.get("id");
  const validId = id && /^RX-?\d{6}$/i.test(id.trim()) ? id.trim() : null;

  const [phase, setPhase] = useState<Phase>(validId ? "scanning" : "idle");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [scanLine, setScanLine] = useState(0);
  const [prevId, setPrevId] = useState(validId);

  // reset the lookup when the number in the URL changes (during render,
  // per React's "adjusting state when a prop changes" pattern)
  if (validId !== prevId) {
    setPrevId(validId);
    setPhase(validId ? "scanning" : "idle");
    setShipment(null);
    setScanLine(0);
  }

  useEffect(() => {
    if (!validId) return;

    const lineTimer = setInterval(
      () => setScanLine((l) => Math.min(l + 1, dict.scanLines.length - 1)),
      420
    );
    const doneTimer = setTimeout(() => {
      setShipment(lookupShipment(validId, locale));
      setPhase("result");
    }, 1900);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
    };
  }, [validId, locale, dict.scanLines.length]);

  const isCancelled = shipment?.outcome === "cancelled";
  const isReturned = shipment?.outcome === "returned";

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
      <div className="mt-12">
        <TrackSearch autoFocus={!id} />
      </div>

      <AnimatePresence mode="wait">
        {phase === "scanning" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-14 border border-edge bg-panel p-8 clip-notch"
          >
            <div className="relative h-1 overflow-hidden bg-edge" dir="ltr">
              <div className="animate-scan absolute inset-y-0 w-1/4 bg-volt" />
            </div>
            <div className="mt-6 space-y-2 font-mono text-xs tracking-[0.18em] text-ash uppercase">
              {dict.scanLines.slice(0, scanLine + 1).map((line, i) => (
                <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="me-3 text-volt">{">"}</span>
                  {line}
                  {i === scanLine && <span className="animate-blink ms-1 text-volt">▮</span>}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "result" && shipment && (
          <motion.div
            key={shipment.code}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            {/* manifest header */}
            <div className="border border-edge bg-panel clip-notch">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge px-7 py-4">
                <p className="font-mono text-sm font-semibold tracking-[0.2em] text-volt" dir="ltr">
                  {shipment.code}
                </p>
                <p
                  className={`px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase clip-tag ${
                    isCancelled
                      ? "border border-smoke text-smoke line-through"
                      : shipment.terminal && !isReturned
                        ? "bg-volt text-black"
                        : isReturned && shipment.terminal
                          ? "border border-ash text-ash"
                          : "border border-volt/40 text-volt"
                  }`}
                >
                  {dict.statuses[shipment.path[shipment.stageIndex]]}
                </p>
              </div>

              <div className="grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-5">
                {[
                  [dict.fields.origin, shipment.origin],
                  [dict.fields.destination, shipment.destination],
                  [dict.fields.service, dict.serviceNames[shipment.serviceIdx]],
                  [dict.fields.load, `${shipment.pieces} ${dict.pcs} · ${shipment.weightKg} KG`],
                  [dict.fields.cod, `${shipment.codDt} DT`],
                ].map(([k, v]) => (
                  <div key={k} className="bg-panel px-7 py-5 lg:px-5">
                    <p className="font-mono text-[9px] tracking-[0.25em] text-smoke uppercase">{k}</p>
                    <p className="mt-1.5 font-mono text-sm tracking-wide">{v}</p>
                  </div>
                ))}
              </div>

              {/* status pipeline stepper */}
              <div className="border-t border-edge px-7 py-6">
                <p className="font-mono text-[9px] tracking-[0.25em] text-smoke uppercase">
                  {dict.pipelineLabel}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {shipment.path.map((status, i) => {
                    const done = i < shipment.stageIndex;
                    const current = i === shipment.stageIndex;
                    return (
                      <span key={status} className="flex items-center gap-2">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.12 }}
                          className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase clip-tag ${
                            current
                              ? isCancelled
                                ? "border border-smoke bg-smoke/15 text-bone line-through"
                                : "bg-volt font-semibold text-black"
                              : done
                                ? "border border-volt/50 text-volt"
                                : "border border-edge text-smoke"
                          }`}
                        >
                          {dict.statuses[status]}
                        </motion.span>
                        {i < shipment.path.length - 1 && (
                          <span
                            className={`hidden h-px w-4 sm:block ${done ? "bg-volt" : "bg-edge"}`}
                            aria-hidden
                          />
                        )}
                      </span>
                    );
                  })}
                </div>

                {/* journey progress — geometry pinned LTR so origin stays on the left */}
                <div className="mt-6" dir="ltr">
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-smoke uppercase">
                    <span>{shipment.origin}</span>
                    <span>
                      {dict.eta}{" "}
                      <span className="text-volt">{shipment.eta ?? dict.completed}</span>
                    </span>
                    <span>{isReturned || isCancelled ? shipment.origin : shipment.destination}</span>
                  </div>
                  <div className="relative mt-3 h-1.5 bg-edge">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shipment.progress * 100}%` }}
                      transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute inset-y-0 left-0 ${isCancelled ? "bg-smoke" : "bg-volt"}`}
                    />
                    <motion.span
                      initial={{ left: 0 }}
                      animate={{ left: `${shipment.progress * 100}%` }}
                      transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute top-1/2 -ml-2 grid h-4 w-4 -translate-y-1/2 place-items-center clip-tag ${
                        isCancelled ? "bg-smoke" : "bg-volt"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 bg-black" />
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* event timeline */}
            <ol className="relative mt-10 space-y-0 border-s-2 border-edge ps-8">
              {shipment.events.map((ev, i) => (
                <motion.li
                  key={ev.status}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.13, duration: 0.45 }}
                  className={`relative pb-9 ${ev.done || ev.current ? "" : "opacity-35"}`}
                >
                  <span
                    className={`absolute top-0.5 -start-[2.45rem] grid h-5 w-5 place-items-center border ${
                      ev.current
                        ? isCancelled
                          ? "border-smoke bg-smoke"
                          : "border-volt bg-volt"
                        : ev.done
                          ? "border-volt bg-void"
                          : "border-edge-hi bg-void"
                    }`}
                  >
                    {ev.done && <span className="h-1.5 w-1.5 bg-volt" />}
                    {ev.current && !shipment.terminal && (
                      <motion.span
                        className="absolute inset-0 border border-volt"
                        animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className={`text-base font-bold tracking-tight uppercase ${
                        ev.current ? (isCancelled ? "text-smoke line-through" : "text-volt") : ""
                      }`}
                    >
                      {dict.statusEvents[ev.status]}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-smoke">
                      {ev.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
                    {ev.location}
                  </p>
                </motion.li>
              ))}
            </ol>

            <p className="mt-4 border-t border-edge pt-6 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-smoke uppercase">
              {dict.demoNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
