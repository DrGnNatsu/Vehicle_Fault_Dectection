import Footer from "@/components/Footer"
import BeforeNavigation from "@/components/BeforeNavigation"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <BeforeNavigation />
      <main className="flex-1 max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to CameraLanguage</h2>
        <p className="text-muted-foreground">
          Your navigat
          ion bar is now fully functional with dark mode toggle and login button.
        </p>
      </main>
      <Footer />
    </div>
  )
}
