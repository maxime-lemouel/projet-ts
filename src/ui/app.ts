import { fetchActions } from "../api/api.js"
import { renderChartLine, renderChartBar } from "../charts/chart.js"
import { Action } from "../models/actions.js"


let allActions: Action[] = []

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function showError(msg: string): void {
    const el = document.getElementById("error-box")!
    el.textContent = msg
    el.style.display = "block"
}

function clearError(): void {
    const el = document.getElementById("error-box")!
    el.textContent = ""
    el.style.display = "none"
}

function setLoading(active: boolean): void {
    document.getElementById("loader")!.style.display = active ? "block" : "none"
    ;(document.getElementById("load-btn") as HTMLButtonElement).disabled = active
}

// Remplit le <select> avec toutes les actions de l'API
function populateSelect(actions: Action[]): void {
    const select = document.getElementById("stock1") as HTMLSelectElement
    select.innerHTML = ""

    actions.forEach((action) => {
        const opt = document.createElement("option")
        opt.value = action.symbol
        opt.textContent = `${action.name} (${action.symbol})`
        select.appendChild(opt)
    })
}

// Filtre les historiques selon la période choisie
function filterByPeriod(action: Action, period: string): Action {
    const now = new Date()
    let cutoff: Date

    if (period === "1w")      cutoff = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
    else if (period === "1m") cutoff = new Date(now.getTime() - 30 * 24 * 3600 * 1000)
    else                      cutoff = new Date(now.getTime() - 365 * 24 * 3600 * 1000)

    // Sécurité si historys est undefined ou vide
    if (!action.history || action.history.length === 0) {
        throw new Error(`Pas d'historique pour ${action.name}`)
    }

    return {
        ...action,
        history: action.history.filter((h) => new Date(h.date) >= cutoff && new Date(h.date) <= now),
    }
}

async function loadAndRender(): Promise<void> {
    clearError()
    setLoading(true)

    try {
        const symbol = (document.getElementById("stock1") as HTMLSelectElement).value
        const period = (document.getElementById("period") as HTMLSelectElement).value
        const chartType = (document.getElementById("chart-type") as HTMLSelectElement).value as "line" | "bar"



        const action1 = allActions.find((a) => a.symbol === symbol)!


        const filtered1 = filterByPeriod(action1, period)


        if (filtered1.history.length === 0 ) {
            throw new Error("Aucune donnée disponible pour cette période.")
        }
        else if (chartType === "line") renderChartLine([filtered1])

        else renderChartBar([filtered1])    
       // renderChart([filtered1])

    } catch (e) {
        showError(e instanceof Error ? e.message : "Erreur inconnue")
    } finally {
        setLoading(false)
    }
}

async function main(): Promise<void> {
    try {
        setLoading(true)
        allActions = await fetchActions()
        console.log(allActions)
        console.log(allActions[0])
        await delay(1000);
        populateSelect(allActions)

    } catch (e) {
        showError("Impossible de charger les actions : " + (e instanceof Error ? e.message : ""))
    } finally {
        setLoading(false)
    }

    document.getElementById("load-btn")!.addEventListener("click", loadAndRender)
}

main()