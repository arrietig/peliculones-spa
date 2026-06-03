import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-900/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-900/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-violet-900/20 blur-[80px]" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-4 text-center text-xs text-slate-600">
        Movies SPA — dummyjson.com
      </footer>
    </div>
  );
}
