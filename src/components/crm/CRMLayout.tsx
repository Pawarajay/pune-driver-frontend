// src/components/crm/CRMLayout.tsx  — UPDATED: adds Driver Applications nav item
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, BookOpen, Users, CreditCard,
  LogOut, Car, Menu, X, ChevronRight, Bell, ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/crm/dashboard",           icon: LayoutDashboard, label: "Dashboard"         },
  { to: "/crm/bookings",            icon: BookOpen,         label: "Bookings"          },
  { to: "/crm/drivers",             icon: Users,            label: "Drivers"           },
  { to: "/crm/driver-applications", icon: ClipboardList,    label: "Applications"      },
  { to: "/crm/payments",            icon: CreditCard,       label: "Payments"          },
];

export default function CRMLayout() {
  const { admin, signOut } = useAuth();
  const navigate           = useNavigate();
  const [open, setOpen]    = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/crm/login");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#060e1e] border-r border-white/[0.07]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.07]">
        <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
          <Car className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none">PuneDriver</p>
          <p className="text-white/30 text-[10px] mt-0.5">CRM Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
              isActive
                ? "bg-accent text-white shadow-md"
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Admin info */}
      <div className="px-3 py-4 border-t border-white/[0.07]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center
                          text-accent text-xs font-bold flex-shrink-0">
            {admin?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{admin?.name}</p>
            <p className="text-white/30 text-[10px] truncate capitalize">{admin?.role}</p>
          </div>
        </div>
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                     text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#080f1d] overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-64 flex flex-col"><Sidebar /></aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-3 px-4 lg:px-6 py-4
                            border-b border-white/[0.07] bg-[#060e1e] flex-shrink-0">
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center
                            text-accent text-xs font-bold">
              {admin?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-white/70 text-sm font-medium">{admin?.name}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
