import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import VersionCard from "@/components/version_card";
export default function Blog() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* Top Navigation */}
            <AfterNavigation />
            <main className="flex-1 flex flex-col">
                {/* Card Section */}
                <div className="w-full mx-auto !p-4">
                    <VersionCard />
                </div>
                <div className="w-full mx-auto !p-4">
                    <VersionCard />
                </div>
            </main>  
            <Footer />
        </div>
    );
}