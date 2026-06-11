/**
 * Deterministic shipment generator for the tracking demo.
 * The same tracking code always resolves to the same shipment,
 * so the demo behaves like a real lookup service without a backend.
 * All human-readable labels are resolved from the i18n dictionary
 * by the UI — this module only deals in stable keys.
 */

export type ShipmentStage =
  | "REGISTERED"
  | "PICKED_UP"
  | "AT_HUB"
  | "LINE_HAUL"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export const STAGES: ShipmentStage[] = [
  "REGISTERED",
  "PICKED_UP",
  "AT_HUB",
  "LINE_HAUL",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export interface TimelineEvent {
  stage: ShipmentStage;
  location: string;
  timestamp: string;
  done: boolean;
  current: boolean;
}

export interface Shipment {
  code: string;
  origin: string;
  destination: string;
  serviceIdx: number; // index into dict.trackPage.serviceNames
  weightKg: string;
  codDt: number; // cash to collect on delivery, in dinars
  pieces: number;
  stageIndex: number;
  progress: number; // 0..1 across whole journey
  eta: string | null; // null = completed
  events: TimelineEvent[];
}

// Relay codes stay in Latin script across locales, like flight codes.
const HUBS = [
  "TUNIS TUN-1",
  "ARIANA ARN-2",
  "BEN AROUS BNA-3",
  "NABEUL NBL-4",
  "BIZERTE BZT-5",
  "SOUSSE SUS-6",
  "MONASTIR MNS-7",
  "SFAX SFX-8",
  "KAIROUAN KRN-9",
  "GABÈS GBS-10",
  "MÉDENINE MDN-11",
  "TOZEUR TZR-12",
];

export const SERVICE_COUNT = 5;

export const TRACKING_PATTERN = /^RX-?\d{6}$/i;

export function normalizeCode(raw: string): string {
  const digits = raw.toUpperCase().replace(/[^0-9]/g, "");
  return `RX-${digits.padStart(6, "0").slice(-6)}`;
}

/** FNV-1a — small, stable string hash. */
function hash(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fmt(d: Date, locale: string): string {
  return d
    .toLocaleString(locale, {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      numberingSystem: "latn",
    })
    .toUpperCase()
    .replace(",", " ·");
}

export function lookupShipment(rawCode: string, locale: string): Shipment {
  const code = normalizeCode(rawCode);
  const rand = mulberry32(hash(code));

  const originIdx = Math.floor(rand() * HUBS.length);
  let destIdx = Math.floor(rand() * HUBS.length);
  if (destIdx === originIdx) destIdx = (destIdx + 1) % HUBS.length;

  const stageIndex = Math.floor(rand() * STAGES.length);
  const stepHours = 3 + rand() * 9;
  const start = new Date(Date.now() - stageIndex * stepHours * 3_600_000);

  const events: TimelineEvent[] = STAGES.map((stage, i) => {
    const t = new Date(start.getTime() + i * stepHours * 3_600_000);
    const midpoints = [originIdx, originIdx, originIdx, destIdx, destIdx, destIdx];
    return {
      stage,
      location: HUBS[midpoints[i]],
      timestamp: i <= stageIndex ? fmt(t, locale) : "—",
      done: i < stageIndex,
      current: i === stageIndex,
    };
  });

  const eta =
    stageIndex >= STAGES.length - 1
      ? null
      : fmt(new Date(start.getTime() + (STAGES.length - 1) * stepHours * 3_600_000), locale);

  return {
    code,
    origin: HUBS[originIdx],
    destination: HUBS[destIdx],
    serviceIdx: Math.floor(rand() * SERVICE_COUNT),
    weightKg: (0.4 + rand() * 38).toFixed(1),
    codDt: Math.round(15 + rand() * 480),
    pieces: 1 + Math.floor(rand() * 6),
    stageIndex,
    progress: stageIndex / (STAGES.length - 1),
    eta,
    events,
  };
}
