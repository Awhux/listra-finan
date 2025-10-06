"use server"

import { simulateFinancing, type SimulationRequest, type SimulationResponse, ApiError } from "@/lib/api"
import { redirect } from "next/navigation"

export interface SimulationFormState {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
  data?: SimulationResponse
}

export async function simulateFinancingAction(
  prevState: SimulationFormState,
  formData: FormData
): Promise<SimulationFormState> {
  try {
    const vehicleId = formData.get("vehicle_id")
    const downPayment = formData.get("down_payment")

    if (!vehicleId || !downPayment) {
      return {
        success: false,
        error: "Vehicle ID and down payment are required",
      }
    }

    const vehicleIdNum = parseInt(vehicleId.toString())
    const downPaymentNum = parseFloat(downPayment.toString())

    if (isNaN(vehicleIdNum) || isNaN(downPaymentNum)) {
      return {
        success: false,
        error: "Invalid vehicle ID or down payment format",
      }
    }

    if (downPaymentNum < 0) {
      return {
        success: false,
        error: "Down payment must be greater than or equal to 0",
      }
    }

    const request: SimulationRequest = {
      vehicle_id: vehicleIdNum,
      down_payment: downPaymentNum,
    }

    const result = await simulateFinancing(request)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        fieldErrors: error.errors,
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
