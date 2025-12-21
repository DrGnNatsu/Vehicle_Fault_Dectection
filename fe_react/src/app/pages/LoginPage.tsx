import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../css/Login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /**
     * TODO: API FETCH PLACEHOLDER
     * Place for login API integration
     */
    console.log("[v0] Login submitted", { email, password });
  };

  return (
    <AuthLayout>
      <div className="authFormHeader">
        <h2 className="authFormTitle">Login</h2>
        <p className="authFormSubtitle">
          Enter your details below to login
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

        <Button type="submit" className="authSubmitButton">
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          className="authGoogleButton"
        >
          Login with Google
        </Button>
      </form>

      <div className="authFooterLinks">
        <p className="authFooterText">
          Didn't have an account?{" "}
          <Link to="/register" className="authLink">
            Sign Up
          </Link>
        </p>
        <p className="authFooterText">
          <Link to="/reset-password" title="Forgot your password?" className="authLink">
            Forgot your password?
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
