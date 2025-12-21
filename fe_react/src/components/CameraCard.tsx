"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Plus, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CameraCardProps } from "@/types/camera";
import './css/CameraCard.css';
import { cn } from "@/utils/utils";

export function CameraCard(props: CameraCardProps) {
  const navigate = useNavigate();

  // ✅ Add Card variant
  if (props.isAddCard) {
    return (
      <div 
        className={cn("cameraCardContainer", "addCardContainer")}
        onClick={props.onAdd}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="w-12 h-12 rounded-full pointer-events-none"
          aria-label="Add new camera"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  // ✅ Standard Camera Card
  const {
    id,
    title = "Camera Title",
    description = "Description",
    role = "user",
    onDelete,
  } = props;

  return (
    <div className="cameraCardContainer">
      <div className="cameraCardHeader">
        <h3 className="cameraCardTitle">
          {title}
        </h3>
        <p className="cameraCardDescription">{description}</p>
      </div>

      <div className="cameraCardContent">
        <div className="cameraCardPreview">
            <Camera className="w-12 h-12 text-muted-foreground/40" />
        </div>
      </div>

      <div className="cameraCardFooter">
        <Button
          onClick={() => navigate(`/camera/${id}`)}
          className="cameraCardButton"
        >
          Check Camera
        </Button>

        {role === "admin" && (
          <Button 
            variant="destructive" 
            onClick={onDelete} 
            className="deleteButton"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
