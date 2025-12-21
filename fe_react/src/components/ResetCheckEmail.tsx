import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResetCheckEmailProps {
  onLogin: () => void;
  onResend: () => void;
  onBack: () => void;
}

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ResetCheckEmail({ onLogin, onResend, onBack }: ResetCheckEmailProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 py-4">
        <BadgeCheck className="w-24 h-24 text-primary" />
        <div className="authFormHeader text-center">
          <h2 className="authFormTitle">Check Your Email</h2>
          <p className="authFormSubtitle">
            We sent you a magic link to sign in to your account.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="authForm">
        <Button onClick={onLogin} className="authSubmitButton">
          Login
        </Button>
        <Button
          onClick={onResend}
          variant="outline"
          className="authGoogleButton text-foreground"
        >
          Resend Email
        </Button>
        
        <div className="text-center mt-2">
          <button 
            onClick={onBack}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Back to request
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
