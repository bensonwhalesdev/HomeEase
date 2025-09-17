"use client";
import { useState } from "react";
import { Menu, Bell, User, X } from "lucide-react";
import Link from "next/link";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#FEB20F] text-black shadow-md z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-md bg-[#5C5C79] flex items-center justify-center font-bold text-[#FEB20F]">
            A
          </span>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href="#" className="hover:text-white transition">Overview</Link>
          <Link href="#" className="hover:text-white transition">Users</Link>
          <Link href="/admindashboard/products" className="hover:text-white transition">Products</Link>
          <Link href="#" className="hover:text-white transition">Reports</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="relative hover:text-white transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#5C5C79]" />
          </button>
          <button className="hover:text-white transition">
            <User size={20} />
          </button>
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* Sidebar */}
          <div className="w-64 bg-[#FEB20F] h-full shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 font-medium">
              <Link href="#" className="hover:text-white transition">Overview</Link>
              <Link href="#" className="hover:text-white transition">Users</Link>
              <Link href="#" className="hover:text-white transition">Products</Link>
              <Link href="#" className="hover:text-white transition">Reports</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
