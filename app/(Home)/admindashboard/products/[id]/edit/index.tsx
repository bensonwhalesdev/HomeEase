"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem,SelectValue, } from "@/components/ui/select";
import { useUpdateProduct } from "../../Hooks/useUpdateProduct";
import { Product } from "../../../types/product";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, updateProduct } = useUpdateProduct(id);
  const router = useRouter();

  const [form, setForm] = useState<Omit<Product, "id" | "reviews" | "rating">>({
    title: "",
    description: "",
    category: "",
    price: 0,
    image: "",
    color: "",
    size: "",
    brand: "",
  });

  // Prefill form when product is fetched
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        image: product.image,
        color: product.color,
        size: product.size || "",
        brand: product.brand || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file → base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const payload = {
      ...form,
      id,
      price: parseFloat(String(form.price)),
    };

    const updated = await updateProduct(payload);
    if (updated) {
      router.push(`/admindashboard/products/${id}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#5C5C79]">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Select
          value={form.category}
          onValueChange={(val) => setForm({ ...form, category: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
          </SelectContent>
        </Select>
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* File Upload for Image */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <Input
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          required
        />
        <Input
          name="size"
          placeholder="Size (optional)"
          value={form.size}
          onChange={handleChange}
        />
        <Input
          name="brand"
          placeholder="Brand (optional)"
          value={form.brand}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#5C5C79] text-white hover:bg-[#4a4a66] w-full"
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
