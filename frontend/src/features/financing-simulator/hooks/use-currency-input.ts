import { useState } from "react"

interface UseCurrencyInputProps {
  initialValue: string
  maxValue: number
  onChange: (value: string) => void
}

export function useCurrencyInput({ initialValue, maxValue, onChange }: UseCurrencyInputProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, "")

    if (!/^\d*\.?\d*$/.test(sanitizedValue)) {
      return
    }

    const numValue = parseFloat(sanitizedValue)
    if (!isNaN(numValue) && numValue > maxValue) {
      return
    }

    setValue(sanitizedValue)
    onChange(sanitizedValue)
  }

  const formatCurrency = (val: string) => {
    if (!val) return ""
    const num = parseFloat(val)
    if (isNaN(num)) return ""
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return {
    value,
    handleChange,
    formattedValue: formatCurrency(value),
  }
}
