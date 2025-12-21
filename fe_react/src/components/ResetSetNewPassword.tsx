import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetSetNewPasswordProps {
  onSubmit: (password: string) => void;
}

export default function ResetSetNewPassword({ onSubmit }: ResetSetNewPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <>
      <div className="authFormHeader">
        <h2 className="authFormTitle">Set a New Password</h2>
        <p className="authFormSubtitle">
          Enter your new password and confirm it to set a new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="authForm">
        <div className="authInputGroup">
          <Label htmlFor="password" title="Password" className="authLabel">
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
          <Label htmlFor="confirmPassword" title="Confirm Password" className="authLabel">
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
          Set Password
        </Button>
      </form>

      <div className="authFooterLinks">
        <p className="authFooterText">
          <Link to="/login" className="authLink">
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back to Login
          </Link>
        </p>
      </div>
    </>
  );
}
