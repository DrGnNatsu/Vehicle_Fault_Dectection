"use client"
import { Button } from "@/components/ui/button"
import { MoreVertical, Trash2, Plus, Settings} from "lucide-react"

interface CameraCardProps {
  title?: string
  description?: string
  isAddCard?: boolean
  onCheckCamera?: () => void
  onDelete?: () => void
  onAdd?: () => void
}

export function CameraCard({
  title = "Camera Title",
  description = "Description",
  isAddCard = false,
  onCheckCamera,
  onDelete,
  onAdd,
}: CameraCardProps) {
  if (isAddCard) {
    return (
      <div className="w-80 h-96 relative bg-card rounded-lg border border-border flex items-center justify-center">
        <Button size="icon" onClick={onAdd} className="w-10 h-10 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 h-96 relative bg-card rounded-lg border border-border transition-transform duration-300 hover:scale-105">
      {/* Header */}
      <div className="!px-4 !py-2 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-blue-600 dark:text-sky-400">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* More Options Button */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-700 dark:text-gray-300">
          <Settings className="!w-6 !h-6" />
        </Button>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 flex items-center justify-center !py-1.5">
        <div className="w-72 h-52 bg-black rounded" />
      </div>

      {/* Actions */}
      <div className="absolute bottom-0 left-0 right-0 px-4 !py-2 border-t border-border flex justify-center items-center gap-4">
        <Button onClick={onCheckCamera} className="w-32 h-10 bg-blue-600 hover:bg-blue-700">
          Check Camera
        </Button>
        <Button onClick={onDelete} variant="destructive" className="w-32 h-10 gap-1.5">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
