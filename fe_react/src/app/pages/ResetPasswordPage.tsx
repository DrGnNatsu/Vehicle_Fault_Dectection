import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import ResetRequestLink from "@/components/ResetRequestLink";
import ResetCheckEmail from "@/components/ResetCheckEmail";
import ResetSetNewPassword from "@/components/ResetSetNewPassword";
import "../css/ResetPassword.css";

type ResetStage = "request" | "check-email" | "set-password";

export default function ResetPasswordPage() {
  const [stage, setStage] = useState<ResetStage>("request");
  const navigate = useNavigate();

  const handleRequestLink = (email: string) => {
    /**
     * TODO: API FETCH PLACEHOLDER
     * Place for "Request Reset Link" API integration
     */
    console.log("Requesting reset link for:", email);
    setStage("check-email");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleResendEmail = () => {
    /**
     * TODO: API FETCH PLACEHOLDER
     * Place for "Resend Reset Link" API integration
     */
    console.log("Resending reset link...");
  };

  const handleSetNewPassword = (password: string) => {
    /**
     * TODO: API FETCH PLACEHOLDER
     * Place for "Set New Password" API integration
     */
    console.log("Setting new password...");
    navigate("/login");
  };

  return (
    <AuthLayout>
      {stage === "request" && (
        <ResetRequestLink onSubmit={handleRequestLink} />
      )}
      {stage === "check-email" && (
        <ResetCheckEmail 
          onLogin={handleLoginRedirect} 
          onResend={handleResendEmail} 
        />
      )}
      {stage === "set-password" && (
        <ResetSetNewPassword onSubmit={handleSetNewPassword} />
      )}
      
      {/* 
        DEBUG HELPER: 
        In a real app, stage 'set-password' would be triggered by a token in the URL.
        For now, we can manually toggle stages or use buttons for testing.
      */}
      {stage === "check-email" && (
         <button 
           onClick={() => setStage("set-password")}
           className="mt-4 text-xs text-muted-foreground hover:underline"
         >
           (Debug: Go to Set Password stage)
         </button>
      )}
    </AuthLayout>
  );
}
