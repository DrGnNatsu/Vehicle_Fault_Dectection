import { Rocket, Shield, Cpu } from "lucide-react";
import AfterNavigation from "@/components/AfterNavigation";
import BeforeNavigation from "@/components/BeforeNavigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import AboutCard from "@/components/AboutCard.tsx";
import { Link } from "react-router-dom";
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
            <Link to="/src/app/pages/DocumentationPage">
              <Button
                variant="destructive"
                className="heroButton"
              >
                Documentation
              </Button>
            </Link>

            <Link to="/src/app/pages/Home">
              <Button className="heroButton bg-primary hover:bg-primary/90">
                Try it Now
              </Button>
            </Link>
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
