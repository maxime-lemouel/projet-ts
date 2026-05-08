import { Action } from "../models/actions.js"

// Récupère la liste des actions depuis l'API distante
export async function fetchActions(): Promise<Action[]> {
        const res = await fetch("https://keligmartin.github.io/api/stocks.json")
        // Lève une erreur si la requête échoue
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`)
        const data: Action[] = await res.json()
        return data
}