"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCurrencyInput } from "../hooks/use-currency-input"

interface DownPaymentInputProps {
  value: string
  onChange: (value: string) => void
  maxValue: number
}

export function DownPaymentInput({ value: initialValue, onChange, maxValue }: DownPaymentInputProps) {
  const { value, handleChange, formattedValue } = useCurrencyInput({
    initialValue,
    maxValue,
    onChange,
  })

  return (
    <div className="space-y-2">
      <Label htmlFor="down-payment">Entrada (R$)</Label>
      <div className="relative">
        <Input
          id="down-payment"
          type="text"
          placeholder="0,00"
          value={value}
          onChange={handleChange}
          className="pr-20"
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {formattedValue}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Valor máximo: {maxValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  )
}
