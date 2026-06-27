"use client";

import { AlertTriangle, Bell, CheckCircle2 } from "lucide-react";

const notifications = [
  ["Critical alert raised", "Traffic accident near Hitech City", "urgent"],
  ["Complaint assigned", "MV-1024 moved to Roads Department", "info"],
  ["Asset repaired", "Streetlight SL-882 is operational", "success"],
  ["Report generated", "Daily municipal summary completed", "info"],
];

export default function NotificationPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Live operational updates
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
          <Bell size={22} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {notifications.map(([title, desc, type]) => (
          <div
            key={title}
            className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            {type === "urgent" ? (
              <AlertTriangle size={18} className="mt-1 text-red-600" />
            ) : (
              <CheckCircle2 size={18} className="mt-1 text-teal-700" />
            )}

            <div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}