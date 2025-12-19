import { Camera} from "lucide-react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function AfterNavigation() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // ... (Keep your existing useEffect/Handlers here) ... 
  
  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked)
    if (checked) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <nav className="w-full h-20 bg-transparent flex justify-center">  
      {/* Container */}
      <div className="w-full !px-10 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Camera className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        {/* Center: Links (FIXED) */}
        <div className="hidden md:flex items-center gap-8">
            <NavLink text="Your Camera" />
            <NavLink text="Blog" />
            <NavLink text="Documentation" />
            <NavLink text="About Us" />
        </div>

        {/* Right: Dark Mode & Avatar */}
        <div className="flex items-center gap-6">
          
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

          <div className="w-12 h-12">
            <img 
              className="w-full h-full rounded-full object-cover border border-gray-200" 
              src="https://placehold.co/48x48" 
              alt="User Profile"
            />
          </div>            
        </div>

      </div>
    </nav>
  )
}

// Helper component for the links to keep code clean
function NavLink({ text }: { text: string }) {
  return (
    <a 
      href="#" 
      className="text-gray-900 dark:text-gray-100 text-lg font-medium hover:text-blue-600 transition-colors"
    >
      {text}
    </a>
  )
}