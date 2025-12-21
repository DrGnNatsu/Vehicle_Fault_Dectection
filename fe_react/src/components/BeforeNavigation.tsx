import { Camera, User, Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";
import './css/BeforeNavigation.css';

const navData = {
  brand: {
    name: "CameraLanguage",
    icon: Camera,
    path: "/"
  },
  login: {
    label: "Login",
    icon: User,
    path: "/login"
  }
};

export default function BeforeNavigation() {
  const { isDarkMode, toggleDarkMode, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const handleDarkModeToggle = (checked: boolean) => {
    toggleDarkMode(checked);
  };

  const { brand, login } = navData;

  return (
    <nav className="navContainer">
      <div className="navContent">
        {/* Left Section: Logo */}
        <Link to={brand.path} className="navBrand">
          <brand.icon className="navLogo" />
          <h1 className="navTitle">{brand.name}</h1>
        </Link>

        <div className="navActions">
          {/* Dark Mode Toggle */}
          <div className="themeToggle">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-primary" />
            ) : (
              <Sun className="w-4 h-4 text-orange-500" />
            )}
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              aria-label="Toggle dark mode"
            />
            <span className="themeLabel">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </div>

          {/* Login Button */}
          <Button asChild className="loginButton">
            <Link to={login.path}>
              <login.icon className="loginIcon" />
              <span>{login.label}</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
