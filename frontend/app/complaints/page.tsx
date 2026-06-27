"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import type { Complaint } from "@/types";
import { Eye, Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const statuses = ["Submitted", "Assigned", "In Progress", "Resolved", "Rejected"];

function statusBadge(value: string) {
  if (value === "Resolved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (value === "Rejected") return "bg-red-50 text-red-700 border-red-200";
  if (value === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
  if (value === "Assigned") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function priorityBadge(value: string) {
  if (value === "Critical") return "bg-red-50 text-red-700 border-red-200";
  if (value === "High") return "bg-orange-50 text-orange-700 border-orange-200";
  if (value === "Medium") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function Complaints() {
  const [items, setItems] = useState<Complaint[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/complaints", { params: { status: status || undefined } })
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, [status]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const text = `${item.title} ${item.category} ${item.status} ${item.priority} ${item.address}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [items, search]);

  return (
    <DashboardLayout>
      <main className="p-6">
        <div className="mb-6 rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
                Incident Management
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#111827]">
                Citizen Service Requests
              </h1>
              <p className="mt-2 text-sm text-[#64748B]">
                Track complaints, department assignment, priority and resolution workflow.
              </p>
            </div>

            <Link
              href="/complaints/new"
              className="inline-flex items-center gap-2 rounded-md bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#115E59]"
            >
              <Plus size={16} />
              New Complaint
            </Link>
          </div>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            ["Total Requests", items.length],
            ["Open", items.filter((i) => i.status !== "Resolved").length],
            ["Resolved", items.filter((i) => i.status === "Resolved").length],
            ["Critical", items.filter((i) => i.priority === "Critical").length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
              <p className="text-sm text-[#64748B]">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-[#111827]">{value}</p>
            </div>
          ))}
        </section>

        <div className="mb-5 rounded-xl border border-[#CBD5E1] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3">
              <Search size={17} className="text-[#64748B]" />
              <input
                placeholder="Search by title, category, address, priority..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-[#111827] outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="flex items-center gap-3 rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3">
              <Filter size={17} className="text-[#64748B]" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-transparent py-3 text-sm text-[#111827] outline-none"
              >
                <option value="">All Status</option>
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#CBD5E1] bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] text-[#64748B]">
              <tr>
                <th className="p-4 text-left">Request ID</th>
                <th className="p-4 text-left">Issue</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  <td className="p-4 font-mono font-semibold text-[#0F766E]">MV-{item.id}</td>
                  <td className="p-4 font-semibold text-[#111827]">{item.title}</td>
                  <td className="p-4 text-[#334155]">{item.category}</td>
                  <td className="p-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4 text-[#64748B]">{item.address}</td>
                  <td className="p-4">
                    <button className="inline-flex items-center gap-2 rounded-md border border-[#CBD5E1] px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-[#F8FAFC]">
                      <Eye size={14} />
                      Open
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-[#64748B]">
                    No service requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  );
}