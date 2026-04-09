import {Action} from "../models/actions";

async function fetchActions(): Promise<Action[]> {

    try {
        const res = await fetch("https://keligmartin.github.io/api/stocks.json")
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`)
        const data: Action[] = await res.json()
        console.log(data);
        return data


    } catch (e) {
        console.error("Erreur lors du chargement des repas")
        alert("Erreur lors du chargement des repas")
        return []
    }
}