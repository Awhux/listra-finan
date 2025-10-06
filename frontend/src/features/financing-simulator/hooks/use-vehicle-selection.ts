"use client"

import { useState } from "react"
import type { Vehicle } from "../data/vehicles"

export function useVehicleSelection(vehicles: Vehicle[]) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const selectVehicle = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId)
    setSelectedVehicle(vehicle || null)
  }

  return {
    selectedVehicle,
    selectVehicle,
  }
}
