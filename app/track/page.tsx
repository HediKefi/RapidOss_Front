import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TrackClient from "@/components/TrackClient";

export const metadata: Metadata = {
  title: "Track a shipment — RAPIDOSS",
  description: "Trace any RAPIDOSS waybill: every scan, every hub, every handover.",
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        index="03"
        kicker="Live trace"
        title="Find your freight"
        lede="Enter a waybill number to replay the journey — pickup, hubs, line-haul and the last metre to the door."
      />
      <Suspense>
        <TrackClient />
      </Suspense>
    </>
  );
}
