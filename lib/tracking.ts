/**
 * Deterministic shipment generator for the tracking demo.
 * The same tracking code always resolves to the same shipment,
 * so the demo behaves like a real lookup service without a backend.
 */

export type ShipmentStage =
  | "REGISTERED"
  | "PICKED_UP"
  | "AT_HUB"
  | "LINE_HAUL"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export interface TimelineEvent {
  stage: ShipmentStage;
  label: string;
  location: string;
  timestamp: string;
  done: boolean;
  current: boolean;
}

export interface Shipment {
  code: string;
  origin: string;
  destination: string;
  service: string;
  weightKg: string;
  pieces: number;
  stageIndex: number;
  progress: number; // 0..1 across whole journey
  eta: string;
  events: TimelineEvent[];
}

const CITIES = [
  "PARIS CDG-7",
  "LYON SUD-2",
  "MARSEILLE P-4",
  "LILLE NRD-1",
  "BORDEAUX W-3",
  "TOULOUSE M-6",
  "NANTES A-5",
  "STRASBOURG E-2",
  "ROTTERDAM RT-9",
  "MILANO MX-3",
  "BARCELONA BC-8",
  "FRANKFURT FR-1",
];

const SERVICES = ["FLASH SAME-DAY", "NIGHT LINE-HAUL", "STANDARD B2B", "COLD CHAIN", "HEAVY FREIGHT"];

const STAGES: { stage: ShipmentStage; label: string }[] = [
  { stage: "REGISTERED", label: "Order registered" },
  { stage: "PICKED_UP", label: "Picked up at shipper dock" },
  { stage: "AT_HUB", label: "Sorted at origin hub" },
  { stage: "LINE_HAUL", label: "In line-haul transit" },
  { stage: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { stage: "DELIVERED", label: "Delivered & signed" },
];

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

function fmt(d: Date): string {
  return d
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
    .toUpperCase()
    .replace(",", " ·");
}

export function lookupShipment(rawCode: string): Shipment {
  const code = normalizeCode(rawCode);
  const rand = mulberry32(hash(code));

  const originIdx = Math.floor(rand() * CITIES.length);
  let destIdx = Math.floor(rand() * CITIES.length);
  if (destIdx === originIdx) destIdx = (destIdx + 1) % CITIES.length;

  const stageIndex = Math.floor(rand() * STAGES.length);
  const stepHours = 3 + rand() * 9;
  const start = new Date(Date.now() - stageIndex * stepHours * 3_600_000);

  const events: TimelineEvent[] = STAGES.map((s, i) => {
    const t = new Date(start.getTime() + i * stepHours * 3_600_000);
    const midpoints = [originIdx, originIdx, originIdx, destIdx, destIdx, destIdx];
    return {
      stage: s.stage,
      label: s.label,
      location: CITIES[midpoints[i]],
      timestamp: i <= stageIndex ? fmt(t) : "—",
      done: i < stageIndex,
      current: i === stageIndex,
    };
  });

  const eta =
    stageIndex >= STAGES.length - 1
      ? "COMPLETED"
      : fmt(new Date(start.getTime() + (STAGES.length - 1) * stepHours * 3_600_000));

  return {
    code,
    origin: CITIES[originIdx],
    destination: CITIES[destIdx],
    service: SERVICES[Math.floor(rand() * SERVICES.length)],
    weightKg: (0.4 + rand() * 240).toFixed(1),
    pieces: 1 + Math.floor(rand() * 12),
    stageIndex,
    progress: stageIndex / (STAGES.length - 1),
    eta,
    events,
  };
}
