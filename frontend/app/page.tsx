import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">UrbanOS</h1>
          <p className="text-sm text-slate-500">Smart City Operations Platform</p>
        </div>

        <Link
          href="/login"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          Login
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-8 py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Government-grade Municipal Command Center
          </p>

          <h2 className="text-5xl font-bold leading-tight text-slate-950">
            Manage city complaints, assets, alerts and field operations from one platform.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            UrbanOS helps municipal teams monitor citizen complaints, assign field
            officers, track public assets, publish emergency alerts, and review
            operational analytics with a realistic government workflow.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
            >
              Open Console
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">City Operations Snapshot</h3>
              <p className="text-sm text-slate-500">Hyderabad municipal overview</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Live
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Complaints", "25", "Citizen issues tracked"],
              ["Pending", "19", "Awaiting department action"],
              ["Assets", "15", "Public infrastructure records"],
              ["Critical Alerts", "5", "Emergency response items"],
            ].map(([label, value, text]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-8 pb-16 md:grid-cols-4">
        {[
          ["Complaint Operations", "Track citizen issues from submission to resolution."],
          ["GIS Command Center", "Monitor complaints, alerts and assets on city maps."],
          ["Asset Maintenance", "Manage streetlights, pumps, signals and CCTV records."],
          ["Audit & Governance", "Role-based access, logs, exports and reports."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}