"use client";

import {
  AlertTriangle,
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  Map,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Operations",
    items: [
      { label: "City Console", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Incident Management", href: "/complaints", Icon: FileText },
      { label: "Infrastructure Assets", href: "/assets", Icon: Building2 },
      { label: "Emergency Alerts", href: "/alerts", Icon: AlertTriangle },
    ],
  },
  {
    title: "Spatial",
    items: [{ label: "Spatial Intelligence", href: "/map", Icon: Map }],
  },
  {
    title: "Governance",
    items: [
      { label: "Operational Analytics", href: "/reports", Icon: BarChart3 },
      { label: "Administration", href: "/admin", Icon: Shield },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-[#CBD5E1] bg-[#111827] text-slate-100">
      <div className="px-5 py-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[#D97706]">
          MetroVision
        </p>
        <h1 className="mt-2 text-xl font-semibold text-white">
          City Operations
        </h1>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Urban infrastructure and municipal service control.
        </p>
      </div>

      <div className="border-y border-[#334155] px-5 py-4">
        <p className="text-xs text-slate-500">Jurisdiction</p>
        <p className="mt-1 text-sm font-semibold text-white">
          Hyderabad Municipal Region
        </p>
      </div>

      <nav className="space-y-6 px-4 py-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(({ label, href, Icon }) => {
                const active = path === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#0F766E] text-white"
                        : "text-slate-400 hover:bg-[#1F2937] hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-[#334155] bg-[#1F2937] p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">System Health</p>
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-400">
            Live
          </span>
        </div>

        <div className="mt-3 space-y-2 text-xs text-slate-400">
          <p className="flex justify-between">
            <span>API Gateway</span>
            <span className="text-emerald-400">Healthy</span>
          </p>
          <p className="flex justify-between">
            <span>PostgreSQL</span>
            <span className="text-emerald-400">Online</span>
          </p>
          <p className="flex justify-between">
            <span>GIS Layer</span>
            <span className="text-amber-400">Synced</span>
          </p>
        </div>
      </div>
    </aside>
  );
}