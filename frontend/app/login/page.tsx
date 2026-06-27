"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("admin@metrovision.dev");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Login failed. Check backend URL or CORS configuration.");
      console.error(err);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
          Command Center Access
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          MetroVision Login
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Smart City Operations Platform
        </p>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm font-medium text-red-400">
            {error}
          </p>
        )}

        <label className="mt-6 block text-sm font-semibold text-slate-300">
          Email
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mt-4 block text-sm font-semibold text-slate-300">
          Password
        </label>
        <input
          type="password"
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-sky-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-xl bg-sky-500 p-3 font-bold text-white hover:bg-sky-400">
          Login
        </button>

        <Link
          href="/register"
          className="mt-4 block text-center text-sm text-slate-400 hover:text-sky-400"
        >
          Create citizen account
        </Link>
      </form>
    </main>
  );
}