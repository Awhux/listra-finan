import type { SimulationResult } from "@/lib/api"

export function findBestDeal(results: SimulationResult[]): SimulationResult | null {
  if (!results || results.length === 0) {
    return null
  }
  return results.reduce((min, current) => (current.installment_value < min.installment_value ? current : min))
}
