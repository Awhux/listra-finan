import type { VehicleDetails } from "@/lib/api"

export interface Vehicle extends VehicleDetails {
  displayName: string
}

export function mapVehicleDetailsToVehicle(details: VehicleDetails): Vehicle {
  return {
    ...details,
    displayName: `${details.brand} ${details.model}`,
  }
}
