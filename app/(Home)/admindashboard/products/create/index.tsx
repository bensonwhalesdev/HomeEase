"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "../Hooks/useCreateProduct";
import client from "@/app/lib/apolloClient";

export default function CreateProduct() {
  const { createProduct, loading } = useCreateProduct();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "", // base64 string will go here
    color: "",
    size: "",
    brand: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert image to base64 string
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

    const payload = {
      ...form,
      price: parseFloat(form.price),
    };

    await createProduct(payload);
    client.resetStore();
    router.push("/admindashboard/products");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#5C5C79]">Create Product</h1>

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

        {/* Image upload as base64 */}
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

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
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
