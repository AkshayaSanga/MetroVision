import {
  ArrowRight,
  Building2,
  FileText,
  Map,
  ShieldCheck,
  Siren,
} from "lucide-react";
import Link from "next/link";

const metrics = [
  { value: "326", title: "Open Incidents", Icon: FileText },
  { value: "1,284", title: "Assets Monitored", Icon: Building2 },
  { value: "28", title: "Active Events", Icon: Siren },
  { value: "96.2%", title: "SLA Compliance", Icon: ShieldCheck },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E7EB] text-[#111827]">
      <header className="border-b border-[#CBD5E1] bg-[#111827] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#D97706]">
              Municipal Operations Suite
            </p>
            <h1 className="mt-1 text-2xl font-semibold">MetroVision</h1>
          </div>

          <Link
            href="/login"
            className="rounded-md bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#115E59]"
          >
            Operator Sign In
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-[#CBD5E1] bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B45309]">
            Hyderabad Municipal Corporation
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight">
            Urban operations intelligence for infrastructure, service delivery
            and emergency response.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#475569]">
            MetroVision provides a unified command platform for incident
            management, public infrastructure monitoring, GIS operations,
            department performance and field coordination.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-md bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#115E59]"
            >
              Open City Operations Console
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login"
              className="rounded-md border border-[#CBD5E1] px-5 py-3 text-sm font-semibold text-[#111827] hover:bg-[#F8FAFC]"
            >
              Secure Login
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-[#CBD5E1] bg-[#111827] p-6 text-white shadow-sm">
          <div className="mb-5 border-b border-[#334155] pb-4">
            <h3 className="text-base font-semibold">
              Operations Snapshot
            </h3>
            <p className="text-sm text-slate-400">
              Current city-wide service status
            </p>
          </div>

          <div className="grid gap-4">
            {metrics.map(({ value, title, Icon }) => (
              <div
                key={title}
                className="flex items-center justify-between rounded-lg border border-[#334155] bg-[#1F2937] p-4"
              >
                <div>
                  <p className="text-sm text-slate-400">{title}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {value}
                  </p>
                </div>
                <Icon className="text-[#D97706]" size={24} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-8 pb-14 md:grid-cols-4">
        {[
          ["Incident Management", "Citizen issues routed through status workflows."],
          ["Infrastructure Assets", "Public assets tracked with maintenance state."],
          ["Spatial Intelligence", "GIS-based visibility across city zones."],
          ["Operational Analytics", "SLA, departments and monthly performance."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm"
          >
            <Map className="mb-4 text-[#0F766E]" />
            <h3 className="font-semibold text-[#111827]">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#64748B]">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}