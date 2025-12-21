import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../css/Register.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /**
     * TODO: API FETCH PLACEHOLDER
     * Place for registration API integration
     */
    console.log("[v0] Registration submitted", {
      email,
      password,
      confirmPassword,
    });
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
          />
          <p className="authInputHint">
            Must be at least 6 characters.
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
          />
        </div>

        <Button type="submit" className="authSubmitButton">
          Create Account <ArrowRight className="w-4 h-4 ml-1" />
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
