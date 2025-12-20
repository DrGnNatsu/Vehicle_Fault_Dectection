import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import './css/VersionCard.css';

interface VersionCardProps {
  version: string;
  date: string;
  sections: {
    title: string;
    items: string[];
  }[];
  tags: {
    label: string;
    type: 'features' | 'tags' | 'bugfixes' | 'security';
  }[];
}

export default function VersionCard({
  version = "1.0",
  date = "xx / xx / xxxx",
  sections = [],
  tags = [],
}: VersionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="versionCard">
      <CardHeader 
        className="versionCardHeader cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="versionCardTitle">Version {version}</CardTitle>
        <div className="versionCardHeaderActions">
          <span className="versionCardDate">
            Updated: {date}
          </span>
          <button className="versionCardMoreBtn">
            <ChevronDown 
              className={cn(
                "h-6 w-6 transition-transform duration-300",
                isExpanded && "rotate-180"
              )} 
            />
          </button>
        </div>
      </CardHeader>

      <div className={cn(
        "versionCardDetails",
        isExpanded ? "versionCardExpanded" : "versionCardCollapsed"
      )}>
        <CardContent className="versionCardContent">
          {sections.map((section, idx) => (
            <div key={idx} className="versionCardSection">
              <h3 className="versionCardSectionTitle">{section.title}</h3>
              <ul className="versionCardList">
                {section.items.map((item, i) => (
                  <li key={i} className="versionCardListItem">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>

        <CardFooter className="versionCardFooter">
          {tags.map((tag, idx) => (
            <Badge 
              key={idx}
              variant="secondary" 
              className={cn("versionCardBadge", `badge-${tag.type}`)}
            >
              #{tag.label}
            </Badge>
          ))}
        </CardFooter>
      </div>
    </Card>
  );
}