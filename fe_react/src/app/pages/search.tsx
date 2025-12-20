import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <AfterNavigation />

      <div className="h-3/4     w-3/4 flex flex-col gap-4">
        <center>Search For License Plate</center>
        <div className="w-full  flex gap-2">
          <Input placeholder="Search..." />
          <Button>Submit</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Card className="border-border flex-rows">
            <CardHeader>
              <CardTitle>Violation Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>License Plate:</strong> ABC1234
              </p>
              <p>
                <strong>Violation Type:</strong> Speeding
              </p>
              <p>
                <strong>Date & Time:</strong> 2024-01-15 14:30
              </p>
              <p>
                <strong>Location:</strong> 5th Avenue & Main St.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border flex-rows">
            <CardHeader>
              <CardTitle>Violation Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>License Plate:</strong> ABC1234
              </p>
              <p>
                <strong>Violation Type:</strong> Speeding
              </p>
              <p>
                <strong>Date & Time:</strong> 2024-01-15 14:30
              </p>
              <p>
                <strong>Location:</strong> 5th Avenue & Main St.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
