import { Camera, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function BeforeNavigation() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Toggle dark mode
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

  // Handle login button click
  const handleLoginClick = () => {
    // Add your login logic here
    console.log("Login button clicked")
  }

  return (
    <nav className="w-full h-20 bg-transparent">
      <div className="max-w-full mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Camera className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-blue-600 text-4xl md:text-5xl font-extrabold font-sans leading-[48px]">CameraLanguage</h1>
        </div>

        {/* Right Section - Dark Mode Toggle & Login */}
        <div className="flex items-center gap-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Darkmode</span>
          </div>

          {/* Login Button */}
          <Button onClick={handleLoginClick} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
            <User className="w-5 h-5" />
            <span>Login</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
