import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

const WomenDeals = async () => {
  const res = await fetch(
    "https://dummyjson.com/products/category/womens-dresses?limit=5",
    { cache: "no-store" }
  );
  const data = await res.json();
  const products = data.products;

  return (
    <section className="w-[95%] mx-auto mt-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FEB20F] px-6 py-3 rounded-t-xl shadow-md">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Women Deals
        </h2>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:underline">
          See all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-white p-6 rounded-b-xl shadow-md">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden group cursor-pointer"
          >
            <div className="relative w-full h-40 flex items-center justify-center bg-gray-50">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={150}
                height={150}
                className="object-contain group-hover:scale-105 transition-transform"
              />
              {/* Category Badge */}
              <span className="absolute top-2 left-2 bg-[#FEB20F] text-xs font-semibold text-gray-800 px-2 py-1 rounded-md shadow">
                Fashion
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                {product.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[#5C5C79] font-bold">₦ {product.price}</span>
                <span className="text-xs text-gray-400 line-through">
                  ₦ {(product.price * 1.2).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WomenDeals;
