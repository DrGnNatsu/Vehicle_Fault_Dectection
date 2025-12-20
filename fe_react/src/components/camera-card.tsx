"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CameraCardProps } from "@/types/camera";

export function CameraCard(props: CameraCardProps) {
  const navigate = useNavigate();

  // ✅ Narrow FIRST
  if (props.isAddCard) {
    return (
      <div className="w-80 h-96 bg-card rounded-lg border flex items-center justify-center">
        <Button size="icon" onClick={props.onAdd}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  // ✅ Safe to destructure AFTER narrowing
  const {
    id,
    title = "Camera Title",
    description = "Description",
    role = "user",
    onDelete,
  } = props;

  return (
    <div className="w-80 h-96 bg-card rounded-lg border relative">
      <div className="px-4 py-2">
        <h3 className="text-lg font-bold text-blue-600 dark:text-sky-400">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex justify-center py-2">
        <div className="w-72 h-52 bg-black rounded" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t flex gap-4 justify-center">
        <Button
          onClick={() => navigate(`/camera/${id}`)} // ✅ correct
          className="w-32"
        >
          Check Camera
        </Button>

        {role === "admin" && (
          <Button variant="destructive" onClick={onDelete} className="w-32">
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
