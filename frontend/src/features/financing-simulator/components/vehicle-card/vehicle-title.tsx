interface VehicleTitleProps {
  title: string
}

export function VehicleTitle({ title }: VehicleTitleProps) {
  return <h3 className="mb-4 text-xl font-bold text-gray-800">{title}</h3>
}
