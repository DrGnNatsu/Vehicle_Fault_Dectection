import { Moon, Sun, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/utils/utils";
import './css/AfterNavigation.css';

const allNavLinks = [
  { to: "/home", text: "Home", roles: ['admin', 'police'] },
  { to: "/blog", text: "Blog", roles: ['admin', 'police'] },
  { to: "/documentation", text: "Documentation", roles: ['admin', 'police'] },
  { to: "/about", text: "About Us", roles: ['admin', 'police'] },
  { to: "/search", text: "Search Violations", roles: ['admin', 'police', 'user'] },
];

export default function AfterNavigation() {
  const { isDarkMode, toggleDarkMode, initTheme } = useThemeStore();
  const { role } = useAuthStore();
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
            onClick={() => navigate(role?.toLowerCase() === 'user' ? "/search" : "/home")} 
            className="afterNavLogoLink cursor-pointer"
          >
            <span className="afterNavTitle">CameraLanguage</span>
          </div>
        </div>

        {/* Center: Links */}
        <div className="afterNavLinks">
          {allNavLinks
            .filter(link => !link.roles || link.roles.includes(role?.toLowerCase() || ''))
            .map((link) => (
              <NavItem key={link.to} to={link.to} text={link.text} />
          ))}
          {role?.toLowerCase() === 'admin' && (
            <NavItem to="/manage-users" text="Manage Users" />
          )}
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
          <RouterNavLink 
            to="/account-settings" 
            className={({ isActive }) => cn(
              "p-1.5 rounded-full transition-colors hover:bg-muted",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
            title="Account Settings"
          >
            <UserCircle className="w-6 h-6" />
          </RouterNavLink>
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
