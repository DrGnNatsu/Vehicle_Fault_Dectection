"use client";

import { useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Violation = {
  licensePlate: string;
  violationType: string;
  dateTime: string;
  location: string;
};

export default function Search() {
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
      const res = await fetch(
        `/api/violations?plate=${encodeURIComponent(plate)}`
      );

      if (!res.ok) {
        throw new Error("License plate not found");
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
    <div className="h-screen overflow-hidden flex flex-col items-center bg-white dark:bg-gray-900">
      <AfterNavigation />

      <div className="h-3/4 w-3/4 flex flex-col gap-4">
        <h1 className="font-bold text-6xl m-12 text-center text-blue-600 dark:text-sky-400">
          Search For License Plate
        </h1>

        {/* Search Bar */}
        <div className="w-full flex gap-2">
          <Input
            placeholder="Search..."
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Submit"}
          </Button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Result Card (only appears if found) */}
        {result && (
          <Card className="border-border mt-4">
            <CardHeader>
              <CardTitle>Violation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>
                <strong>License Plate:</strong> {result.licensePlate}
              </p>
              <p>
                <strong>Violation Type:</strong> {result.violationType}
              </p>
              <p>
                <strong>Date & Time:</strong> {result.dateTime}
              </p>
              <p>
                <strong>Location:</strong> {result.location}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
