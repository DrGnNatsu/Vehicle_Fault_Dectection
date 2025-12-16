import Footer from "@/components/Footer"
import BeforeNavigation from "@/components/BeforeNavigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Camera, CheckCircle2, BadgeCheck} from "lucide-react"
import { useState } from "react"

export default function Reset2() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registration submitted", { email, password})
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
            <div className="flex flex-col items-center gap-2">
                <BadgeCheck className="w-24 h-24 text-gray-700 dark:text-gray-200" />
                <h2 className="text-blue-700 dark:text-sky-400 text-xl font-bold text-center">Check Your Email</h2>
                <p className="text-gray-700 dark:text-gray-200 text-sm text-center">We sent you a magic link to sign in to your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Button type="submit" className="h-10 rounded-xl bg-blue-700 text-white">
                Login
              </Button>
              <Button type="submit" variant="outline" className="h-10 rounded-xl text-gray-700 dark:text-gray-50">
                Resend Email
              </Button>        
            </form>
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
