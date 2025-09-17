"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useProducts } from "./Hooks/useProduct";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  const { products, loading, error } = useProducts();

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
          <Button className="bg-[#5C5C79] text-white hover:bg-[#4a4a66]">
            + Create Product
          </Button>
        </div>

        {/* Loading/Error states */}
        {loading && <p className="text-[#5C5C79]">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold text-[#5C5C79]">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="font-bold text-[#5C5C79]">${product.price}</p>
              <p className="text-xs text-gray-500">
                {product.brand} • {product.color} {product.size && `• ${product.size}`}
              </p>
            </div>
          ))}
        </div>
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
