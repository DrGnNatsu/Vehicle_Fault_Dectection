import Footer from "@/components/Footer";
import BeforeNavigation from "@/components/BeforeNavigation";

export default function LandingPage() {
  return (
    <div
      className="
      min-h-screen flex flex-col 
      bg-cover bg-[center_80%] bg-no-repeat 
      transition-[background-image] duration-500 ease-in-out
      
      {/* These paths look for files in your public folder */}
      bg-[url('/LandingPage.png')] 
      dark:bg-[url('/LandingPageDark.png')]
    "
    >
      <BeforeNavigation />

      {/* Spacer to force footer to bottom */}
      <main className="flex-1 w-full flex-grow" />

      <Footer />
    </div>
  );
}
