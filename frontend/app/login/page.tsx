"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("admin@metrovision.dev");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to sign in. Please check backend connectivity."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-[#E5E7EB] text-[#111827] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-[#111827] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#D97706]">
            MetroVision
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Hyderabad Municipal Operations Center
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Secure access for administrators, field officers and department
            operators managing city services, incidents and public assets.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            ["326", "Open Incidents"],
            ["1,284", "Assets Monitored"],
            ["28", "Active Events"],
            ["96.2%", "SLA Compliance"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-lg border border-[#334155] bg-[#1F2937] p-4"
            >
              <p className="text-2xl font-semibold">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[#334155] bg-[#1F2937] p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">System Status</p>
          <div className="mt-3 space-y-2">
            <p>API ● Healthy</p>
            <p>Database ● Online</p>
            <p>GIS Layer ● Active</p>
          </div>
        </div>
      </section>

      <section className="grid place-items-center p-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-xl border border-[#CBD5E1] bg-white p-8 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#B45309]">
            Secure Operator Access
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#111827]">
            Sign in to MetroVision
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            Authorized municipal operations personnel only.
          </p>

          {error && (
            <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold text-[#334155]">
            Email
          </label>
          <input
            className="mt-2 w-full rounded-md border border-[#CBD5E1] bg-white p-3 text-[#111827] outline-none focus:border-[#0F766E]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5 block text-sm font-semibold text-[#334155]">
            Password
          </label>
          <input
            type="password"
            className="mt-2 w-full rounded-md border border-[#CBD5E1] bg-white p-3 text-[#111827] outline-none focus:border-[#0F766E]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-md bg-[#0F766E] p-3 text-sm font-semibold text-white hover:bg-[#115E59] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <Link
            href="/register"
            className="mt-5 block text-center text-sm text-[#64748B] hover:text-[#0F766E]"
          >
            Create citizen account
          </Link>
        </form>
      </section>
    </main>
  );
}