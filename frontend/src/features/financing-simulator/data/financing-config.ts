export interface FinancingOption {
  months: number
  interestRate: number
}

export const financingOptions: FinancingOption[] = [
  { months: 12, interestRate: 0.015 },
  { months: 24, interestRate: 0.018 },
  { months: 48, interestRate: 0.022 },
]

export function calculateMonthlyPayment(price: number, months: number, interestRate: number): number {
  const monthlyRate = interestRate
  const payment = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(payment)
}
