import React from "react";
import { Camera, CheckCircle2 } from "lucide-react";
import BeforeNavigation from "@/components/BeforeNavigation";
import Footer from "@/components/Footer";
import "../components/css/AuthLayout.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="authPageContainer">
      {/* Background split */}
      <div className="authBackground">
        <div className="authBackgroundLeft" />
        <div className="authBackgroundRight" />
      </div>

      {/* Main content */}
      <div className="authMainContent">
        {/* Left panel (Static Branding) */}
        <div className="authLeftPanel">
          <div className="authBrandingWrapper">
            {/* Logo */}
            <div className="authLogoSection">
              <Camera className="authLogoIcon" />
              <span className="authLogoText">CameraLanguage</span>
            </div>

            {/* Heading */}
            <div className="authHeadingSection">
              <h1 className="authTitle">You're one step away being fined.</h1>
              <p className="authSubtitle">
                A beautifully designed interface to pay for your mistake
              </p>
            </div>

            {/* Features */}
            <div className="authFeaturesList">
              {[
                "Track and pay bills effortlessly",
                "Simplify your process",
                "Hassle-free payment",
                "Insights into your mistake",
              ].map((text) => (
                <div key={text} className="authFeatureItem">
                  <CheckCircle2 className="authFeatureIcon" />
                  <span className="authFeatureText">{text}</span>
                </div>
              ))}
            </div>

            <div className="authSeparator" />

            <p className="authQuote">
              "No hidden fees or charges — the price you see is the price you
              pay (We promise!)"
            </p>
          </div>
        </div>

        {/* Right panel (Dynamic Form Content) */}
        <div className="authRightPanel">
          <div className="authFormWrapper">{children}</div>
        </div>
      </div>

      {/* Fixed header & footer */}
      <div className="authNavWrapper">
        <BeforeNavigation />
      </div>
      <div className="authFooterWrapper">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
