import Footer from "@/components/Footer"
import BeforeNavigation from "@/components/BeforeNavigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Camera, CheckCircle2, ArrowLeft} from "lucide-react"
import { useState } from "react"

export default function Reset3() {
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registration submitted", { confirmPassword, password})
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background split */}
      <div className="fixed inset-0 flex">
        <div className="w-1/2 bg-zinc-100 dark:bg-zinc-800" />
        <div className="w-1/2 bg-white dark:bg-black" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left panel */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="max-w-md flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                CameraLanguage
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-3">
              <h1 className="text-gray-900 dark:text-gray-50 text-4xl font-extralight">
                You're one step away being fined.
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                A beautifully designed interface to pay for your mistake
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {[
                "Track and pay bills effortlessly",
                "Simplify your process",
                "Hassle-free payment",
                "Insights into your mistake",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-800 dark:text-gray-200">{text}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-zinc-300 dark:bg-zinc-600" />

            <p className="text-gray-700 dark:text-gray-300 italic">
              "No hidden fees or charges — the price you see is the price you pay (We promise!)"
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div>
              <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold">Set a New Password</h2>
              <p className="text-gray-700 dark:text-gray-200 text-sm">Enter your new password and confirm it to set a new password.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=" ••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
                  required
                />
                <p className="text-gray-500 text-sm">Must be at least 6 characters.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-200">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder=" ••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 bg-white text-gray-900 border border-gray-300 rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700"
                  required
                /> 
              </div>

              <Button type="submit" className="h-10 rounded-xl bg-blue-700 text-white">
                Login
              </Button>
            </form>

            <p className="text-gray-400 text-sm hover:underline">
                <Link to="/login">
                    <ArrowLeft className="inline w-4 h-4 mr-1"/> Back to Login
                </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Fixed header & footer */}
      <div className="fixed top-0 inset-x-0 z-20">
        <BeforeNavigation />
      </div>
      <div className="fixed bottom-0 inset-x-0 z-20">
        <Footer />
      </div>
    </div>
  )
}
