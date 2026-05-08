// Représente une action boursière avec ses métadonnées et son historique
export type Action = {
    currency: string
    currentPrice: number
    history: History[]
    name: string
    sector: string
    symbol: string
}

// Représente un point de données dans l'historique d'une action
export type History = {
    date: string
    price: number
    volume: number
}