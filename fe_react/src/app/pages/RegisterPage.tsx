import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import "../css/Register.css";

import { validatePassword } from "@/utils/utils";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters including uppercase, lowercase, number and special character.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const data = await authService.register(email, password, confirmPassword);
      console.log("Registration successful:", data);
      setSuccess(data.message || "Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="authFormHeader">
        <h2 className="authFormTitle">Create an account</h2>
        <p className="authFormSubtitle">
          Get started with MynaUI today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="authForm">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-600 bg-green-100 rounded-lg">
            {success}
          </div>
        )}
        <div className="authInputGroup">
          <Label htmlFor="email" className="authLabel">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=" team@mynaui.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="authInput"
            required
            disabled={isLoading || !!success}
          />
        </div>

        <div className="authInputGroup">
          <Label htmlFor="password" className="authLabel">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder=" ••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="authInput"
            required
            disabled={isLoading || !!success}
          />
          <p className="authInputHint">
                        Must be at least 8 characters including uppercase, lowercase, number and special character.
          </p>
        </div>

        <div className="authInputGroup">
          <Label htmlFor="confirmPassword" className="authLabel">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder=" ••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="authInput"
            required
            disabled={isLoading || !!success}
          />
        </div>

        <Button type="submit" className="authSubmitButton" disabled={isLoading || !!success}>
          {isLoading ? "Creating account..." : (
            <>
              Create Account <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </form>

      <div className="authFooterLinks">
        <p className="authFooterText">
          Already have an account?{" "}
          <Link to="/login" className="authLink">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
