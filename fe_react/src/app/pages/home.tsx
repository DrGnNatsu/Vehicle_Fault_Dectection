import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { CameraCard } from "@/components/camera-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const role: "admin" | "user" = "admin"; // later from auth/session

  const handleDeleteCamera = (cameraId: string) => {
    console.log("Delete camera:", cameraId);
  };

  const handleAddCamera = () => {
    console.log("Add new camera");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <AfterNavigation />

      <main className="flex-1">
        {/* Header */}
        <div className="w-full h-24 border-b border-border">
          <div className="px-4 py-2 flex justify-between items-center h-full">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 dark:text-sky-400">
                Manage your camera
              </h1>
              <p className="text-muted-foreground">Explore your camera here</p>
            </div>

            <Button
              onClick={handleAddCamera}
              className="bg-blue-600 hover:bg-blue-700 gap-1.5"
            >
              <Plus className="w-5 h-5" />
              Add new Camera
            </Button>
          </div>
        </div>

        {/* Camera Grid */}
        <div className="p-4 mt-12 flex gap-4 flex-wrap">
          <CameraCard
            id="1"
            title="Gate Camera"
            description="Front entrance"
            role={role}
            onDelete={() => handleDeleteCamera("1")}
          />

          <CameraCard
            id="2"
            title="Parking Camera"
            description="Basement parking"
            role={role}
            onDelete={() => handleDeleteCamera("2")}
          />

          <CameraCard
            id="3"
            title="Lobby Camera"
            description="Main lobby"
            role={role}
            onDelete={() => handleDeleteCamera("3")}
          />

          <CameraCard isAddCard onAdd={handleAddCamera} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
