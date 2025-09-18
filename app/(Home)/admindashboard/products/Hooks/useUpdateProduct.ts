"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import client from "@/app/lib/apolloClient";
import { Product, UpdateProductInput } from "../../types/product";

export const useUpdateProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/graphql", {
          query: `
            query GetProduct($id: ID!) {
              product(id: $id) {
                id
                title
                description
                category
                price
                image
                color
                size
                brand
              }
            }
          `,
          variables: { id },
        });

        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setProduct(data.data.product);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Update product
  const updateProduct = async (payload: UpdateProductInput) => {
    try {
      const { data } = await axios.post("/api/graphql", {
        query: `
          mutation UpdateProduct($input: updateProductInput!) {
            updateProduct(input: $input) {
              id
              title
              description
              category
              price
              image
              color
              size
              brand
            }
          }
        `,
        variables: { input: payload },
      });

      if (data.errors) {
        toast.error(data.errors[0].message);
        return null;
      }

      toast.success("Product updated successfully");
      client.resetStore();
      return data.data.updateProduct;
    } catch (err: any) {
      toast.error(err.message || "Error updating product");
      return null;
    }
  };

  return { product, loading, error, updateProduct };
};
