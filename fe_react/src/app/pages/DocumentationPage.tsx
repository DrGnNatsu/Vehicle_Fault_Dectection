import AfterNavigation from "@/components/AfterNavigation";
import BeforeNavigation from "@/components/BeforeNavigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";

export default function DocumentationPage() {
    const { isAuthenticated } = useAuthStore();
    
    return (
         <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            {isAuthenticated ? <AfterNavigation /> : <BeforeNavigation />}
            <main className="flex-1 w-full mx-auto !p-4 flex flex-col md:flex-row items-start gap-8">
                {/* Left : Structure */}
                <aside className="w-full md:w-40 flex-shrink-0 border-b md:border-b-0 md:border-r border-border flex flex-col gap-6 !py-4">
                    {/* Nav Item 1 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-foreground">Getting Started</h3>
                        <div className="pl-4 flex flex-col gap-2 border-l border-border/50 ml-1">
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Introduction</a>
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Installation</a>
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Quick Start</a>
                        </div>
                    </div>

                    {/* Nav Item 2 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-foreground">Core Concepts</h3>
                        <div className="pl-4 flex flex-col gap-2 border-l border-border/50 ml-1">
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Configuration</a>
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">The Camera Object</a>
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Events</a>
                        </div>
                    </div>

                    {/* Nav Item 3 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold text-foreground">API Reference</h3>
                        <div className="pl-4 flex flex-col gap-2 border-l border-border/50 ml-1">
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Methods</a>
                            <a href="#" className="text-sm font-normal text-muted-foreground hover:text-blue-600 transition-colors">Properties</a>
                        </div>
                    </div>
                </aside>
                {/* Right : Content */}
                <section className="flex-1 w-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                    {/* Card Header */}
                    <div className="h-14 !px-6 flex items-center border-b border-border bg-muted/20">
                        <h1 className="text-2xl font-bold text-blue-600 dark:text-sky-400">Documentation</h1>
                    </div>

                    {/* Section 1 */}
                    <div className="!p-6 border-b border-border flex flex-col gap-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-foreground">Initialization</h2>
                            <p className="text-base text-muted-foreground leading-7">
                                To get started with the camera library, you first need to initialize the main object. This sets up the necessary event listeners.
                            </p>
                        </div>
                        
                        {/* Code Block */}
                        <div className="w-full !px-8 !py-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-border/50 font-mono text-sm">
                            <div className="text-foreground">import Camera from '@camera-lib/core';</div>
                            <div className="text-blue-600 dark:text-blue-400 mt-1">const cam = new Camera();</div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="!p-6 border-b border-border flex flex-col gap-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-foreground">Capture Image</h2>
                            <p className="text-base text-muted-foreground leading-7">
                                Once initialized, you can trigger a capture event using the built-in method. This returns a Promise that resolves to the image blob.
                            </p>
                        </div>
                        
                        {/* Code Block */}
                        <div className="w-full !px-8 !py-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-border/50 font-mono text-sm">
                            <div className="text-purple-600 dark:text-purple-400">await cam.capture()</div>
                            <div className="text-foreground pl-4">.then(image ={'>'} console.log(image));</div>
                        </div>
                    </div>

                </section>
            </main>
            <Footer />
        </div>
    );
}