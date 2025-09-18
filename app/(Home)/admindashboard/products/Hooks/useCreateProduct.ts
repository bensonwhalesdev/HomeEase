"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);

  const createProduct = async (formData: any) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/graphql", {
        query: `
          mutation CreateProduct($input: createProductInput!) {
            createProduct(input: $input) {
              id
              title
              category
              price
              image
              color
              size
              brand
            }
          }
        `,
        variables: { input: formData },
      });

      if (data.errors) {
        toast.error(data.errors[0].message);
      } else {
        toast.success("Product created successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  // helper: convert file → base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return { createProduct, convertToBase64, loading };
};
