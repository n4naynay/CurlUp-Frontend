"use client";

import { useState } from "react";
import { Eye, EyeOff, Scissors, Star, Users, Calendar, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SocialLogin from "@/components/SocialLogin";

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    timezone: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://13.220.150.65:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          timezone: formData.timezone,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Registration successful! Please check your email for verification.");
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          dateOfBirth: "",
          timezone: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    {
      title: "Hair Cutting & Styling",
      description: "Professional cuts and styling for all hair types",
      icon: <Scissors className="w-8 h-8" />,
      price: "From $45"
    },
    {
      title: "Hair Coloring",
      description: "Expert color treatments and highlights",
      icon: <Star className="w-8 h-8" />,
      price: "From $85"
    },
    {
      title: "Hair Treatments",
      description: "Deep conditioning and repair treatments",
      icon: <Users className="w-8 h-8" />,
      price: "From $65"
    }
  ];

  const features = [
    "Book appointments online 24/7",
    "Expert stylists with years of experience",
    "Premium hair care products",
    "Personalized consultations",
    "Flexible scheduling options",
    "Satisfaction guarantee"
  ];

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setShowRegistration(false)}
            className="mb-4 text-gray-600 hover:text-black transition-colors flex items-center"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black flex items-center justify-center bg-white">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-black">H</span>
                <div className="w-4 sm:w-6 h-0.5 bg-teal-400 mx-1"></div>
                <span className="text-xl sm:text-2xl font-bold text-black">D</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Register</h1>
            <p className="text-gray-600 italic text-sm sm:text-base">Create an account today!</p>
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
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base"
                disabled={isLoading}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base"
                disabled={isLoading}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="middleName" className="block text-sm font-medium text-black mb-2">
                Middle Name
              </Label>
              <Input
                id="middlename"
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base"
                disabled={isLoading}
                required
              />
            </div>

            {/* Gender and Date of Birth Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender" className="block text-sm font-medium text-black mb-2">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-black mb-2">
                  Date of Birth
                </Label>
                <Select value={formData.dateOfBirth} onValueChange={(value) => handleInputChange("dateOfBirth", value)}>
                  <SelectTrigger className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1990">1990</SelectItem>
                    <SelectItem value="1991">1991</SelectItem>
                    <SelectItem value="1992">1992</SelectItem>
                    <SelectItem value="1993">1993</SelectItem>
                    <SelectItem value="1994">1994</SelectItem>
                    <SelectItem value="1995">1995</SelectItem>
                    <SelectItem value="1996">1996</SelectItem>
                    <SelectItem value="1997">1997</SelectItem>
                    <SelectItem value="1998">1998</SelectItem>
                    <SelectItem value="1999">1999</SelectItem>
                    <SelectItem value="2000">2000</SelectItem>
                    <SelectItem value="2001">2001</SelectItem>
                    <SelectItem value="2002">2002</SelectItem>
                    <SelectItem value="2003">2003</SelectItem>
                    <SelectItem value="2004">2004</SelectItem>
                    <SelectItem value="2005">2005</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time Zone */}
            <div>
              <Label htmlFor="timezone" className="block text-sm font-medium text-black mb-2">
                Time Zone (Location)
              </Label>
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                <SelectTrigger className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC - Coordinated Universal Time</SelectItem>
                  <SelectItem value="est">EST - Eastern Standard Time</SelectItem>
                  <SelectItem value="cst">CST - Central Standard Time</SelectItem>
                  <SelectItem value="mst">MST - Mountain Standard Time</SelectItem>
                  <SelectItem value="pst">PST - Pacific Standard Time</SelectItem>
                  <SelectItem value="gmt">GMT - Greenwich Mean Time</SelectItem>
                  <SelectItem value="cet">CET - Central European Time</SelectItem>
                  <SelectItem value="jst">JST - Japan Standard Time</SelectItem>
                  <SelectItem value="aest">AEST - Australian Eastern Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobile" className="block text-sm font-medium text-black mb-2">
                Mobile number
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black h-10 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black pr-12 h-10 sm:h-12 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="w-full border-2 border-black rounded-none bg-white text-black focus:ring-0 focus:border-black pr-12 h-10 sm:h-12 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 sm:py-4 text-base sm:text-lg font-medium rounded-none transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-gray-600 text-sm sm:text-base">
              Already have an account?{" "}
              <a href="/login" className="text-black font-medium hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center bg-white">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-black">H</span>
                  <div className="w-3 h-0.5 bg-teal-400 mx-1"></div>
                  <span className="text-lg font-bold text-black">D</span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold text-black">HairDressing</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-black transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-black transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-black transition-colors">Contact</a>
              <a href="/login" className="text-gray-700 hover:text-black transition-colors">Login</a>
              <Button
                onClick={() => setShowRegistration(true)}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-none transition-colors"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowRegistration(true)}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-none transition-colors text-sm"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                Transform Your Look with
                <span className="text-teal-500 block">Expert Hair Care</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience premium hair styling, cutting, and treatments from our team of professional stylists. Book your appointment today and discover your perfect look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowRegistration(true)}
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-none transition-colors flex items-center justify-center"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-none transition-colors"
                >
                  View Services
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <Scissors className="w-24 h-24 text-teal-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Styling</h3>
                  <p className="text-gray-600">Expert cuts, colors, and treatments tailored to your unique style</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From classic cuts to modern styling, we offer a full range of professional hair services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-teal-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-black">{service.price}</span>
                  <Button
                    onClick={() => setShowRegistration(true)}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-none transition-colors text-sm"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                Why Choose Our Salon?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're committed to providing exceptional service and helping you look and feel your best.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-teal-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-black mb-4">Easy Online Booking</h3>
                <p className="text-gray-600 mb-6">
                  Schedule your appointment in just a few clicks. Choose your preferred time, stylist, and services.
                </p>
                <Button
                  onClick={() => setShowRegistration(true)}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-none transition-colors w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready for Your Hair Transformation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied clients who trust us with their hair care needs.
          </p>
          <Button
            onClick={() => setShowRegistration(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg rounded-none transition-colors"
          >
            Book Your Appointment Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-gray-900">
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-white">H</span>
                    <div className="w-2 h-0.5 bg-teal-400 mx-1"></div>
                    <span className="text-sm font-bold text-white">D</span>
                  </div>
                </div>
                <span className="ml-2 text-lg font-bold">HairDressing</span>
              </div>
              <p className="text-gray-400">
                Professional hair care services with a personal touch.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hair Cutting</li>
                <li>Hair Coloring</li>
                <li>Hair Treatments</li>
                <li>Styling</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
                <li><button onClick={() => setShowRegistration(true)} className="hover:text-white transition-colors">Register</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Hair Street</li>
                <li>Beauty City, BC 12345</li>
                <li>(555) 123-4567</li>
                <li>info@hairdressing.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HairDressing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}