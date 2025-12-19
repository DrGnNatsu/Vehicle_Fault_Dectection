import { Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
}

export default function AboutCard({
  title = "Powerful",
  description = "Low response time",
  icon: Icon = Zap, // Default icon
}: FeatureCardProps) {
  return (
    <Card className="w-64 h-36 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105">
      <CardContent className="p-4 flex flex-col items-center gap-4">
        {/* Icon Section */}
        <div className="flex h-12 w-12 items-center justify-center">
          <Icon className="h-6 w-6 text-black dark:text-white" />
        </div>

        {/* Text Section */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold leading-7 text-foreground">
            {title}
          </h3>
          <p className="text-sm font-normal text-muted-foreground leading-5">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}