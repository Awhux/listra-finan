"use client"

import { useState } from "react"
import { calculateMonthlyPayment, financingOptions } from "../data/financing-config"

export interface FinancingResult {
  months: number
  monthlyPayment: number
}

export function useFinancing() {
  const [results, setResults] = useState<FinancingResult[]>([])

  const simulate = (vehiclePrice: number) => {
    const calculatedResults = financingOptions.map((option) => ({
      months: option.months,
      monthlyPayment: calculateMonthlyPayment(vehiclePrice, option.months, option.interestRate),
    }))
    setResults(calculatedResults)
  }

  const reset = () => {
    setResults([])
  }

  return {
    results,
    simulate,
    reset,
  }
}
