import { CalendarIcon } from "../icons/calendar-icon"
import { LightningIcon } from "../icons/lightning-icon"
import { TransmissionIcon } from "../icons/transmission-icon"

interface VehicleDetailsProps {
  year: number
  mileage: number
  transmission: string
}

export function VehicleDetails({ year, mileage, transmission }: VehicleDetailsProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        <span>{year}</span>
      </div>
      <div className="flex items-center gap-1">
        <LightningIcon className="h-4 w-4" />
        <span>{mileage.toLocaleString("pt-BR")} km</span>
      </div>
      <div className="flex items-center gap-1">
        <TransmissionIcon className="h-4 w-4" />
        <span>{transmission}</span>
      </div>
    </div>
  )
}
