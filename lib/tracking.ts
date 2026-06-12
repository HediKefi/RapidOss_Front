/**
 * Deterministic parcel generator for the tracking demo.
 * The same tracking number always resolves to the same parcel, so the
 * demo behaves like a real lookup service without a backend.
 *
 * Statuses mirror the real RAPIDOSS pipeline:
 * Préparation → Préparé → Livraison → Livré
 *                          └→ En Retour → Retourné
 * Préparation → Annulé
 *
 * All human-readable labels are resolved from the i18n dictionary by
 * the UI — this module only deals in stable keys.
 */

export type TrackStatus =
  | "PREPARATION"
  | "PREPARE"
  | "LIVRAISON"
  | "LIVRE"
  | "EN_RETOUR"
  | "RETOURNE"
  | "ANNULE";

export type Outcome = "delivered" | "returned" | "cancelled";

const PATHS: Record<Outcome, TrackStatus[]> = {
  delivered: ["PREPARATION", "PREPARE", "LIVRAISON", "LIVRE"],
  returned: ["PREPARATION", "PREPARE", "LIVRAISON", "EN_RETOUR", "RETOURNE"],
  cancelled: ["PREPARATION", "ANNULE"],
};

export interface TimelineEvent {
  status: TrackStatus;
  location: string;
  timestamp: string;
  done: boolean;
  current: boolean;
}

export interface Shipment {
  code: string;
  origin: string;
  destination: string;
  outcome: Outcome;
  path: TrackStatus[];
  serviceIdx: number; // index into dict.trackPage.serviceNames
  weightKg: string;
  codDt: number; // cash to collect on delivery, in dinars
  pieces: number;
  stageIndex: number;
  terminal: boolean; // journey closed (delivered / returned / cancelled)
  progress: number; // 0..1 along the path
  eta: string | null; // null when the journey is closed
  events: TimelineEvent[];
}

// City tags stay in Latin script across locales, like flight codes.
const CITIES = [
  "TUNIS TN-01",
  "ARIANA AR-02",
  "BEN AROUS BA-03",
  "MANOUBA MN-04",
  "NABEUL NB-05",
  "BIZERTE BZ-06",
  "SOUSSE SS-07",
  "MONASTIR MS-08",
  "SFAX SF-09",
  "KAIROUAN KR-10",
  "GABÈS GB-11",
  "MÉDENINE MD-12",
];

export const SERVICE_COUNT = 4;

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

  const originIdx = Math.floor(rand() * CITIES.length);
  let destIdx = Math.floor(rand() * CITIES.length);
  if (destIdx === originIdx) destIdx = (destIdx + 1) % CITIES.length;

  const outcomeRoll = rand();
  const outcome: Outcome =
    outcomeRoll < 0.68 ? "delivered" : outcomeRoll < 0.88 ? "returned" : "cancelled";
  const path = PATHS[outcome];

  const stageIndex = Math.floor(rand() * path.length);
  const terminal = stageIndex === path.length - 1;
  const stepHours = 4 + rand() * 10;
  const start = new Date(Date.now() - stageIndex * stepHours * 3_600_000);

  // where each status physically happens along the journey
  const placeFor = (status: TrackStatus): string => {
    switch (status) {
      case "PREPARATION":
      case "PREPARE":
      case "ANNULE":
      case "RETOURNE":
        return CITIES[originIdx];
      default:
        return CITIES[destIdx];
    }
  };

  const events: TimelineEvent[] = path.map((status, i) => ({
    status,
    location: placeFor(status),
    timestamp:
      i <= stageIndex ? fmt(new Date(start.getTime() + i * stepHours * 3_600_000), locale) : "—",
    done: i < stageIndex,
    current: i === stageIndex,
  }));

  const eta = terminal
    ? null
    : fmt(new Date(start.getTime() + (path.length - 1) * stepHours * 3_600_000), locale);

  return {
    code,
    origin: CITIES[originIdx],
    destination: CITIES[destIdx],
    outcome,
    path,
    serviceIdx: Math.floor(rand() * SERVICE_COUNT),
    weightKg: (0.4 + rand() * 28).toFixed(1),
    codDt: Math.round(15 + rand() * 480),
    pieces: 1 + Math.floor(rand() * 5),
    stageIndex,
    terminal,
    progress: stageIndex / (path.length - 1),
    eta,
    events,
  };
}
