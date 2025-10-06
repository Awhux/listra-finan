export interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

export const footerSections: FooterSection[] = [
  {
    title: "Encontre seu veículo",
    links: [
      { label: "Carros", href: "#" },
      { label: "Motos", href: "#" },
      { label: "Delivery", href: "#" },
      { label: "Vans/Ônibus", href: "#" },
      { label: "Serviços Mais", href: "#" },
    ],
  },
  {
    title: "A Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Delivery", href: "#" },
      { label: "Redes de Franquias", href: "#" },
      { label: "Blog Seminovos", href: "#" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Anuncie Seu Veículo", href: "#" },
      { label: "Fale Conosco", href: "#" },
      { label: "Perguntas Frequentes", href: "#" },
      { label: "Imprensa", href: "#" },
    ],
  },
  {
    title: "Lojistas",
    links: [
      { label: "Acesso Seminovos (Painel)", href: "#" },
      { label: "Acesso Seminovos (Loja)", href: "#" },
    ],
  },
]
