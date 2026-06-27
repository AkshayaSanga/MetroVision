"use client";

import { Clock3, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B45309]">
            Hyderabad Smart City
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#111827]">
            Operations Command Center
          </h1>

          <p className="mt-2 text-[#64748B]">
            Unified monitoring for complaints, infrastructure, GIS intelligence,
            emergency response and municipal services.
          </p>
        </div>

        <div className="flex gap-4">

          <div className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <Clock3 size={18} />
              <span className="text-xs uppercase font-semibold">
                Live
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-[#111827]">
              {time}
            </p>
          </div>

          <div className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-4">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <ShieldCheck size={18} />
              <span className="text-xs uppercase font-semibold">
                Status
              </span>
            </div>

            <p className="mt-2 font-semibold text-green-700">
              All Systems Operational
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}