interface VehicleImageProps {
  imageUrl: string
  altText: string
}

export function VehicleImage({ imageUrl, altText }: VehicleImageProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
      <img
        src={imageUrl || "/placeholder.svg?height=300&width=400&query=car"}
        alt={altText}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
