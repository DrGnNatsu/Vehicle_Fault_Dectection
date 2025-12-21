import { Moon, Sun, UserCircle, ChevronDown, Users, FileText, Activity, MapPin, Menu, Shield } from "lucide-react";
import { useEffect } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
  { to: "/search", text: "My Violations", roles: ['user'] },
  { to: "/violations", text: "Violations", roles: ['police'] },
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
      <div className="afterNavContent flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          onClick={() => navigate(role?.toLowerCase() === 'user' ? "/search" : "/home")} 
          className="afterNavBrand cursor-pointer"
        >
          <span className="afterNavTitle">CameraLanguage</span>
        </div>

        {/* Center: Desktop Links */}
        <div className="afterNavLinks hidden md:flex items-center gap-1">
          {publicNavLinks
            .filter(link => !link.roles || link.roles.includes(role?.toLowerCase() || ''))
            .map((link) => (
              <NavItem key={link.to} to={link.to} text={link.text} />
          ))}

          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger className="afterNavItem flex items-center gap-1 outline-none">
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
                <DropdownMenuItem onClick={() => navigate("/zones")}>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Zones Management</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/assignments")}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Assign Cameras</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right: Actions (Desktop + Mobile common) */}
        <div className="afterNavActions flex items-center gap-4">
          <div className="afterNavThemeToggle hidden md:flex">
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

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {publicNavLinks
                        .filter(link => !link.roles || link.roles.includes(role?.toLowerCase() || ''))
                        .map(link => (
                            <DropdownMenuItem key={link.to} onClick={() => navigate(link.to)}>
                                {link.text}
                            </DropdownMenuItem>
                    ))}
                    
                    {isAdmin && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Admin</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate("/manage-users")}>
                                <Users className="mr-2 h-4 w-4" /> Manage Users
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/rules")}>
                                <FileText className="mr-2 h-4 w-4" /> Rules
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/violations")}>
                                <Activity className="mr-2 h-4 w-4" /> Violations
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/zones")}>
                                <MapPin className="mr-2 h-4 w-4" /> Zones
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/assignments")}>
                                <Shield className="mr-2 h-4 w-4" /> Assign Cameras
                            </DropdownMenuItem>
                        </>
                    )}

                    <DropdownMenuSeparator />
                    <div className="flex items-center justify-between px-2 py-2">
                         <span className="text-sm">Dark Mode</span>
                         <Switch
                            checked={isDarkMode}
                            onCheckedChange={toggleDarkMode}
                        />
                    </div>
                </DropdownMenuContent>
             </DropdownMenu>
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
