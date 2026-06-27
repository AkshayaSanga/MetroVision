"use client";

import { CloudSun } from "lucide-react";

export default function WeatherCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-700 to-teal-900 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">
            Hyderabad
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            31°
          </h2>

          <p className="mt-2">
            Partly Cloudy
          </p>

          <p className="mt-4 text-sm opacity-80">
            Humidity 54%
          </p>

          <p className="text-sm opacity-80">
            Wind 14 km/h
          </p>
        </div>

        <CloudSun size={70} />
      </div>
    </div>
  );
}