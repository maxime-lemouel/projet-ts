import { Action } from "../models/actions.js"

export async function fetchActions(): Promise<Action[]> {
        const res = await fetch("https://keligmartin.github.io/api/stocks.json")
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`)
        const data: Action[] = await res.json()
        return data
}