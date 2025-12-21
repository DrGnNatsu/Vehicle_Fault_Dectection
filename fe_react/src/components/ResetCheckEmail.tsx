import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResetCheckEmailProps {
  onLogin: () => void;
  onResend: () => void;
}

export default function ResetCheckEmail({ onLogin, onResend }: ResetCheckEmailProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-6 py-4">
        <BadgeCheck className="w-24 h-24 text-primary" />
        <div className="authFormHeader text-center">
          <h2 className="authFormTitle">Check Your Email</h2>
          <p className="authFormSubtitle">
            We sent you a magic link to sign in to your account.
          </p>
        </div>
      </div>

      <div className="authForm">
        <Button onClick={onLogin} className="authSubmitButton">
          Login
        </Button>
        <Button
          onClick={onResend}
          variant="outline"
          className="authGoogleButton"
        >
          Resend Email
        </Button>
      </div>
    </>
  );
}
