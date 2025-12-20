import { Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import './css/AboutCard.css';

interface FeatureCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
}

export default function AboutCard({
  title = "Powerful",
  description = "Low response time",
  icon: Icon = Zap,
}: FeatureCardProps) {
  return (
    <Card className="aboutCard">
      <CardContent className="aboutCardContent">
        <div className="aboutCardIconContainer">
          <Icon className="aboutCardIcon" />
        </div>

        <div className="space-y-1">
          <h3 className="aboutCardTitle">
            {title}
          </h3>
          <p className="aboutCardDescription">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}