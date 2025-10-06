"use client"

import type { VehicleListItem } from "@/lib/api"
import { VehicleSelector } from "./vehicle-selector"
import { SimulateButton } from "./simulate-button"
import { VehicleCard } from "./vehicle-card"
import { DownPaymentInput } from "./down-payment-input"
import { ErrorMessage } from "./error-message"
import { useFinancingSimulator } from "../hooks/use-financing-simulator"

interface FinancingSimulatorProps {
  vehicles: VehicleListItem[]
  error?: string | null
}

export function FinancingSimulator({ vehicles, error }: FinancingSimulatorProps) {
  const {
    selectedVehicle,
    downPayment,
    isPending,
    state,
    handleVehicleChange,
    handleDownPaymentChange,
    handleSubmit,
  } = useFinancingSimulator()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={`Failed to load vehicles: ${error}`} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Simulação de Financiamento</h2>

        <form action={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:flex-1">
              <VehicleSelector
                vehicles={vehicles}
                selectedVehicleId={selectedVehicle?.id.toString()}
                onVehicleChange={handleVehicleChange}
              />
            </div>
          </div>

          {selectedVehicle && (
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="w-full sm:flex-1">
                <DownPaymentInput
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                  maxValue={parseFloat(selectedVehicle.price)}
                />
              </div>
              <SimulateButton disabled={!selectedVehicle || !downPayment} isPending={isPending} />
            </div>
          )}

          {state.error && <ErrorMessage message={state.error} />}
        </form>
      </section>

      {selectedVehicle && state.success && state.data && (
        <section>
          <VehicleCard vehicle={selectedVehicle} results={state.data.results} />
        </section>
      )}
    </div>
  )
}
