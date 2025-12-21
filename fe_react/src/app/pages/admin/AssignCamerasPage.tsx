import { useEffect, useState } from "react";
import { Save, AlertCircle, RefreshCcw, Shield, CheckSquare } from "lucide-react";
import AfterNavigation from "@/components/AfterNavigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { assignmentService } from "@/services/assignmentService";
import { userService } from "@/services/userService";
import { sourceService } from "@/services/sourceService";
import type { User } from "@/types/user";
import type { Source } from "@/types/source"; // Source list
import { cn } from "@/utils/utils";

export default function AssignCamerasPage() {
  const [policeUsers, setPoliceUsers] = useState<User[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  
  const [selectedPoliceId, setSelectedPoliceId] = useState<string>("");
  const [assignedSourceIds, setAssignedSourceIds] = useState<Set<string>>(new Set());
  
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Metadata (Users & Sources)
  useEffect(() => {
    const loadMetadata = async () => {
      setLoadingInitial(true);
      try {
        const [usersData, sourcesData] = await Promise.all([
          userService.listUsers(),
          sourceService.fetchSources()
        ]);
        
        // Filter for Police only
        const police = usersData.filter(u => u.role === 'police');
        setPoliceUsers(police);
        setSources(sourcesData);
      } catch (err) {
        console.error("Failed to load metadata", err);
        setError("Failed to load users or sources.");
      } finally {
        setLoadingInitial(false);
      }
    };
    loadMetadata();
  }, []);

  // Load Assignments when Police Selected
  useEffect(() => {
    if (!selectedPoliceId) {
      setAssignedSourceIds(new Set());
      return;
    }

    const fetchAssignments = async () => {
      setLoadingAssignments(true);
      try {
        const currentAssignments = await assignmentService.getPoliceAssignments(selectedPoliceId);
        // Map AssignmentSource[] to IDs
        const ids = new Set(currentAssignments.map(a => a.id));
        setAssignedSourceIds(ids);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
        // Don't block UI, just start empty or show warning? 
        // Better to show empty for now, effectively "overwrite"
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAssignments();
  }, [selectedPoliceId]);

  const toggleSource = (sourceId: string) => {
    const newSet = new Set(assignedSourceIds);
    if (newSet.has(sourceId)) {
      newSet.delete(sourceId);
    } else {
      newSet.add(sourceId);
    }
    setAssignedSourceIds(newSet);
  };

  const handleSave = async () => {
    if (!selectedPoliceId) return;
    setSaving(true);
    try {
      await assignmentService.assignSources({
        police_id: selectedPoliceId,
        source_ids: Array.from(assignedSourceIds)
      });
      alert("Assignments updated successfully!");
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save assignments.");
    } finally {
      setSaving(false);
    }
  };

  const handleSelectAll = (select: boolean) => {
    if (select) {
      const allIds = new Set(sources.map(s => s.id));
      setAssignedSourceIds(allIds);
    } else {
      setAssignedSourceIds(new Set());
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AfterNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Camera Assignments</h1>
          <p className="text-muted-foreground mt-1">Assign surveillance sources to police officers.</p>
        </header>

        {loadingInitial ? (
            <div className="flex justify-center py-20"><RefreshCcw className="animate-spin" /></div>
        ) : error ? (
            <div className="text-destructive flex items-center gap-2 border p-4 rounded bg-destructive/5">
                <AlertCircle className="w-5 h-5" /> {error}
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar: Police Select */}
            <div className="md:col-span-4 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Officer</CardTitle>
                  <CardDescription>Choose a police officer to manage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {policeUsers.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground border border-dashed rounded text-center">
                        No police officers found.
                    </div>
                  ) : (
                    policeUsers.map(user => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedPoliceId(user.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-3 border",
                          selectedPoliceId === user.id 
                            ? "bg-primary text-primary-foreground border-primary" 
                            : "bg-card hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Shield className="w-4 h-4 shrink-0" />
                        <div className="truncate">
                           <div>{user.full_name}</div>
                           <div className="text-xs opacity-80 font-normal">{user.email}</div>
                        </div>
                      </button>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content: Sources Grid */}
            <div className="md:col-span-8 lg:col-span-9">
              {selectedPoliceId ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">Assigned Sources</span>
                        <span className="text-xs text-muted-foreground">
                            {assignedSourceIds.size} of {sources.length} sources selected
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => handleSelectAll(true)}>Select All</Button>
                        <Button variant="outline" size="sm" onClick={() => handleSelectAll(false)}>Clear</Button>
                        <Button onClick={handleSave} disabled={saving || loadingAssignments} className="min-w-[120px]">
                            {saving ? (
                                <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                  </div>

                  {loadingAssignments ? (
                      <div className="py-20 flex justify-center text-muted-foreground">
                          <RefreshCcw className="w-6 h-6 animate-spin mr-2" /> Loading assignments...
                      </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sources.map(source => {
                            const isSelected = assignedSourceIds.has(source.id);
                            return (
                                <div 
                                    key={source.id}
                                    onClick={() => toggleSource(source.id)}
                                    className={cn(
                                        "cursor-pointer group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
                                        isSelected 
                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                                            : "bg-card hover:border-primary/50"
                                    )}
                                >
                                    <div className={cn(
                                        "mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-transparent"
                                    )}>
                                        {isSelected && <CheckSquare className="w-3.5 h-3.5" />}
                                    </div>
                                    
                                    <div className="flex-1 space-y-1">
                                        <div className="font-medium leading-none flex items-center justify-between">
                                            {source.name}
                                            {source.is_active ? (
                                                <span className="w-2 h-2 rounded-full bg-green-500" title="Active"></span>
                                            ) : (
                                                <span className="w-2 h-2 rounded-full bg-red-500" title="Inactive"></span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground font-mono truncate" title={source.camera_url || source.file_path || ""}>
                                            {source.source_type === 'camera' ? source.camera_url : 'Video File'}
                                        </p>
                                        <Badge variant="secondary" className="text-[10px] h-5">{source.source_type}</Badge>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl text-muted-foreground bg-muted/30">
                  <Shield className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No Officer Selected</h3>
                  <p className="text-sm">Select a police officer from the list to assign cameras.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
