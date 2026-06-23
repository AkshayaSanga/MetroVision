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
    } catch {
      setError("Invalid login or backend not running");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7fb] p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-blue-700">UrbanOS Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Smart City Operations Platform
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <label className="mt-6 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          type="password"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-xl bg-blue-600 p-3 font-bold text-white hover:bg-blue-700">
          Login
        </button>

        <Link
          href="/register"
          className="mt-4 block text-center text-sm text-slate-500 hover:text-blue-700"
        >
          Create citizen account
        </Link>
      </form>
    </main>
  );
}