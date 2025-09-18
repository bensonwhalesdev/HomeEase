"use client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSingleProduct } from "../Hooks/useSingleProduct";
import { useDeleteProduct } from "../Hooks/useDeleteProduct";
import Image from "next/image";

export default function SingleProduct() {
  const router = useRouter();
  const params = useParams();
  const { product, loading, error } = useSingleProduct(params.id as string);
  const { deleteProduct } = useDeleteProduct();

  const handleDelete = async () => {
    const success = await deleteProduct(params.id as string);
    if (success) {
      router.push("/admindashboard/products");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-18 bg-white p-6 rounded-xl shadow-md">
      <Image width={100} height={100} src={product.image} alt={product.title}  className="w-full h-64 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-bold text-[#5C5C79] mb-4">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="text-gray-600">Brand: {product.brand}</p>
      <p className="text-gray-800 font-semibold mt-2">₦{product.price}</p>

      <div className="flex gap-4 mt-6">
        <Button
          className="bg-[#5C5C79] hover:bg-[#4a4a66] text-white"
          onClick={() => router.push(`/admindashboard/products/${params.id}/edit`)}
        >
          Edit
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
