import { User, Moon, Sun, Menu } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useThemeStore } from "@/store/themeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import './css/BeforeNavigation.css';

const navData = {
  brand: {
    name: "CameraLanguage",
    path: "/"
  },
  links: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Documentation", path: "/documentation" },
  ],
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
      <div className="navContent flex items-center justify-between">
        <Link to={brand.path} className="navBrand">
          <h1 className="navTitle">{brand.name}</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="navLinks hidden md:flex items-center gap-6">
          {navData.links.map((link) => (
            <Link key={link.path} to={link.path} className="navLink">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navActions hidden md:flex items-center gap-4">
          <div className="themeToggle flex items-center gap-2">
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
            <span className="themeLabel text-sm">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </div>

          <Button asChild className="loginButton">
            <Link to={login.path} className="flex items-center gap-2">
              <login.icon className="loginIcon w-4 h-4" />
              <span>{login.label}</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
           {/* Theme Toggle (Mobile) */}
           <div className="flex items-center gap-2">
             <Switch
                checked={isDarkMode}
                onCheckedChange={handleDarkModeToggle}
             />
             {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
           </div>

           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navData.links.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                        <Link to={link.path} className="w-full cursor-pointer">
                            {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to={login.path} className="w-full font-semibold text-primary cursor-pointer flex justify-between items-center">
                        {login.label}
                        <User className="w-4 h-4" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
