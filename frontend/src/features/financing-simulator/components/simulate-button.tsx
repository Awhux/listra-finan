"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SimulateButtonProps {
  disabled?: boolean
  isPending?: boolean
}

export function SimulateButton({ disabled, isPending }: SimulateButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || isPending}
      className="w-full rounded-full bg-primary px-8 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Simulando...
        </>
      ) : (
        "Simular"
      )}
    </Button>
  )
}
