import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { CameraCard } from "@/components/camera-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const handleCheckCamera = (cameraId: number) => {
    console.log("[v0] Check camera:", cameraId);
  };

  const handleDeleteCamera = (cameraId: number) => {
    console.log("[v0] Delete camera:", cameraId);
  };

  const handleAddCamera = () => {
    console.log("[v0] Add new camera");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <AfterNavigation />
      <main className="flex-1">
        {/* Header Section */}
        <div className="w-full h-24 border-b border-border">
          <div className="max-w-full mx-auto px-4 py-2 flex justify-between items-center h-full">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl text-blue-700 dark:text-sky-400 font-bold">
                Manage your camera
              </h1>
              <p className="text-xl font-medium text-muted-foreground">
                Explore your camera here
              </p>
            </div>
            <Button
              onClick={handleAddCamera}
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 gap-1.5"
            >
              <Plus className="w-5 h-5" />
              Add new Camera
            </Button>
          </div>
        </div>

        {/* Camera Grid */}
        <div className="max-w-full mx-auto p-4 !mt-12">
          <div className="flex gap-4 flex-wrap">
            <CameraCard
              title="Camera Title"
              description="Description"
              onCheckCamera={() => handleCheckCamera(1)}
              onDelete={() => handleDeleteCamera(1)}
            />
            <CameraCard
              title="Camera Title"
              description="Description"
              onCheckCamera={() => handleCheckCamera(2)}
              onDelete={() => handleDeleteCamera(2)}
            />
            <CameraCard
              title="Camera Title"
              description="Description"
              onCheckCamera={() => handleCheckCamera(3)}
              onDelete={() => handleDeleteCamera(3)}
            />
            <CameraCard isAddCard onAdd={handleAddCamera} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
