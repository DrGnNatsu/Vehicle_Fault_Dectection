import {useState} from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Loader2, Search as SearchIcon} from "lucide-react";
import '@/app/css/Search.css';

type Violation = {
    licensePlate: string;
    violationType: string;
    dateTime: string;
    location: string;
};

export default function SearchPage() {
    const [plate, setPlate] = useState("");
    const [result, setResult] = useState<Violation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!plate.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            /**
             * FUTURE API FETCH:
             * Replace this placeholder fetch with the actual endpoint for searching violations by license plate.
             * Example: const response = await api.get(`/violations/search?plate=${plate}`);
             */
            const res = await fetch(
                `/api/violations?plate=${encodeURIComponent(plate)}`
            );

            if (!res.ok) {
                throw new Error("License plate not found. Please try again with a valid plate number.");
            }

            const data: Violation = await res.json();
            setResult(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searchContainer">
            <AfterNavigation />

            <main className="searchMain">
                <header className="searchHeader">
                    <h1 className="searchTitle">
                        Search For License Plate
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Quickly check for any recorded traffic violations by entering your vehicle's license plate
                        number below.
                    </p>
                </header>

                {/* SearchPage Bar */}
                <div className="searchBarWrapper">
                    <div className="searchInputInner">
                        <SearchIcon className="searchIcon" />
                        <Input
                            className="searchInput"
                            placeholder="Enter license plate (e.g., ABC-1234)..."
                            value={plate}
                            onChange={(e) => setPlate(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <Button
                        className="searchButton"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Searching...
                            </>
                        ) : "Submit"}
                    </Button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="searchError">
                        {error}
                    </div>
                )}

                {/* Result Card */}
                {result && (
                    <Card className="resultCard">
                        <CardHeader className="resultCardHeader">
                            <CardTitle className="resultCardTitle">Violation Information</CardTitle>
                        </CardHeader>
                        <CardContent className="resultCardContent">
                            <div className="resultItem">
                                <span className="resultLabel">License Plate</span>
                                <span className="resultValue">{result.licensePlate}</span>
                            </div>
                            <div className="resultItem">
                                <span className="resultLabel">Violation Type</span>
                                <span className="resultValue">{result.violationType}</span>
                            </div>
                            <div className="resultItem">
                                <span className="resultLabel">Date & Time</span>
                                <span className="resultValue">{result.dateTime}</span>
                            </div>
                            <div className="resultItem">
                                <span className="resultLabel">Location</span>
                                <span className="resultValue">{result.location}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            <Footer />
        </div>
    );
}
