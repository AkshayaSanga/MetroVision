"use client";

import {
  Bell,
  CalendarDays,
  LogOut,
  Search,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

export default function Topbar() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#CBD5E1] bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-8">

        {/* Left */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
            MetroVision Enterprise
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-[#111827]">
            City Operations Console
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Hyderabad Municipal Corporation • Live Operations
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden items-center gap-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-2 lg:flex">
            <Search size={16} className="text-[#64748B]" />

            <input
              placeholder="Search incidents, assets, officers..."
              className="w-64 bg-transparent text-sm text-[#111827] placeholder:text-[#94A3B8] outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="rounded-lg border border-[#CBD5E1] bg-white p-3 hover:bg-[#F8FAFC]">
            <Bell
              size={18}
              className="text-[#475569]"
            />
          </button>

          {/* Status */}
          <div className="hidden items-center gap-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-2 xl:flex">
            <ShieldCheck
              size={18}
              className="text-green-600"
            />

            <div>
              <p className="text-xs text-[#64748B]">
                System Status
              </p>

              <p className="text-sm font-semibold text-[#15803D]">
                Operational
              </p>
            </div>
          </div>

          {/* Shift */}
          <div className="hidden items-center gap-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-2 xl:flex">
            <CalendarDays
              size={17}
              className="text-[#B45309]"
            />

            <div>
              <p className="text-xs text-[#64748B]">
                Current Shift
              </p>

              <p className="text-sm font-semibold text-[#111827]">
                Morning
              </p>
            </div>
          </div>

          {/* User */}
          <div className="hidden items-center gap-3 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-2 md:flex">
            <UserCircle2
              size={34}
              className="text-[#0F766E]"
            />

            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Super Administrator
              </p>

              <p className="text-xs text-[#64748B]">
                Hyderabad Command Center
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            <LogOut size={16} />
            Sign Out
          </button>

        </div>
      </div>
    </header>
  );
}