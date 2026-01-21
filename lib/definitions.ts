export type Product = {
  key: string
  title: string
  description: React.ReactNode
  params: {
    id: string
    title: string
    description: React.ReactNode
  }[]
  image: string
  price: React.ReactNode
}
