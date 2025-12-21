import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { motion } from "framer-motion";

interface ResetRequestLinkProps {
  onSubmit: (email: string) => void;
}

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

export default function ResetRequestLink({ onSubmit }: ResetRequestLinkProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants} className="authFormHeader">
        <h2 className="authFormTitle">Reset Password</h2>
        <p className="authFormSubtitle">
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </motion.div>

      <motion.form 
        variants={itemVariants} 
        onSubmit={handleSubmit} 
        className="authForm"
      >
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
      </motion.form>

      <motion.div variants={itemVariants} className="authFooterLinks">
        <p className="authFooterText">
          <Link to="/login" className="authLink">
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back to Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
