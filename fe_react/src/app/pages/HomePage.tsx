import { useEffect, useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { CameraCard } from "@/components/CameraCard.tsx";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { sourceService } from "@/services/sourceService";
import type { Source } from "@/types/source";
import '@/app/css/Home.css';

export default function HomePage() {
  const { role } = useAuthStore();
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSources = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await sourceService.fetchSources();
      setSources(data);
    } catch (err: any) {
      console.error("Failed to fetch sources:", err);
      setError("Unable to load cameras. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  const handleDeleteCamera = (cameraId: string) => {
    // API not ready, just logging for now
    console.log("Delete camera:", cameraId);
    alert("Delete functionality coming soon (API not ready)");
  };

  const handleEditCamera = (cameraId: string) => {
    console.log("Edit camera:", cameraId);
    alert("Edit functionality coming soon (API not ready)");
  };

  const handleAddCamera = () => {
    console.log("Add new camera");
    alert("Add functionality coming soon (API not ready)");
  };

  return (
    <div className="homeContainer">
      <AfterNavigation />

      <main className="homeMain">
        <header className="homeHeader">
          <div className="homeHeaderContent">
            <div className="homeHeaderInfo">
              <h1 className="homeTitle">Manage your camera</h1>
              <p className="homeSubtitle">Explore and monitor your sources</p>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={loadSources} 
                disabled={isLoading}
                title="Refresh list"
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              {role?.toLowerCase() === 'admin' && (
                <Button onClick={handleAddCamera} className="addCameraButton">
                  <Plus className="w-5 h-5" />
                  Add new Camera
                </Button>
              )}
            </div>
          </div>
        </header>

        <section className="cameraGridSection">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse">Fetching your sources...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-destructive">
              <AlertCircle className="w-10 h-10" />
              <p className="font-semibold">{error}</p>
              <Button variant="outline" onClick={loadSources}>Try Again</Button>
            </div>
          ) : (
            <div className="cameraGrid">
              {sources.map((source) => (
                <CameraCard
                  key={source.id}
                  id={source.id}
                  name={source.name}
                  source_type={source.source_type}
                  role={role}
                  onDelete={() => handleDeleteCamera(source.id)}
                  onEdit={() => handleEditCamera(source.id)}
                />
              ))}

              {role?.toLowerCase() === 'admin' && (
                <CameraCard isAddCard onAdd={handleAddCamera} />
              )}
              
              {!isLoading && sources.length === 0 && role?.toLowerCase() !== 'admin' && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl">
                  <p className="text-muted-foreground">No sources assigned to you yet.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
