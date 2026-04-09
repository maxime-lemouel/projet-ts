export type Action = {
    currency: string
    currentPrice: number
    history: History[]
    name: string
    sector: string
    symbol: string
}

export type History = {
    date: string
    price: number
    volume: number
}