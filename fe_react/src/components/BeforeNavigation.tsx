import { Camera, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function BeforeNavigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Run ONCE on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);

    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="w-full h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border shadow-md flex justify-center">
      <div className="w-full !px-10 h-full flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Camera className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-blue-600 text-4xl md:text-5xl font-extrabold font-sans leading-[48px]">
            CameraLanguage
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Darkmode
            </span>
          </div>

          {/* Login Button */}
          <Link to="/login">
            <Button
              size="lg"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white gap-2 !px-4 rounded-lg font-medium text-sm h-12"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
