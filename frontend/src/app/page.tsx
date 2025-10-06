import { Header } from "@/features/layout/components/header"
import { Footer } from "@/features/layout/components/footer"
import { FinancingSimulator } from "@/features/financing-simulator/components/financing-simulator"
import { fetchVehicles, type VehicleListItem } from "@/lib/api"
import { Suspense } from "react"

function FinancingSimulatorSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Simulação de Financiamento</h2>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse sm:flex-1" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </section>
    </div>
  )
}

export default async function Home() {
  let vehicles: VehicleListItem[] = []
  let error: string | null = null

  try {
    vehicles = await fetchVehicles()
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load vehicles"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<FinancingSimulatorSkeleton />}>
          <FinancingSimulator vehicles={vehicles} error={error} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
