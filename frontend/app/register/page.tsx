"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "Citizen@123",
    role: "citizen",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      window.location.href = "/login";
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-[#E5E7EB] text-[#111827] lg:grid-cols-[1fr_1fr]">
      <section className="hidden bg-[#111827] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#D97706]">
            Citizen Services
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            MetroVision Public Access
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Citizens can register complaints, track service updates and follow
            municipal response progress through MetroVision.
          </p>
        </div>

        <div className="rounded-lg border border-[#334155] bg-[#1F2937] p-5">
          <p className="text-sm font-semibold text-white">Available Services</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>● Submit civic complaints</p>
            <p>● Track complaint status</p>
            <p>● View department response</p>
            <p>● Receive resolution updates</p>
          </div>
        </div>
      </section>

      <section className="grid place-items-center p-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-xl border border-[#CBD5E1] bg-white p-8 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#B45309]">
            Citizen Registration
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#111827]">
            Create public account
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            Register to submit and track civic service requests.
          </p>

          {error && (
            <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold text-[#334155]">
            Full Name
          </label>
          <input
            className="mt-2 w-full rounded-md border border-[#CBD5E1] bg-white p-3 text-[#111827] outline-none focus:border-[#0F766E]"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />

          <label className="mt-5 block text-sm font-semibold text-[#334155]">
            Email
          </label>
          <input
            className="mt-2 w-full rounded-md border border-[#CBD5E1] bg-white p-3 text-[#111827] outline-none focus:border-[#0F766E]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className="mt-5 block text-sm font-semibold text-[#334155]">
            Password
          </label>
          <input
            type="password"
            className="mt-2 w-full rounded-md border border-[#CBD5E1] bg-white p-3 text-[#111827] outline-none focus:border-[#0F766E]"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-md bg-[#0F766E] p-3 text-sm font-semibold text-white hover:bg-[#115E59] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <Link
            href="/login"
            className="mt-5 block text-center text-sm text-[#64748B] hover:text-[#0F766E]"
          >
            Already have an account? Sign in
          </Link>
        </form>
      </section>
    </main>
  );
}