import { Camera, Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { NavLink as RouterNavLink, Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/utils/utils";
import './css/AfterNavigation.css';

const navLinks = [
  { to: "/home", text: "Your Camera" },
  { to: "/blog", text: "BlogPage" },
  { to: "/documentation", text: "DocumentationPage" },
  { to: "/about", text: "About Us" },
  { to: "/search", text: "Search" },
];

export default function AfterNavigation() {
  const { isDarkMode, toggleDarkMode, initTheme } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <nav className="afterNavContainer">
      <div className="afterNavContent">
        {/* Left: Logo */}
        <div className="afterNavBrand">
          <div 
            onClick={() => navigate("/home")} 
            className="afterNavLogoLink cursor-pointer"
          >
            <Camera className="afterNavLogo" />
            <span className="afterNavTitle">CameraLanguage</span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="afterNavLinks">
          {navLinks.map((link) => (
            <NavItem key={link.to} to={link.to} text={link.text} />
          ))}
        </div>

        {/* Right: Theme Toggle */}
        <div className="afterNavActions">
          <div className="afterNavThemeToggle">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-primary" />
            ) : (
              <Sun className="w-4 h-4 text-orange-500" />
            )}
            <Switch
              checked={isDarkMode}
              onCheckedChange={(checked) => toggleDarkMode(checked)}
              aria-label="Toggle dark mode"
            />
            <span className="afterNavThemeLabel">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, text }: { to: string; text: string }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "afterNavItem",
          isActive && "afterNavItemActive"
        )
      }
    >
      {text}
    </RouterNavLink>
  );
}
