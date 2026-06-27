"use client";

import {
    AlertTriangle,
    Building2,
    FilePlus2,
    FileSpreadsheet,
} from "lucide-react";

const actions = [
  {
    title: "New Complaint",
    desc: "Register a citizen issue",
    icon: FilePlus2,
  },
  {
    title: "Register Asset",
    desc: "Add infrastructure asset",
    icon: Building2,
  },
  {
    title: "Create Alert",
    desc: "Emergency notification",
    icon: AlertTriangle,
  },
  {
    title: "Generate Report",
    desc: "Export operational report",
    icon: FileSpreadsheet,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Frequently used operational tasks
      </p>

      <div className="mt-5 grid gap-4">
        {actions.map(({ title, desc, icon: Icon }) => (
          <button
            key={title}
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal-600 hover:bg-teal-50"
          >
            <div className="rounded-xl bg-teal-100 p-3 text-teal-700">
              <Icon size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {title}
              </h3>

              <p className="text-sm text-slate-500">
                {desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}