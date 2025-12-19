import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Camera() {
    const handleEditCamera = () => {
        console.log("[v0] Edit camera");
    }
    const handleDeleteCamera = () => {
        console.log("[v0] Delete camera");
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* Top Navigation */}
            <AfterNavigation />
            <main className="flex-1 flex flex-col">
                {/* Page Header Section */}
                <div className="w-full border-b border-border bg-white dark:bg-gray-900">
                    <div className="max-w-full mx-auto !px-4 !py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Title & Description */}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold leading-9 text-blue-600 dark:text-sky-400">
                                Camera Title
                            </h1>
                            <p className="text-xl font-medium text-muted-foreground leading-7">
                                Description
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                            <Button 
                                onClick={handleEditCamera} 
                                className="w-24 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg"
                            >
                                Edit
                            </Button>
                            <Button 
                                onClick={handleDeleteCamera} 
                                variant="destructive"
                                className="w-24 h-10 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full mx-auto !p-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        <div className="flex-1 min-h-[600px] p-2.5 bg-gray-500 rounded-lg border border-border relative">
                            <textarea 
                                className="w-full h-full  resize-none focus:outline-none text-base text-foreground placeholder:text-muted-foreground font-normal leading-6"
                                placeholder="Please write your query here"
                            />
                        </div>
                        <div className="w-full lg:w-[500px] rounded-lg min-h-[600px] bg-gray-500 border border-border relative">
                            {/* Placeholder for the empty container in design */}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}