import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SimulationResult } from "@/lib/api"
import { ContactButton } from "./contact-button"
import { findBestDeal } from "../utils/financing"

interface FinancingValuesProps {
  results: SimulationResult[]
  phone: string
}

export function FinancingValues({ results, phone }: FinancingValuesProps) {
  const bestDeal = findBestDeal(results)

  return (
    <Card className="flex h-fit flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Valores simulados para você</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        {results.map((result) => (
          <div key={result.installments} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{result.installments}x</p>
              <p className="text-2xl font-bold text-primary">R$ {result.installment_value.toLocaleString("pt-BR")}</p>
            </div>
            {bestDeal && result.installments === bestDeal.installments && (
              <div className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                MAIS BARATO
              </div>
            )}
          </div>
        ))}
      </CardContent>

      <div className="p-6">
        <ContactButton phone={phone} />
      </div>
    </Card>
  )
}
