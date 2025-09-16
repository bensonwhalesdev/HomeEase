"use client";
import { useState } from "react";
import { LoginInput } from "../types/auth";
import { useLogin } from "../Hooks/useLogin";
import AuthHeader from "../authHeader";


const Login = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <AuthHeader 
          title="Welcome Back" 
          subtitle="Login to continue your journey!" 
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-semibold text-white transition hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
