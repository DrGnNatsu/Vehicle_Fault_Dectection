import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import "../css/Login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login(email, password);
      setAuth(data.jwt_token, data.role);
      console.log("Login successful:", data);
      
      const defaultPath = data.role.toLowerCase() === 'user' ? '/search' : '/home';
      navigate(defaultPath);
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
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
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <p className="authInputHint">
            Must be at least 8 characters including uppercase, lowercase, number and special character.
          </p>
        </div>

        <Button type="submit" className="authSubmitButton" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="authGoogleButton"
          disabled={isLoading}
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
