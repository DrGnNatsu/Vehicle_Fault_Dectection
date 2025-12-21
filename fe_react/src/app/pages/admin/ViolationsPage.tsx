import { useEffect, useState } from "react";
import { RefreshCcw, AlertCircle, ExternalLink, Image as ImageIcon, Search, Filter } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { violationService } from "@/services/violationService";
import type { Violation, ViolationFilterParams } from "@/types/violation";
import { cn } from "@/utils/utils";

export default function ViolationsPage() {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [filters, setFilters] = useState<ViolationFilterParams>({
    license_plate: "",
    source_id: "",
    rule_id: "",
    date_from: "",
    date_to: "",
  });

  const loadViolations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Remove empty filters
      const activeFilters: ViolationFilterParams = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      
      const response = await violationService.fetchViolations(activeFilters);
      if (Array.isArray(response)) {
        setViolations(response);
      } else {
        setViolations(response?.violations || []);
      }
    } catch (err: any) {
      console.error("Failed to fetch violations:", err);
      setError("Failed to load violations log.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadViolations();
  }, []); // Initial load

  const handleFilterChange = (key: keyof ViolationFilterParams, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AfterNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <header className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Violations History</h1>
              <p className="text-muted-foreground mt-1">Review detected violations and evidence</p>
            </div>
            <Button variant="outline" size="icon" onClick={loadViolations} disabled={isLoading}>
              <RefreshCcw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
          </div>

          <div className="bg-card border rounded-lg p-4 grid gap-4 md:grid-cols-5">
            <div className="md:col-span-1">
              <label className="text-xs font-medium mb-1.5 block">License Plate</label>
              <Input 
                placeholder="Search plate..." 
                value={filters.license_plate}
                onChange={(e) => handleFilterChange("license_plate", e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs font-medium mb-1.5 block">Source ID</label>
              <Input 
                placeholder="Camera/Source ID" 
                value={filters.source_id}
                onChange={(e) => handleFilterChange("source_id", e.target.value)}
              />
            </div>
             <div className="md:col-span-1">
              <label className="text-xs font-medium mb-1.5 block">Rule ID</label>
              <Input 
                placeholder="Rule ID" 
                value={filters.rule_id}
                onChange={(e) => handleFilterChange("rule_id", e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <label className="text-xs font-medium mb-1.5 block">From Date</label>
              <Input 
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange("date_from", e.target.value)}
              />
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button className="w-full gap-2" onClick={loadViolations}>
                <Filter className="w-4 h-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Fetching violations history...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-destructive border rounded-xl bg-destructive/5">
            <AlertCircle className="w-10 h-10" />
            <p className="font-semibold text-lg">{error}</p>
            <Button variant="outline" onClick={loadViolations}>Try Again</Button>
          </div>
        ) : (
          <div className="border rounded-xl bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Rule Triggered</TableHead>
                  <TableHead>Source ID</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {violations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                      No violations found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  violations.map((violation) => (
                    <TableRow key={violation.id}>
                      <TableCell className="text-xs font-medium">
                        {new Date(violation.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {violation.detected_license_plate ? (
                          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary font-mono px-2 py-0.5">
                            {violation.detected_license_plate.toUpperCase()}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground italic text-xs">Unknown</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{violation.rule_id}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">{violation.source_id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {violation.evidence_url ? (
                            <a 
                              href={violation.evidence_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative h-10 w-16 overflow-hidden rounded border bg-muted flex items-center justify-center"
                            >
                              <ImageIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ExternalLink className="w-3 h-3 text-white" />
                              </div>
                            </a>
                          ) : (
                            <span className="text-muted-foreground italic text-xs">No evidence</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5" onClick={() => console.log("View metadata:", violation.metadata)}>
                          <Search className="w-3.5 h-3.5" />
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
