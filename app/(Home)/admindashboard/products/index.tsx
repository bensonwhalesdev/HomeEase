"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useProducts } from "./Hooks/useProduct";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  const { products, loading, error } = useProducts();

  // Filtering + Sorting
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex relative">
      {/* Products List */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#5C5C79]">Products</h1>
          <Link href="/admindashboard/products/create"><Button className="bg-[#5C5C79] text-white hover:bg-[#4a4a66]">
            + Create Product
          </Button></Link>
        </div>

        {loading && <p className="text-[#5C5C79]">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Skeletons while loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg text-[#5C5C79]">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-[#FEB20F] font-bold mt-2">
                  ${product.price}
                </p>
                <Link href={`/admindashboard/products/${product.id}`} className="mt-4 inline-block px-4 py-2 text-white bg-[#5C5C79] rounded-md hover:bg-[#FEB20F] transition">View Product</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block w-64 p-6 bg-[#FEB20F] shadow-lg">
        <SidebarContent
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Sidebar (Mobile as Drawer) */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#5C5C79] text-white rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#FEB20F] p-6 w-72">
            <SidebarContent
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function SidebarContent({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: any) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[#5C5C79]">Filters</h2>

      {/* Search */}
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-[#5C5C79] focus:ring-[#5C5C79]"
      />

      {/* Category Filter */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Electronics">Electronics</SelectItem>
          <SelectItem value="Fashion">Fashion</SelectItem>
          <SelectItem value="Home">Home</SelectItem>
        </SelectContent>
      </Select>

      {/* Sorting */}
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="low">Price: Low → High</SelectItem>
          <SelectItem value="high">Price: High → Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
