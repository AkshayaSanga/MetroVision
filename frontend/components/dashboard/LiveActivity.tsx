"use client";

import { Clock3 } from "lucide-react";

const activities = [
  {
    time: "09:12",
    title: "Road repair team dispatched",
    location: "Madhapur",
  },
  {
    time: "09:34",
    title: "Water leakage acknowledged",
    location: "Kukatpally",
  },
  {
    time: "10:02",
    title: "Traffic signal inspection started",
    location: "Hitech City",
  },
  {
    time: "10:26",
    title: "Complaint MV-1024 resolved",
    location: "Gachibowli",
  },
];

export default function LiveActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <Clock3 className="text-teal-700" size={20} />

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Live Activity
          </h2>

          <p className="text-sm text-slate-500">
            Real-time operations feed
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">

        {activities.map((item) => (
          <div key={item.title} className="flex gap-4">

            <div className="mt-2 h-3 w-3 rounded-full bg-teal-600" />

            <div className="flex-1 border-b border-slate-100 pb-4">

              <p className="font-medium text-slate-900">
                {item.title}
              </p>

              <div className="mt-2 flex justify-between text-sm text-slate-500">
                <span>{item.location}</span>
                <span>{item.time}</span>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}