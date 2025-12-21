export type UserRole = "admin" | "user"

type AddCardProps = {
  isAddCard: true
  onAdd: () => void
}

type NormalCameraCardProps = {
  isAddCard?: false
  id: string
  title?: string
  description?: string
  role?: UserRole
  onDelete?: () => void
}

export type CameraCardProps = AddCardProps | NormalCameraCardProps
