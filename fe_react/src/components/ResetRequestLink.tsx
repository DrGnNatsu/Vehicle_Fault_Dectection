import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetRequestLinkProps {
  onSubmit: (email: string) => void;
}

export default function ResetRequestLink({ onSubmit }: ResetRequestLinkProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <>
      <div className="authFormHeader">
        <h2 className="authFormTitle">Reset Password</h2>
        <p className="authFormSubtitle">
          Enter your email address and we will send you a link to reset your
          password.
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

        <Button type="submit" className="authSubmitButton">
          Send Reset Email
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
