import { Card, CardContent } from "@/components/ui/card"
import type { Vehicle } from "../data/vehicles"
import type { SimulationResult } from "@/lib/api"
import { FinancingValues } from "./financing-values"
import { VehicleImage } from "./vehicle-card/vehicle-image"
import { VehicleTitle } from "./vehicle-card/vehicle-title"
import { VehicleDetails } from "./vehicle-card/vehicle-details"
import { VehiclePrice } from "./vehicle-card/vehicle-price"

interface VehicleCardProps {
  vehicle: Vehicle
  results?: SimulationResult[]
}

export function VehicleCard({ vehicle, results }: VehicleCardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="overflow-hidden">
        <VehicleImage imageUrl={vehicle.photo_url} altText={vehicle.displayName} />
        <CardContent className="p-6">
          <VehicleTitle title={vehicle.displayName} />
          <VehicleDetails
            year={vehicle.year}
            mileage={vehicle.mileage}
            transmission={vehicle.transmission_type}
          />
          <VehiclePrice price={vehicle.price} />
        </CardContent>
      </Card>

      {results && results.length > 0 && <FinancingValues results={results} phone={vehicle.store_phone} />}
    </div>
  )
}
