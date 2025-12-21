import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { CameraCard } from "@/components/CameraCard.tsx";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import '@/app/css/Home.css';

export default function Home() {
  const role: "admin" | "user" = "admin"; // later from auth/session

  const handleDeleteCamera = (cameraId: string) => {
    console.log("Delete camera:", cameraId);
  };

  const handleAddCamera = () => {
    console.log("Add new camera");
  };

  return (
    <div className="homeContainer">
      <AfterNavigation />

      <main className="homeMain">
        {/* Header */}
        <header className="homeHeader">
          <div className="homeHeaderContent">
            <div className="homeHeaderInfo">
              <h1 className="homeTitle">
                Manage your camera
              </h1>
              <p className="homeSubtitle">Explore your camera here</p>
            </div>

            <Button
              onClick={handleAddCamera}
              className="addCameraButton"
            >
              <Plus className="w-5 h-5" />
              Add new Camera
            </Button>
          </div>
        </header>

        {/* Camera Grid */}
        <section className="cameraGridSection">
          <div className="cameraGrid">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
