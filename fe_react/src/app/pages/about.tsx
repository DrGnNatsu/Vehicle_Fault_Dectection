import { Rocket } from "lucide-react"; // Import icons you need
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AboutCard from "@/components/about_card";

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* Top Navigation */}
            <AfterNavigation />
            
            <main className="flex-1 flex flex-col">
                {/* --- Hero Section --- */}
                <div className="w-full mx-auto px-4 !py-12 flex flex-col items-center gap-6">
                    <h1 className="text-6xl font-bold text-center text-blue-600 dark:text-sky-400 leading-tight">
                        Hello, Camera!
                    </h1>
                    
                    <p className="text-3xl font-normal text-center text-gray-900 dark:text-gray-50 leading-9 max-w-3xl">
                        A Domain-Specific Language for the camera
                    </p>

                    {/* Buttons Group */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                        <Button 
                            variant="destructive" 
                            className="w-48 h-10 rounded-[32px] text-lg font-medium"
                        >
                            Documentation
                        </Button>

                        <Button 
                            className="w-48 h-10 rounded-[32px] text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Try it Now
                        </Button>
                    </div>
                </div>

                {/* --- Features Section (Gray Background) --- */}
                <div className="w-full bg-zinc-300 dark:bg-zinc-600 py-16">
                    <div className="w-full mx-auto !p-4 flex flex-col items-center gap-10">
                        
                        {/* Section Title */}
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className="text-3xl font-bold text-center leading-9 text-gray-900 dark:text-gray-50">
                                Everything you need..
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
                                Has robust, powerful language and understands your camera.
                            </p>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <AboutCard
                                title="Powerful" 
                                description="Low response time" 
                                icon={Rocket} 
                            />
                            <AboutCard
                                title="Secure" 
                                description="Encrypted by default" 
                                icon={Rocket} 
                            />
                            <AboutCard
                                title="Smart" 
                                description="AI-driven analysis" 
                                icon={Rocket} 
                            />
                            <AboutCard
                                title="Smart" 
                                description="AI-driven analysis" 
                                icon={Rocket} 
                            />
                        </div>

                    </div>
                </div>
            </main> 
            
            <Footer />
        </div>
    );
}