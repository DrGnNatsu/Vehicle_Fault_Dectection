import { useEffect, useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
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
import { Loader2, AlertCircle, ExternalLink, Image as ImageIcon, Search } from "lucide-react";
import { violationService } from "@/services/violationService";
import type { Violation } from "@/types/violation"; 
import '@/app/css/Search.css'; 

export default function SearchPage() {
    const [violations, setViolations] = useState<Violation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMyViolations = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await violationService.fetchMyViolations();
                // Handle potential different response structures similar to Admin page
                if (Array.isArray(response)) {
                    setViolations(response);
                } else {
                    setViolations(response?.violations || []);
                }
            } catch (err: any) {
                console.error("Failed to fetch my violations:", err);
                setError("Unable to load your violation history.");
            } finally {
                setLoading(false);
            }
        };

        loadMyViolations();
    }, []);

    return (
        <div className="searchContainer min-h-screen flex flex-col">
            <AfterNavigation />

            <main className="flex-1 container mx-auto py-8 px-4">
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">My Violations</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        View and manage traffic violations recorded against your account.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading your history...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-destructive border rounded-xl bg-destructive/5">
                        <AlertCircle className="w-10 h-10" />
                        <p className="font-semibold text-lg">{error}</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                ) : (
                    <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[180px]">Timestamp</TableHead>
                                    <TableHead>License Plate</TableHead>
                                    <TableHead>Violation Type</TableHead>
                                    <TableHead>Evidence</TableHead>
                                    <TableHead className="text-right">Metadata</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {violations.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                                            No violations found on record. Drive safely!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    violations.map((violation) => (
                                        <TableRow key={violation.id}>
                                            <TableCell className="text-xs font-medium">
                                                {new Date(violation.timestamp).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary font-mono px-2 py-0.5">
                                                    {violation.detected_license_plate || "Unknown"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-medium">{violation.rule_id}</span>
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
                                                <Button variant="ghost" size="sm" className="h-8 gap-1.5" onClick={() => console.log("Metadata:", violation.metadata)}>
                                                    <Search className="w-3.5 h-3.5" />
                                                    Details
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

            <Footer />
        </div>
    );
}
