"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import type { Alert } from "@/types";
import { AlertTriangle, MapPin, Radio, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function severityClass(severity: string) {
  if (severity === "Critical") return "border-red-500/30 bg-red-500/10 text-red-400";
  if (severity === "High") return "border-orange-500/30 bg-orange-500/10 text-orange-400";
  if (severity === "Medium") return "border-amber-500/30 bg-amber-500/10 text-amber-400";
  return "border-slate-700 bg-slate-800 text-slate-300";
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/alerts").then((res) => setAlerts(res.data)).catch(() => setAlerts([]));
  }, []);

  const filtered = useMemo(() => {
    return alerts.filter((a) =>
      `${a.title} ${a.severity} ${a.location || ""}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [alerts, search]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              Emergency Operations
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Alert Center
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Monitor critical incidents, emergency alerts and response coordination.
            </p>
          </div>

          <button className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-400">
            + Create Alert
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <AlertTriangle className="text-red-400" />
            <p className="mt-4 text-sm text-slate-400">Total Alerts</p>
            <p className="mt-2 text-3xl font-bold text-white">{alerts.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <ShieldAlert className="text-red-400" />
            <p className="mt-4 text-sm text-slate-400">Critical</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {alerts.filter((a) => a.severity === "Critical").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <Radio className="text-amber-400" />
            <p className="mt-4 text-sm text-slate-400">High Priority</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {alerts.filter((a) => a.severity === "High").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <MapPin className="text-sky-400" />
            <p className="mt-4 text-sm text-slate-400">Active Zones</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {new Set(alerts.map((a) => a.location)).size}
            </p>
          </div>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search alerts..."
          className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
        />

        <div className="grid gap-4">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:bg-slate-800/60"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {alert.description || "Emergency alert requiring department response."}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} /> {alert.location || "Hyderabad"}
                  </p>
                </div>

                <span className={`rounded-full border px-4 py-2 text-xs font-bold ${severityClass(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}

          {!filtered.length && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              No alerts found.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}