import { useEffect, useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { CameraCard } from "@/components/CameraCard.tsx";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, AlertCircle, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { sourceService } from "@/services/sourceService";
import type { Source } from "@/types/source";
import '@/app/css/Home.css';

export default function HomePage() {
  const { role } = useAuthStore();
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSource, setEditingSource] = useState<Source | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSource, setNewSource] = useState<{
    name: string;
    source_type: 'camera' | 'video';
    camera_url: string;
    file_path: string;
  }>({
    name: '',
    source_type: 'camera',
    camera_url: '',
    file_path: '',
  });

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

  const handleDeleteCamera = async (cameraId: string) => {
    if (!window.confirm("Are you sure you want to delete this source? This action cannot be undone.")) {
      return;
    }

    try {
      setIsLoading(true);
      await sourceService.deleteSource(cameraId);
      setSources(prev => prev.filter(s => s.id !== cameraId));
    } catch (err: any) {
      console.error("Failed to delete source:", err);
      alert("Failed to delete source. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCamera = (source: Source) => {
    setEditingSource({ ...source });
  };

  const handleUpdateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSource) return;

    setIsUpdating(true);
    try {
      const payload = {
        name: editingSource.name,
        source_type: editingSource.source_type,
        camera_url: editingSource.camera_url || undefined,
        file_path: editingSource.file_path || undefined,
        is_active: editingSource.is_active,
      };

      const updated = await sourceService.updateSource(editingSource.id, payload);
      setSources(prev => prev.map(s => s.id === updated.id ? updated : s));
      setEditingSource(null);
    } catch (err: any) {
      console.error("Failed to update source:", err);
      alert("Failed to update source. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const payload = {
        name: newSource.name,
        source_type: newSource.source_type,
        camera_url: newSource.source_type === 'camera' ? newSource.camera_url : undefined,
        file_path: newSource.source_type === 'video' ? newSource.file_path : undefined,
      };

      const created = await sourceService.createSource(payload);
      setSources(prev => [...prev, created]);
      setIsAddModalOpen(false);
      setNewSource({ name: '', source_type: 'camera', camera_url: '', file_path: '' });
    } catch (err: any) {
      console.error("Failed to create source:", err);
      alert("Failed to create source. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddCamera = () => {
    setIsAddModalOpen(true);
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
                  camera_url={source.camera_url}
                  file_path={source.file_path}
                  role={role}
                  onDelete={() => handleDeleteCamera(source.id)}
                  onEdit={() => handleEditCamera(source)}
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

      {/* Add Source Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden scale-in-center">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <h2 className="text-xl font-bold">Add New Source</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateSource} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source Name</label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newSource.name}
                  onChange={e => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="e.g. Front Gate Camera"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newSource.source_type}
                  onChange={e => setNewSource({ ...newSource, source_type: e.target.value as 'camera' | 'video' })}
                >
                  <option value="camera">Camera (Live Stream)</option>
                  <option value="video">Video (File)</option>
                </select>
              </div>

              {newSource.source_type === 'camera' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Camera URL</label>
                  <input
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newSource.camera_url}
                    onChange={e => setNewSource({ ...newSource, camera_url: e.target.value })}
                    placeholder="rtsp://... or http://..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Path</label>
                  <input
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newSource.file_path}
                    onChange={e => setNewSource({ ...newSource, file_path: e.target.value })}
                    placeholder="/path/to/video.mp4"
                  />
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Create Source
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal Overlay */}
      {editingSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden scale-in-center">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <h2 className="text-xl font-bold">Edit Source</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setEditingSource(null)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleUpdateSource} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source Name</label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editingSource.name}
                  onChange={e => setEditingSource({ ...editingSource, name: e.target.value })}
                  placeholder="e.g. Front Gate Camera"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editingSource.source_type}
                  onChange={e => setEditingSource({ ...editingSource, source_type: e.target.value as 'camera' | 'video' })}
                >
                  <option value="camera">Camera (Live Stream)</option>
                  <option value="video">Video (File)</option>
                </select>
              </div>

              {editingSource.source_type === 'camera' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Camera URL</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={editingSource.camera_url || ''}
                    onChange={e => setEditingSource({ ...editingSource, camera_url: e.target.value })}
                    placeholder="rtsp://... or http://..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium">File Path</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={editingSource.file_path || ''}
                    onChange={e => setEditingSource({ ...editingSource, file_path: e.target.value })}
                    placeholder="/path/to/video.mp4"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium">Active Status</span>
                  <p className="text-xs text-muted-foreground">Is this source currently active?</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary"
                  checked={editingSource.is_active}
                  onChange={e => setEditingSource({ ...editingSource, is_active: e.target.checked })}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditingSource(null)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
