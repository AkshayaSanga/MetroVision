"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import type { Asset } from "@/types";
import { useEffect, useMemo, useState } from "react";

function badge(status: string) {
  switch (status) {
    case "Operational":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case "Maintenance":
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    case "Offline":
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    default:
      return "bg-slate-800 text-slate-300 border border-slate-700";
  }
}

export default function Assets() {
  const [items, setItems] = useState<Asset[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/assets")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]));
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) =>
      `${i.name} ${i.asset_type} ${i.address}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <DashboardLayout>
      <div className="p-6">

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              Infrastructure Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              City Assets
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Monitor streetlights, traffic signals, CCTV cameras,
              pumps and other municipal infrastructure.
            </p>
          </div>

          <button className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white hover:bg-sky-400">
            + Add Asset
          </button>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Assets</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {items.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Operational</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {items.filter(i => i.status === "Operational").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Maintenance</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {items.filter(i => i.status === "Maintenance").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Offline</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {items.filter(i => i.status === "Offline").length}
            </p>
          </div>
        </div>

        <input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
        />

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-sm">

            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="p-4 text-left">Asset</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Maintenance</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="p-4 font-semibold text-white">
                    {item.name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {item.asset_type}
                  </td>

                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-400">
                    {item.address}
                  </td>

                  <td className="p-4 text-slate-400">
                    {item.next_maintenance_date || "-"}
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-slate-500"
                  >
                    No assets found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}