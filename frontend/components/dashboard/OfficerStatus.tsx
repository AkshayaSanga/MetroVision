"use client";

import { BadgeCheck } from "lucide-react";

const officers = [
  {
    name: "Rahul Kumar",
    department: "Roads",
    status: "Available",
  },
  {
    name: "Priya Sharma",
    department: "Water",
    status: "On Site",
  },
  {
    name: "Anil Reddy",
    department: "Traffic",
    status: "Busy",
  },
  {
    name: "Megha Rao",
    department: "Sanitation",
    status: "Available",
  },
];

export default function OfficerStatus() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-900">
        Officer Status
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Field workforce availability
      </p>

      <div className="mt-6 space-y-4">

        {officers.map((officer) => (
          <div
            key={officer.name}
            className="flex items-center justify-between border-b border-slate-100 pb-3"
          >
            <div>

              <p className="font-semibold text-slate-900">
                {officer.name}
              </p>

              <p className="text-sm text-slate-500">
                {officer.department}
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">

              <BadgeCheck
                size={15}
                className="text-emerald-600"
              />

              <span className="text-xs font-semibold text-emerald-700">
                {officer.status}
              </span>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}