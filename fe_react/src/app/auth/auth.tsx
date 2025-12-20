import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

import Footer from "@/components/Footer";
import BeforeNavigation from "@/components/BeforeNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- Shared Layout Component ---
// This handles the background, header, footer, and the static left panel
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background split */}
      <div className="fixed inset-0 flex">
        <div className="w-1/2 bg-zinc-100 dark:bg-zinc-800" />
        <div className="w-1/2 bg-white dark:bg-black" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left panel (Static Branding) */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="max-w-md flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                CameraLanguage
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-3">
              <h1 className="text-gray-900 dark:text-gray-50 text-4xl font-extralight">
                You're one step away being fined.
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                A beautifully designed interface to pay for your mistake
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {[
                "Track and pay bills effortlessly",
                "Simplify your process",
                "Hassle-free payment",
                "Insights into your mistake",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-800 dark:text-gray-200">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-zinc-300 dark:bg-zinc-600" />

            <p className="text-gray-700 dark:text-gray-300 italic">
              "No hidden fees or charges — the price you see is the price you
              pay (We promise!)"
            </p>
          </div>
        </div>

        {/* Right panel (Dynamic Form Content) */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md flex flex-col gap-6">{children}</div>
        </div>
      </div>

      {/* Fixed header & footer */}
      <div className="fixed top-0 inset-x-0 z-20">
        <BeforeNavigation />
      </div>
      <div className="fixed bottom-0 inset-x-0 z-20">
        <Footer />
      </div>
    </div>
  );
};

// --- 1. Login Component ---
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Login submitted", { email, password });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold">
          Login
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Enter your details below to login
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=" team@mynaui.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-200"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=" ••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
          <p className="text-gray-500 text-sm">
            Must be at least 6 characters.
          </p>
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl bg-blue-700 text-white"
        >
          Login
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="h-10 rounded-xl text-gray-700 dark:text-gray-50"
        >
          Login with Google
        </Button>
      </form>

      <p className="text-gray-400 text-sm">
        Didn't have an account?{" "}
        <Link to="/registration" className="text-sky-400 hover:underline">
          Sign Up
        </Link>
      </p>
      <p className="text-gray-400 text-sm hover:underline">
        <Link to="/reset1">Forgot your password?</Link>
      </p>
    </AuthLayout>
  );
}

// --- 2. Registration Component ---
export function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Registration submitted", {
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold">
          Create an account
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Get started with MynaUI today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=" team@mynaui.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-200"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=" ••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
          <p className="text-gray-500 text-sm">
            Must be at least 6 characters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="confirmPassword"
            className="text-gray-700 dark:text-gray-200"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder=" ••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl bg-blue-700 text-white"
        >
          Create Account <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <p className="text-gray-400 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-sky-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

// --- 3. Reset1 Component (Request Link) ---
export function Reset1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Reset1 submitted", { email });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold">
          Reset Password
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=" team@mynaui.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl bg-blue-700 text-white"
        >
          Send Reset Email
        </Button>
      </form>

      <p className="text-gray-400 text-sm hover:underline">
        <Link to="/login">
          <ArrowLeft className="inline w-4 h-4 mr-1" /> Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}

// --- 4. Reset2 Component (Check Email) ---
export function Reset2() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Reset2 submitted");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-2">
        <BadgeCheck className="w-24 h-24 text-gray-700 dark:text-gray-200" />
        <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold text-center">
          Check Your Email
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm text-center">
          We sent you a magic link to sign in to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Button
          type="submit"
          className="h-10 rounded-xl bg-blue-700 text-white"
        >
          Login
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="h-10 rounded-xl text-gray-700 dark:text-gray-50"
        >
          Resend Email
        </Button>
      </form>
    </AuthLayout>
  );
}

// --- 5. Reset3 Component (Set New Password) ---
export function Reset3() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Reset3 submitted", { password, confirmPassword });
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold">
          Set a New Password
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-sm">
          Enter your new password and confirm it to set a new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-200"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=" ••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
          <p className="text-gray-500 text-sm">
            Must be at least 6 characters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="confirmPassword"
            className="text-gray-700 dark:text-gray-200"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder=" ••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl bg-blue-700 text-white"
        >
          Login
        </Button>
      </form>

      <p className="text-gray-400 text-sm hover:underline">
        <Link to="/login">
          <ArrowLeft className="inline w-4 h-4 mr-1" /> Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
