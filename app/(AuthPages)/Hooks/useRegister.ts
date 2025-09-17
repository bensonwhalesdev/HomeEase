"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { SignUpInput } from "../types/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //password regex: ≥8 chars, at least 1 uppercase, at least 1 digit
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const register = async (formData: SignUpInput) => {
    try {
      setLoading(true);
      setError(null);

      //Validate password before sending request
      if (!passwordRegex.test(formData.password)) {
        setError(
          "Password must be at least 8 characters, include one uppercase letter and one number"
        );
        setLoading(false);
        return;
      }

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
        const token = data.data.signup.token;

        // Save token to cookies (expires in 7 days)
        Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" });

        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
