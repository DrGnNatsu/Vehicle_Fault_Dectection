import { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCcw, AlertCircle, MapPin, Pencil } from "lucide-react";
import AfterNavigation from "@/components/AfterNavigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zoneService } from "@/services/zoneService";
import { sourceService } from "@/services/sourceService"; 
import type { Zone } from "@/types/zone";
import type { Source } from "@/types/source"; // Imports from d.ts likely
import { cn } from "@/utils/utils";

export default function ZonesPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    source_id: "",
    coordinatesStr: "[[0,0], [100,0], [100,100], [0,100]]", // Default formatted string
  });

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [zonesData, sourcesResponse] = await Promise.all([
        zoneService.getZones(),
        sourceService.fetchSources()
      ]);
      setZones(zonesData);
      setSources(Array.isArray(sourcesResponse) ? sourcesResponse : []); 
    } catch (err: any) {
      console.error("Failed to load data:", err);
      setError("Failed to load zones or sources.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingZoneId(null);
    setFormData({ 
        name: "", 
        source_id: "", 
        coordinatesStr: "[[0,0], [100,0], [100,100], [0,100]]" 
    });
    setIsModalOpen(true);
  };

  const handleEdit = (zone: Zone) => {
    setEditingZoneId(zone.id);
    setFormData({ 
        name: zone.name, 
        source_id: zone.source_id, 
        coordinatesStr: JSON.stringify(zone.coordinates.points) 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Parse coordinates
      let points: [number, number][];
      try {
        points = JSON.parse(formData.coordinatesStr);
        if (!Array.isArray(points) || points.some(p => !Array.isArray(p) || p.length !== 2)) {
            throw new Error("Invalid format");
        }
      } catch (e) {
        alert("Invalid coordinates JSON. Must be an array of [x,y] points.");
        setIsSubmitting(false);
        return;
      }

      if (editingZoneId) {
        // Update
        const updated = await zoneService.updateZone(editingZoneId, {
            name: formData.name,
            coordinates: { points }
        });
        setZones(prev => prev.map(z => z.id === editingZoneId ? updated : z));
      } else {
        // Create
        const created = await zoneService.createZone({
            name: formData.name,
            source_id: formData.source_id,
            coordinates: { points }
        });
        setZones(prev => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Failed to save zone:", err);
      alert("Failed to save zone. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this zone?")) return;
    try {
      await zoneService.deleteZone(id);
      setZones(prev => prev.filter(z => z.id !== id));
    } catch (err) {
      alert("Failed to delete zone.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AfterNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Zones Management</h1>
            <p className="text-muted-foreground mt-1">Define regions of interest for detection sources</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="icon" onClick={loadData} disabled={isLoading}>
              <RefreshCcw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
            
            <Button className="gap-2" onClick={handleOpenCreate}>
              <Plus className="w-4 h-4" />
              Create Zone
            </Button>
          </div>
        </header>

        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading zones...</p>
            </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-destructive border rounded-xl bg-destructive/5">
            <AlertCircle className="w-10 h-10" />
            <p className="font-semibold text-lg">{error}</p>
            <Button variant="outline" onClick={loadData}>Try Again</Button>
            </div>
        ) : (
            <div className="border rounded-xl bg-card overflow-hidden">
            <Table>
                <TableHeader>
                <TableRow className="bg-muted/50">
                    <TableHead className="w-[18rem]">Name</TableHead>
                    <TableHead>Source ID</TableHead>
                    <TableHead>Coordinates</TableHead>
                    <TableHead className="w-[18rem]">Created At</TableHead>
                    <TableHead className="text-center w-[18rem]">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {zones.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                        No zones defined. Create one to start monitoring regions.
                    </TableCell>
                    </TableRow>
                ) : (
                    zones.map((zone) => (
                    <TableRow key={zone.id}>
                        <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            {zone.name}
                        </div>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">
                            {zone.source_id}
                        </TableCell>
                        <TableCell className="text-xs font-mono truncate max-w-[200px]" title={JSON.stringify(zone.coordinates?.points)}>
                            {JSON.stringify(zone.coordinates?.points)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                        {new Date(zone.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="mr-1 text-muted-foreground hover:text-primary"
                            onClick={() => handleEdit(zone)}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(zone.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </div>
        )}

        {/* Create/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{editingZoneId ? "Edit Zone" : "Create New Zone"}</DialogTitle>
                    <DialogDescription>Define the polygon coordinates for this zone.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Zone Name</Label>
                        <Input 
                            id="name" 
                            required 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    
                    {!editingZoneId && (
                        <div className="grid gap-2">
                            <Label htmlFor="source">Source</Label>
                            <select
                              id="source"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={formData.source_id}
                              onChange={e => setFormData({...formData, source_id: e.target.value})}
                              required
                            >
                                <option value="" disabled>Select a source...</option>
                                {sources.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="coords">Coordinates (JSON Points)</Label>
                        <Textarea 
                            id="coords"
                            required
                            className="font-mono text-xs min-h-[100px]"
                            placeholder="[[x1,y1], [x2,y2], ...]"
                            value={formData.coordinatesStr}
                            onChange={e => setFormData({...formData, coordinatesStr: e.target.value})}
                        />
                        <p className="text-[10px] text-muted-foreground">Format: Array of [x, y] points. Order matters.</p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Zone"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
