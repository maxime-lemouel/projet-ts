import {fetchActions} from "../api/api.js"
import {renderChartLine, renderChartBar} from "../charts/chart.js"
import {Action} from "../models/actions.js"


let allActions: Action[] = []
let comparerMode = false
const compareIds = ["action-c1", "action-c2", "action-c3", "action-c4"] as const

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


function getCompareSelects(): HTMLSelectElement[] {
    return compareIds.map(id => document.getElementById(id) as HTMLSelectElement)
}

function getSelectedSymbols(): string[] {
    if (comparerMode) {
        return getCompareSelects().map(s => s.value)
    }
    return [(document.getElementById("action1") as HTMLSelectElement).value]
}


function populateSelect(actions: Action[]): void {
    const select = document.getElementById("action1") as HTMLSelectElement
    select.innerHTML = ""
    const opt = document.createElement("option")
    opt.value = "null"
    opt.textContent = `vide`
    select.appendChild(opt)
    actions.forEach((action) => {
        const opt = document.createElement("option")
        opt.value = action.symbol
        opt.textContent = `${action.name} (${action.symbol})`
        select.appendChild(opt)
    })


}

function syncCompareOptions(): void {
    const source = document.getElementById("action1") as HTMLSelectElement
    getCompareSelects().forEach(sel => {
        sel.innerHTML = source.innerHTML
    })
}

function initCompareToggle(): void {
    const comparerBtn = document.getElementById("comparer-btn")!
    const singleForm = document.getElementById("single-select-form")!
    const multiForm = document.getElementById("multi-select-form")!

    comparerBtn.addEventListener("click", () => {
        comparerMode = !comparerMode

        if (comparerMode) {
            syncCompareOptions()
            const current = (document.getElementById("action1") as HTMLSelectElement).value
            getCompareSelects()[0].value = current

            singleForm.style.display = "none"
            multiForm.style.display = ""
            comparerBtn.classList.replace("btn-outline-secondary", "btn-primary")
        } else {
            const actionC1 = getCompareSelects()[0]
            singleForm.style.display = ""
            multiForm.style.display = "none"
            comparerBtn.classList.replace("btn-primary", "btn-outline-secondary")
        }
    })
}

function filterByPeriod(action: Action, period: string): Action {
    const now = new Date()
    let cutoff: Date

    if (period === "1w") cutoff = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
    else if (period === "1m") cutoff = new Date(now.getTime() - 30 * 24 * 3600 * 1000)
    else cutoff = new Date(now.getTime() - 365 * 24 * 3600 * 1000)

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
        const symbols = getSelectedSymbols()
        const period = (document.getElementById("period") as HTMLSelectElement).value
        const chartType = (document.getElementById("chart-type") as HTMLSelectElement).value as "line" | "bar"

        const filtered = symbols.map(symbol => {
            const action = allActions.find(a => a.symbol === symbol)
            if (!action) throw new Error(`Action introuvable : ${symbol}`)
            return filterByPeriod(action, period)
        })

        if (filtered.some(f => f.history.length === 0)) {
            throw new Error("Aucune donnée disponible pour cette période.")
        }

        if (chartType === "line") renderChartLine(filtered)
        else renderChartBar(filtered)

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
        await delay(1000)
        populateSelect(allActions)
        initCompareToggle()
    } catch (e) {
        showError("Impossible de charger les actions : " + (e instanceof Error ? e.message : ""))
    } finally {
        setLoading(false)
    }

    document.getElementById("load-btn")!.addEventListener("click", loadAndRender)
}

main()