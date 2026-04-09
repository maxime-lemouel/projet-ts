export type Action = {
    currency: string
    currentPrice: number
    historys: History[]
    name: string
    sector: string
    symbol: string
}

export type History = {
    date: Date
    price: number
    volume: number
}