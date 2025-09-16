"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SignUpInput } from "../types/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (formData: SignUpInput) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post("/api/graphql", {
        query: `
          mutation Signup($input: SignUpInput!) {
            signup(input: $input) {
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
        // save token
        localStorage.setItem("token", data.data.signup.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
