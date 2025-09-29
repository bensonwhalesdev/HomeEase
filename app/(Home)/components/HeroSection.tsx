"use client";

import React, { useState } from "react";
import {
  Tv,
  Smartphone,
  HeartPulse,
  Home,
  Monitor,
  Shirt,
  ShoppingBag,
  Laptop,
  Baby,
  Gamepad2,
  Guitar,
  Grid,
  ChevronDown,
} from "lucide-react";
import Slider from "react-slick";
import Image from "next/image";

// react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { name: "Appliances", icon: Tv },
  { name: "Phones & Tablets", icon: Smartphone },
  { name: "Health & Beauty", icon: HeartPulse },
  { name: "Home & Office", icon: Home },
  { name: "Electronics", icon: Monitor },
  { name: "Fashion", icon: Shirt },
  { name: "Supermarket", icon: ShoppingBag },
  { name: "Computing", icon: Laptop },
  { name: "Baby Product", icon: Baby },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Musical Instruments", icon: Guitar },
  { name: "Other Categories", icon: Grid },
];

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-[95%] mx-auto mt-28">
      {/* Categories Menu */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col">
        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden justify-between items-center p-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700"
        >
          Categories{" "}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Categories list */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:block mt-4 space-y-3 overflow-y-auto`}
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FEB20F]/20 transition cursor-pointer"
              >
                <Icon className="w-5 h-5 text-[#5C5C79]" />
                <span className="text-gray-700 text-sm font-medium">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel */}
      <div className="md:col-span-2 rounded-xl shadow-md overflow-hidden">
        <Slider {...settings}>
          <div className="h-full">
            <Image
              src="/banner1.jpg"
              alt="Banner 1"
              width={800}
              height={400}
              className="rounded-xl object-cover w-full h-full aspect-[16/9]"
            />
          </div>
          <div className="h-full">
            <Image
              src="/banner2.jpg"
              alt="Banner 2"
              width={800}
              height={400}
              className="rounded-xl object-cover w-full h-full aspect-[16/9]"
            />
          </div>
          <div className="h-full">
            <Image
              src="/banner3.jpg"
              alt="Banner 3"
              width={800}
              height={400}
              className="rounded-xl object-cover w-full h-full aspect-[16/9]"
            />
          </div>
        </Slider>
      </div>

      {/* Promo Images */}
      <div className="flex flex-col gap-4">
        <div className="relative group overflow-hidden rounded-xl shadow-md flex-1">
          <Image
            src="/promo1.jpg"
            alt="Promo 1"
            width={400}
            height={200}
            className="object-cover w-full h-full group-hover:scale-105 transition"
          />
        </div>
        <div className="relative group overflow-hidden rounded-xl shadow-md flex-1">
          <Image
            src="/promo2.jpg"
            alt="Promo 2"
            width={400}
            height={200}
            className="object-cover w-full h-full group-hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
