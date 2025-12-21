import { Moon, Sun, UserCircle, ChevronDown, Users, FileText, Activity } from "lucide-react";
import { useEffect } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { cn } from "@/utils/utils";
import './css/AfterNavigation.css';

const publicNavLinks = [
  { to: "/home", text: "Home", roles: ['admin', 'police'] },
  { to: "/search", text: "Search Violations", roles: ['admin', 'police', 'user'] },
  { to: "/documentation", text: "Docs", roles: ['admin', 'police'] },
  { to: "/about", text: "About", roles: ['admin', 'police'] },
];

export default function AfterNavigation() {
  const { isDarkMode, toggleDarkMode, initTheme } = useThemeStore();
  const { role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const isAdmin = role?.toLowerCase() === 'admin';

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
          {publicNavLinks
            .filter(link => !link.roles || link.roles.includes(role?.toLowerCase() || ''))
            .map((link) => (
              <NavItem key={link.to} to={link.to} text={link.text} />
          ))}

          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                Admin <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/manage-users")}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Manage Users</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/rules")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Rules Management</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/violations")}>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Violations Log</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right: Actions */}
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
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="p-1.5 rounded-full transition-colors hover:bg-muted text-muted-foreground hover:text-primary">
                <UserCircle className="w-6 h-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/account-settings")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/logout")} className="text-destructive focus:text-destructive">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
