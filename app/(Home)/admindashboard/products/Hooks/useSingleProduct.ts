"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleProduct = (id: string) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.post("/api/graphql", {
          query: `
            query Product($id: ID!) {
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  return { product, loading, error };
};
