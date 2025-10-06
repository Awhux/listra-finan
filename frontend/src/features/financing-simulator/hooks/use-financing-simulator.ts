import { useState, useTransition } from "react"
import { fetchVehicleDetails } from "@/lib/api"
import { mapVehicleDetailsToVehicle, type Vehicle } from "../data/vehicles"
import { simulateFinancingAction, type SimulationFormState } from "../actions/simulation"

const initialState: SimulationFormState = {
  success: false,
}

export function useFinancingSimulator() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [downPayment, setDownPayment] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<SimulationFormState>(initialState)

  const handleVehicleChange = async (vehicleId: string) => {
    if (!vehicleId) {
      setSelectedVehicle(null)
      setDownPayment("")
      setState(initialState)
      return
    }

    try {
      const vehicleDetails = await fetchVehicleDetails(parseInt(vehicleId))
      const vehicle = mapVehicleDetailsToVehicle(vehicleDetails)
      setSelectedVehicle(vehicle)
      setDownPayment("")
      setState(initialState)
    } catch (err) {
      console.error("Failed to fetch vehicle details:", err)
      setState({
        ...initialState,
        error: "Failed to fetch vehicle details. Please try again.",
      })
    }
  }

  const handleDownPaymentChange = (value: string) => {
    setDownPayment(value)
  }

  const handleSubmit = (formData: FormData) => {
    if (!selectedVehicle) return

    formData.set("vehicle_id", selectedVehicle.id.toString())
    formData.set("down_payment", downPayment)

    startTransition(async () => {
      const result = await simulateFinancingAction(state, formData)
      setState(result)
    })
  }

  return {
    selectedVehicle,
    downPayment,
    isPending,
    state,
    handleVehicleChange,
    handleDownPaymentChange,
    handleSubmit,
  }
}
