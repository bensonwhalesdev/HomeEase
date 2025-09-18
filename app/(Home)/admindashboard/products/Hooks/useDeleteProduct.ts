"use client";
import axios from "axios";
import { toast } from "sonner";
import client from "@/app/lib/apolloClient";

export const useDeleteProduct = () => {
  const deleteProduct = async (id: string) => {
    try {
      const { data } = await axios.post("/api/graphql", {
        query: `
          mutation DeleteProduct($id: ID!) {
            deleteProduct(id: $id) {
            id
            title
            }
          }
        `,
        variables: { id },
      });

      if (data.errors) {
        toast.error(data.errors[0].message);
        return false;
      }

      if (data.data.deleteProduct) {
        toast.success(`${data.data.deleteProduct.title} deleted successfully`);
        client.resetStore();
        return true;
      }

      toast.error("Failed to delete product");
      return false;
    } catch (err: any) {
      toast.error(err.message || "Error deleting product");
      return false;
    }
  };

  return { deleteProduct };
};
