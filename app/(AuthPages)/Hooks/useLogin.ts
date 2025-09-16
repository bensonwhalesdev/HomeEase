"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoginInput } from "../types/auth";


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (formData: LoginInput) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post("/api/graphql", {
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              token
              user {
                id
                name
                email
                role
              }
            }
          }
        `,
        variables: { input: formData },
      });

      if (data.errors) {
        setError(data.errors[0].message);
      } else {
        localStorage.setItem("token", data.data.login.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
