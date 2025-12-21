export type UserRole = "admin" | "police" | "user"

type AddCardProps = {
  isAddCard: true
  onAdd: () => void
}

type NormalCameraCardProps = {
  isAddCard?: false
  id: string
  name: string
  source_type: 'video' | 'camera'
  role?: string | null
  onDelete?: () => void
  onEdit?: () => void
}

export type CameraCardProps = AddCardProps | NormalCameraCardProps
