"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import dynamic from "next/dynamic";

const CityMap = dynamic(() => import("@/components/map/CityMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <DashboardLayout>
      <main className="p-6">
        <CityMap />
      </main>
    </DashboardLayout>
  );
}