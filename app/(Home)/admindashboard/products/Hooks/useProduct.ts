"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.post("/api/graphql", {
          query: `
            query {
              products {
                id
                title
                description
                category
                price
                image
                color
                size
                rating
                reviews
                brand
              }
            }
          `,
        });

        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setProducts(data.data.products);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
