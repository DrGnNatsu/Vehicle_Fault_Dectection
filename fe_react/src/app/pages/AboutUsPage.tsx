import { Rocket, Shield, Cpu } from "lucide-react";
import AfterNavigation from "@/components/AfterNavigation";
import BeforeNavigation from "@/components/BeforeNavigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import AboutCard from "@/components/AboutCard.tsx";
import { useNavigate } from "react-router-dom";
import '@/app/css/AboutUs.css';

const featureData = [
  {
    title: "Powerful",
    description: "Low response time",
    icon: Rocket,
  },
  {
    title: "Secure",
    description: "Encrypted by default",
    icon: Shield,
  },
  {
    title: "Smart",
    description: "AI-driven analysis",
    icon: Cpu,
  },
  {
    title: "Scalable",
    description: "Grows with your needs",
    icon: Rocket,
  },
];

export default function AboutUsPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <div className="aboutUsContainer">
      {isAuthenticated ? <AfterNavigation /> : <BeforeNavigation />}

      <main className="aboutUsMain">
        {/* --- Hero Section --- */}
        <section className="heroSection">
          <h1 className="heroTitle">
            Hello, Camera!
          </h1>

          <p className="heroSubtitle">
            A Domain-Specific Language for the camera
          </p>

          <div className="heroButtons">
            <Button
              variant="destructive"
              className="heroButton"
              onClick={() => navigate("/documentation")}
            >
              Documentation
            </Button>

            <Button 
              className="heroButton bg-primary hover:bg-primary/90"
              onClick={() => navigate(isAuthenticated ? "/home" : "/login")}
            >
              Try it Now
            </Button>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="featuresSection">
          <div className="featuresContent">
            <div className="featuresHeader">
              <h2 className="featuresTitle">
                Everything you need..
              </h2>
              <p className="featuresDescription">
                Has robust, powerful language and understands your camera.
              </p>
            </div>

            <div className="featuresGrid">
              {featureData.map((feature, index) => (
                <AboutCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
