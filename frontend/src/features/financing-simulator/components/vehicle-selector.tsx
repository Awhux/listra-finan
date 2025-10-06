"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VehicleListItem } from "@/lib/api"

interface VehicleSelectorProps {
  vehicles: VehicleListItem[]
  selectedVehicleId?: string
  onVehicleChange: (vehicleId: string) => void
}

export function VehicleSelector({ vehicles, selectedVehicleId, onVehicleChange }: VehicleSelectorProps) {
  return (
    <Select value={selectedVehicleId} onValueChange={onVehicleChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Selecione um veículo que deseja simular o financiamento" />
      </SelectTrigger>
      <SelectContent>
        {vehicles.map((vehicle) => (
          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
            {vehicle.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
