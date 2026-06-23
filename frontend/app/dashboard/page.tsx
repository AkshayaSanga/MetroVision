"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function MetricCard({
  label,
  value,
  caption,
  tone,
}: {
  label: string;
  value: string | number;
  caption: string;
  tone: "blue" | "green" | "orange" | "red" | "slate";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    red: "bg-red-50 text-red-700 border-red-100",
    slate: "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`rounded-full border px-2.5 py-1 text-xs ${tones[tone]}`}>
          Live
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold text-slate-950">{value}</div>
      <p className="mt-2 text-xs text-slate-500">{caption}</p>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState<any>({});
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    api.get("/dashboard/summary").then((r) => setSummary(r.data));
    api.get("/dashboard/complaint-trends").then((r) => setTrends(r.data));
  }, []);

  const monthly = [
    { name: "Jan", value: 18 },
    { name: "Feb", value: 24 },
    { name: "Mar", value: 21 },
    { name: "Apr", value: 30 },
    { name: "May", value: 28 },
    { name: "Jun", value: 35 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              UrbanOS Command Centre
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Hyderabad City Operations Dashboard
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Real-time overview of citizen complaints, infrastructure assets,
              emergency alerts, department workload, and SLA performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Region</p>
              <p className="font-semibold text-slate-900">Hyderabad</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">System Status</p>
              <p className="font-semibold text-emerald-800">Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          label="Total Complaints"
          value={summary.total_complaints ?? "-"}
          caption="All citizen reports"
          tone="blue"
        />
        <MetricCard
          label="Pending Cases"
          value={summary.pending_complaints ?? "-"}
          caption="Awaiting department action"
          tone="orange"
        />
        <MetricCard
          label="Resolved"
          value={summary.resolved_complaints ?? "-"}
          caption="Successfully closed"
          tone="green"
        />
        <MetricCard
          label="Active Assets"
          value={summary.active_assets ?? "-"}
          caption="Operational infrastructure"
          tone="slate"
        />
        <MetricCard
          label="Critical Alerts"
          value={summary.critical_alerts ?? "-"}
          caption="Emergency priority"
          tone="red"
        />
        <MetricCard
          label="SLA Compliance"
          value={`${summary.sla_compliance ?? "-"}%`}
          caption="Resolution target score"
          tone="green"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Complaints by Category
              </h2>
              <p className="text-sm text-slate-500">
                Department-wise operational load across city services
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Live API
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Department Performance
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Current resolution efficiency score
          </p>

          <div className="space-y-5">
            {[
              ["Roads & Potholes", "82%", "bg-emerald-500"],
              ["Water Supply", "74%", "bg-blue-500"],
              ["Sanitation", "69%", "bg-orange-500"],
              ["Traffic Signals", "91%", "bg-emerald-500"],
            ].map(([name, value, bar]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="font-semibold text-slate-900">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className={`h-2 rounded-full ${bar}`} style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-lg font-bold text-slate-950">
            Monthly Complaint Trend
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Incoming cases received over the last six months
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Priority Queue</h2>
          <p className="mb-6 text-sm text-slate-500">
            Issues requiring officer attention
          </p>

          <div className="space-y-3">
            {[
              ["Flood alert near Musi River", "Emergency", "bg-red-50 text-red-700"],
              ["Water leakage at Madhapur", "Water", "bg-orange-50 text-orange-700"],
              ["Signal outage at Hitech City", "Traffic", "bg-blue-50 text-blue-700"],
              ["SLA breach risk in Roads", "Roads", "bg-yellow-50 text-yellow-700"],
            ].map(([title, dept, style]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900">{title}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${style}`}>
                    {dept}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}