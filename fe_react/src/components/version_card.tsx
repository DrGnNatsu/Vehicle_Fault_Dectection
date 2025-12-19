import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VersionCard() {
  return (
    <Card className="w-full overflow-hidden border-border bg-gray-200 dark:bg-gray-700 text-card-foreground shadow-sm transition-transform duration-300 hover:scale-105">
      {/* Header Section 
        Note: We use 'flex-row' and 'space-y-0' to override the default 
        vertical stack and spacing defined in your CardHeader component.
      */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border !p-4">
        <CardTitle className="text-2xl font-bold text-blue-600 dark:text-sky-400">Version 1.1</CardTitle>
        <div className="flex items-center gap-4">
          <span className="text-lg text-gray-900 dark:text-gray-50">
            Updated: xx / xx / xxxx
          </span>
          <button className="hover:text-muted-foreground transition-colors text-gray-900 dark:text-gray-50">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>
      </CardHeader>

      {/* Content Body */}
      <CardContent className="grid gap-8 !p-6 md:grid-cols-2 text-gray-900 dark:text-gray-50">
        {/* Column 1 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold !px-6">Header Title</h3>
          <div className="flex flex-col gap-4 pl-4 !px-12">
            <li className="text-lg text-muted-foreground">
              Description long long long long long long long
            </li>
            <li className="text-lg text-muted-foreground">Description</li>
            <li className="text-lg text-muted-foreground">Description</li>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold !px-6">Header Title</h3>
          <div className="flex flex-col items-center gap-4 !px-12 text-center md:items-start md:text-left">
            <li className="text-lg text-muted-foreground">Description</li>
            <li className="text-lg text-muted-foreground">Description</li>
            <li className="text-lg text-muted-foreground">Description</li>
          </div>
        </div>
      </CardContent>

      {/* Footer / Tags Section */}
      <CardFooter className="flex flex-wrap gap-2.5 !p-4 border-t border-border">
        {/* Success Tag (Green) */}
        <Badge 
          variant="secondary" 
          className="rounded-2xl !px-2 !py-1 text-base font-medium bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
        >
          #features
        </Badge>

        {/* Warning Tag (Yellow) */}
        <Badge 
          variant="secondary" 
          className="rounded-2xl !px-2 !py-1 text-base font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
        >
          #tags
        </Badge>

        {/* Danger Tag (Red) */}
        <Badge 
          variant="secondary" 
          className="rounded-2xl !px-2 !py-1 text-base font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
        >
          #features
        </Badge>
      </CardFooter>
    </Card>
  );
}