interface VehiclePriceProps {
  price: string
}

export function VehiclePrice({ price }: VehiclePriceProps) {
  return (
    <div className="mb-6">
      <p className="text-3xl font-bold text-gray-900">
        R$ {parseFloat(price).toLocaleString("pt-BR")}
      </p>
    </div>
  )
}
