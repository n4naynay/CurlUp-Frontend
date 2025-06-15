"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLogin from "@/components/SocialLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://13.220.150.65:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Login successful! Redirecting...");
        // Here you would typically redirect to dashboard or store auth token
        console.log("Login successful:", result);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center bg-white">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-black">H</span>
              <div className="w-6 sm:w-8 h-0.5 bg-teal-400 mx-1"></div>
              <span className="text-2xl sm:text-3xl font-bold text-black">L</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">Welcome back</h1>
          <p className="text-gray-600 italic text-sm sm:text-base">Login to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="block text-sm sm:text-base font-medium text-black mb-3">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-12 sm:h-14 text-sm sm:text-base px-4"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="block text-sm sm:text-base font-medium text-black mb-3">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black pr-12 h-12 sm:h-14 text-sm sm:text-base px-4"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} className="sm:w-6 sm:h-6" /> : <Eye size={20} className="sm:w-6 sm:h-6" />}
              </button>
            </div>
            
            {/* Forgot Password Link */}
            <div className="text-right mt-3">
              <a href="/forgot-password" className="text-gray-600 text-sm sm:text-base italic hover:text-black transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Verify Button */}
          <Button
            type="button"
            className="w-full bg-white hover:bg-gray-50 text-black border-2 border-black py-3 sm:py-4 text-base sm:text-lg font-medium rounded-none transition-colors duration-200 mb-4"
            disabled={isLoading}
          >
            Verify
          </Button>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-4 sm:py-5 text-base sm:text-lg font-medium rounded-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Social Login */}
        <SocialLogin />

        {/* Register Link */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-600 text-sm sm:text-base">
            Oops, don't have an account?{" "}
            <a href="/" className="text-black font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}