import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#FEB20F] shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.jpg"
            alt="HomeEase Logo"
            width={50}
            height={50}
            className="rounded"
          />
        </div>

        {/* Location */}
        {/* <div className="hidden md:flex items-center gap-2 bg-white/90 px-3 py-2 rounded-lg cursor-pointer hover:bg-white transition">
          <Image
            src="/hold.jpg"
            alt="Location"
            width={40}
            height={40}
            className="rounded-md"
          />
          <div className="leading-tight">
            <p className="text-xs text-gray-500">Pickup or delivery?</p>
            <p className="text-sm font-semibold text-gray-800">Select Location</p>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </div> */}

        {/* Search Bar */}
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <Input
              placeholder="Search everything on HomeEase"
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-white focus:outline-none bg-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-white text-gray-800 hover:bg-gray-100 transition text-sm">
            <UserRound className="w-5 h-5" />
            <Link href={'/register'}><span className="hidden sm:inline">Sign in Account</span></Link>
          </button>

          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5C5C79] text-white hover:bg-[#4a4a66] transition">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
