import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/v1/axiosInstance";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Plus, Video, FileVideo, Trash2 } from "lucide-react";

interface Source {
  id: string;
  name: string;
  source_type: string;
  camera_url?: string;
  file_path?: string;
  is_active: boolean;
  created_at: string;
}

const SourceManagerPage: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const response = await axiosInstance.get("/sources");
      setSources(response.data);
    } catch (error) {
      console.error("Failed to fetch sources", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this source?")) return;
    try {
      await axiosInstance.delete(`/sources/${id}`);
      fetchSources();
    } catch (error) {
      console.error("Failed to delete source", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AfterNavigation />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Source Management
          </h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() =>
              alert(
                "Please use the 'Assign Cameras' page or Implement Create Modal"
              )
            }
          >
            <Plus size={20} />
            Add Source
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading sources...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((source) => (
              <div
                key={source.id}
                onClick={() => navigate(`/sources/${source.id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative group">
                  {source.source_type === "file" ? (
                    <FileVideo size={48} className="text-gray-400" />
                  ) : (
                    <Video size={48} className="text-gray-400" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">
                      Manage Zones & Rules
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {source.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {source.camera_url || source.file_path}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, source.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        source.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {source.is_active ? "Active" : "Inactive"}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
                      {source.source_type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SourceManagerPage;
