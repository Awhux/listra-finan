import { Button } from "@/components/ui/button"
import { WhatsappIcon } from "./icons/whatsapp-icon"

interface ContactButtonProps {
  phone: string
}

export function ContactButton({ phone }: ContactButtonProps) {
  const whatsappNumber = phone.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/55${whatsappNumber}`

  return (
    <Button
      asChild
      className="w-full rounded-lg bg-success font-semibold text-success-foreground transition-colors hover:bg-success/90"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsappIcon className="mr-2 h-5 w-5" />
        Falar com consultor
        <span className="ml-2 text-xs">{phone}</span>
      </a>
    </Button>
  )
}
