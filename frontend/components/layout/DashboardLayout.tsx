"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827]">
      <Sidebar />

      <main className="ml-72 min-h-screen">
        <Topbar />

        <div className="min-h-[calc(100vh-96px)] bg-[#E5E7EB]">
          {children}
        </div>
      </main>
    </div>
  );
}