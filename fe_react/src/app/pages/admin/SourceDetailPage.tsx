import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/v1/axiosInstance";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import {
  Save,
  Trash2,
  Play,
  Square,
  RefreshCw,
  ArrowLeft,
  Loader2,
  Video,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface Zone {
  id: string;
  name: string;
  coordinates: any;
}

interface Rule {
  id: string;
  name: string;
  dsl_content: string;
}

interface Source {
  id: string;
  name: string;
  camera_url?: string;
  file_path?: string;
}

const SourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role, token } = useAuthStore();

  const [source, setSource] = useState<Source | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneCoords, setNewZoneCoords] = useState(
    "[[0,0], [100,0], [100,100], [0,100]]"
  );

  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleDSL, setNewRuleDSL] = useState("");

  // Stream URL
  const streamUrl =
    source && token
      ? `${axiosInstance.defaults.baseURL}/api/v1/sources/${source.id}/stream?token=${token}`
      : "";

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    setError(null);
    try {
      console.log("Fetching source data for ID:", id);
      const [srcRes, zonesRes, rulesRes] = await Promise.all([
        axiosInstance.get(`/api/v1/sources/${id}`),
        axiosInstance.get(`/api/v1/sources/${id}/zones`),
        axiosInstance.get(`/api/v1/sources/${id}/rules`),
      ]);
      setSource(srcRes.data);
      setZones(zonesRes.data);
      setRules(rulesRes.data);
    } catch (err: any) {
      console.error("Error loading source data", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Không thể tải dữ liệu camera. Vui lòng kiểm tra kết nối Backend."
      );
    }
  };

  const handleStartProcessing = async () => {
    try {
      await axiosInstance.post(`/api/v1/sources/${id}/processing/start`);
      setIsProcessing(true);
    } catch (e) {
      console.error("Failed to start processing", e);
      alert("Không thể bắt đầu xử lý (có thể tiến trình đang chạy rồi)");
    }
  };

  const handleStopProcessing = async () => {
    try {
      await axiosInstance.post(`/api/v1/sources/${id}/processing/stop`);
      setIsProcessing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleBack = () => {
    if (role?.toLowerCase() === "admin") {
      navigate("/home");
    } else {
      navigate("/home");
    }
  };

  // --- ZONE HANDLERS ---
  const handleAddZone = async () => {
    try {
      let dimInput = newZoneCoords.trim();
      // Support 'np.array([...])' paste
      if (dimInput.startsWith("np.array(")) {
        dimInput = dimInput.replace(/^np\.array\(/, "").replace(/\)$/, "");
      }

      let parsedCoords;
      try {
        parsedCoords = JSON.parse(dimInput);
      } catch (e) {
        alert(
          "Tọa độ không hợp lệ. Phải là dạng JSON array [[x,y],...] hoặc np.array([[x,y],...])"
        );
        return;
      }

      await axiosInstance.post(`/api/v1/zones`, {
        name: newZoneName,
        source_id: id,
        coordinates: parsedCoords,
      });
      setNewZoneName("");
      fetchData(); // Reload
    } catch (error) {
      console.error("Failed to add zone", error);
      alert("Thêm vùng thất bại");
    }
  };

  const handleDeleteZone = async (zoneId: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa vùng này không?")) return;
    try {
      await axiosInstance.delete(`/api/v1/zones/${zoneId}`);
      fetchData();
    } catch (error) {
      console.error("Failed to delete zone", error);
      alert("Xóa vùng thất bại");
    }
  };

  // --- RULE HANDLERS ---
  const handleAddRule = async () => {
    try {
      await axiosInstance.post(`/api/v1/sources/${id}/rules`, {
        name: newRuleName,
        dsl_content: newRuleDSL,
      });
      setNewRuleName("");
      setNewRuleDSL("");
      fetchData();
    } catch (error) {
      console.error("Failed to add rule", error);
      alert("Thêm luật thất bại");
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa luật này không?")) return;
    try {
      await axiosInstance.delete(`/api/v1/sources/${id}/rules/${ruleId}`);
      fetchData();
    } catch (error) {
      console.error("Failed to delete rule", error);
      alert("Xóa luật thất bại");
    }
  };

  if (error)
    return (
      <div className="flex flex-col h-screen">
        <AfterNavigation />
        <div className="flex-1 flex flex-col justify-center items-center text-red-500 gap-4">
          <AlertTriangle size={48} />
          <h2 className="text-xl font-bold">Lỗi Tải Dữ Liệu Camera</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
          <button
            onClick={handleBack}
            className="text-gray-600 hover:underline"
          >
            Quay lại
          </button>
        </div>
        <Footer />
      </div>
    );

  if (!source)
    return (
      <div className="flex flex-col h-screen">
        <AfterNavigation />
        <div className="flex-1 flex justify-center items-center gap-2">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <span className="text-gray-500">Đang tải dữ liệu...</span>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AfterNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Video size={24} className="text-blue-600" />
                {source.name}
              </h1>
              <p className="text-sm text-gray-500">
                {source.camera_url || source.file_path}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isProcessing && (
              <span className="flex items-center text-green-500 text-sm mr-2 font-medium">
                <Loader2 size={16} className="animate-spin mr-1" /> ĐANG XỬ LÝ
              </span>
            )}
            <button
              onClick={handleStartProcessing}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-bold shadow-sm"
            >
              <Play size={16} /> Bắt đầu AI
            </button>
            <button
              onClick={handleStopProcessing}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm shadow-sm"
            >
              <Square size={16} /> Dừng
            </button>
            <button
              onClick={fetchData}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left: Video Panel */}
          <div className="w-1/2 p-4 flex flex-col items-center justify-start bg-black overflow-y-auto">
            <div className="w-full aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative shadow-lg shrink-0 group">
              <img
                src={streamUrl}
                alt="Live Stream"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white/30 text-lg select-none group-hover:hidden">
                  Stream View
                </span>
              </div>
            </div>
            <div className="mt-4 text-gray-400 text-sm p-4 bg-gray-800 rounded w-full border border-gray-700">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-500" />
                Hướng dẫn Demo
              </h4>
              <p className="mb-1">
                1. Nhấn <b>Bắt đầu AI</b> để chạy phân tích.
              </p>
              <p className="mb-1">
                2. Thêm Vùng (Zone) ở bên phải (hỗ trợ dán <code>np.array</code>
                ).
              </p>
              <p className="mb-1">3. Thêm Luật (Rule) sử dụng DSL.</p>
              <p>4. Các lỗi vi phạm sẽ hiện khung ĐỎ trên video.</p>
            </div>
          </div>

          {/* Right: Management Panel */}
          <div className="w-1/2 flex flex-col border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {/* Zones Section */}
            <div className="flex-1 p-4 border-b border-gray-200 dark:border-gray-700 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Cấu hình Vùng (Zones)
              </h3>
              {/* Add Zone Form */}
              <div className="bg-blue-50 dark:bg-gray-900 p-3 rounded-lg border border-blue-100 dark:border-gray-700 mb-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tên vùng (vd: Khu vực cấm đỗ)"
                    className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                    value={newZoneName}
                    onChange={(e) => setNewZoneName(e.target.value)}
                  />
                  <textarea
                    placeholder="Tọa độ: [[x1,y1], ...] hoặc dán np.array([[...]])"
                    className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600 font-mono h-24"
                    value={newZoneCoords}
                    onChange={(e) => setNewZoneCoords(e.target.value)}
                  />
                  <button
                    onClick={handleAddZone}
                    disabled={!newZoneName}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
                  >
                    <Save size={14} /> Lưu Vùng
                  </button>
                </div>
              </div>
              {/* Zones List */}
              <div className="space-y-2">
                {zones.map((z) => (
                  <div
                    key={z.id}
                    className="flex justify-between items-start p-3 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-md hover:border-blue-300 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                        {z.name}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-1 break-all">
                        {JSON.stringify(z.coordinates)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteZone(z.id)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {zones.length === 0 && (
                  <p className="text-gray-400 text-sm text-center italic py-2">
                    Chưa có vùng nào được tạo.
                  </p>
                )}
              </div>
            </div>

            {/* Rules Section */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/30">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Luật Kiểm Tra (Rules)
              </h3>
              {/* Add Rule Form */}
              <div className="bg-purple-50 dark:bg-gray-900 p-3 rounded-lg border border-purple-100 dark:border-gray-700 mb-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tên luật (vd: Kiểm tra đỗ xe sai quy định)"
                    className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                  />
                  <textarea
                    placeholder="Nội dung DSL: rule 'MyRule' when object.class_name == 'Car' AND object.current_zone == 'Khu vực cấm'"
                    className="w-full px-3 py-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600 font-mono h-24"
                    value={newRuleDSL}
                    onChange={(e) => setNewRuleDSL(e.target.value)}
                  />
                  <button
                    onClick={handleAddRule}
                    disabled={!newRuleName}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-1.5 rounded hover:bg-purple-700 text-sm font-medium shadow-sm transition-colors"
                  >
                    <Save size={14} /> Thêm Luật
                  </button>
                </div>
              </div>
              {/* Rules List */}
              <div className="space-y-2">
                {rules.map((r) => (
                  <div
                    key={r.id}
                    className="flex justify-between items-start p-3 bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-md hover:border-purple-300 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-sm text-purple-700 dark:text-purple-400">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 whitespace-pre-wrap line-clamp-3 bg-gray-100 dark:bg-gray-900 p-1 rounded">
                        {r.dsl_content}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteRule(r.id)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {rules.length === 0 && (
                  <p className="text-gray-400 text-sm text-center italic py-2">
                    Chưa có luật nào.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceDetailPage;
