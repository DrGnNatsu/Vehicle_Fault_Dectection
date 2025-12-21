"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Plus, Camera, Pencil } from "lucide-react";
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
    name = "Camera Name",
    source_type = "camera",
    role = "user",
    onDelete,
    onEdit,
  } = props;

  const isAdmin = role?.toLowerCase() === "admin";
  const isPoliceOrAdmin = isAdmin || role?.toLowerCase() === "police";

  return (
    <div className="cameraCardContainer">
      <div className="cameraCardHeader">
        <h3 className="cameraCardTitle">{name}</h3>
        <div className="cameraCardBadge">
          {source_type === 'camera' ? 'Live' : 'Video'}
        </div>
      </div>

      <div className="cameraCardContent">
        <div className="cameraCardPreview">
          <Camera className="w-10 h-10 text-muted-foreground/30" />
        </div>
      </div>

      <div className="cameraCardFooter">
        {isPoliceOrAdmin && (
          <Button
            onClick={() => navigate(`/camera/${id}`)}
            className="cameraCardButton"
          >
            Check Camera
          </Button>
        )}

        {isAdmin && (
          <div className="adminActions">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="actionButton"
              title="Edit Camera"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
              className="actionButton hover:text-destructive hover:border-destructive/50"
              title="Delete Camera"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
