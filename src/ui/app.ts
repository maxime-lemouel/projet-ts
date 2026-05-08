import { fetchActions } from "../api/api.js"
import { renderChartLine, renderChartBar } from "../charts/chart.js"
import { Action } from "../models/actions.js"

// Liste complète des actions chargées depuis l'API
let allActions: Action[] = []

// Indique si le mode comparaison (multi-sélection) est actif
let comparerMode = false

// IDs des selects du mode comparaison
const compareIds = ["action-c1", "action-c2", "action-c3", "action-c4"] as const

// Utilitaire : attend ms millisecondes avant de continuer
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Affiche un message d'erreur dans la zone dédiée
function showError(msg: string): void {
    const el = document.getElementById("error-box")!
    el.textContent = msg
    el.style.display = "block"
}

// Cache la zone d'erreur
function clearError(): void {
    const el = document.getElementById("error-box")!
    el.textContent = ""
    el.style.display = "none"
}

// Affiche ou masque le loader et désactive/active le bouton de chargement
function setLoading(active: boolean): void {
    document.getElementById("loader")!.style.display = active ? "block" : "none"
    ;(document.getElementById("load-btn") as HTMLButtonElement).disabled = active
}

// Retourne les selects du mode comparaison
function getCompareSelects(): HTMLSelectElement[] {
    return compareIds.map(id => document.getElementById(id) as HTMLSelectElement)
}

// Retourne les symboles sélectionnés selon le mode actif (simple ou comparaison)
function getSelectedSymbols(): string[] {
    if (comparerMode) {
        return getCompareSelects().map(s => s.value)
    }
    return [(document.getElementById("action1") as HTMLSelectElement).value]
}

// Remplit le select principal avec toutes les actions disponibles
function populateSelect(actions: Action[]): void {
    const select = document.getElementById("action1") as HTMLSelectElement
    select.innerHTML = ""

    // Option par défaut
    const opt = document.createElement("option")
    opt.value = "null"
    opt.textContent = `Séléctionner une action`
    select.appendChild(opt)
    actions.forEach((action) => {
        const opt = document.createElement("option")
        opt.value = action.symbol
        opt.textContent = `${action.name} (${action.symbol})`
        select.appendChild(opt)
    })
}

// Copie les options du select principal vers les selects du mode comparaison
function syncCompareOptions(): void {
    const source = document.getElementById("action1") as HTMLSelectElement
    getCompareSelects().forEach(sel => {
        sel.innerHTML = source.innerHTML
    })
}

// Initialise le bouton "Comparer" pour basculer entre mode simple et comparaison
function initCompareToggle(): void {
    const comparerBtn = document.getElementById("comparer-btn")!
    const singleForm = document.getElementById("single-select-form")!
    const multiForm = document.getElementById("multi-select-form")!

    comparerBtn.addEventListener("click", () => {
        comparerMode = !comparerMode

        if (comparerMode) {
            // Passage en mode comparaison : synchronise les selects et pre-sélectionne l'action courante
            syncCompareOptions()
            const current = (document.getElementById("action1") as HTMLSelectElement).value
            getCompareSelects()[0].value = current

            singleForm.style.display = "none"
            multiForm.style.display = ""
            comparerBtn.classList.replace("btn-outline-secondary", "btn-primary")
        } else {
            // Retour au mode simple
            singleForm.style.display = ""
            multiForm.style.display = "none"
            comparerBtn.classList.replace("btn-primary", "btn-outline-secondary")
        }
    })
}

// Filtre l'historique d'une action selon la période choisie (1w, 1m, 1y)
function filterByPeriod(action: Action, period: string): Action {
    const now = new Date()
    let cutoff: Date

    if (period === "1w") cutoff = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
    else if (period === "1m") cutoff = new Date(now.getTime() - 30 * 24 * 3600 * 1000)
    else cutoff = new Date(now.getTime() - 365 * 24 * 3600 * 1000)

    if (!action.history || action.history.length === 0) {
        throw new Error(`Pas d'historique pour ${action.name}`)
    }

    // Ne garde que les entrées comprises dans l'intervalle [cutoff, now]
    return {
        ...action,
        history: action.history.filter((h) => new Date(h.date) >= cutoff && new Date(h.date) <= now),
    }
}

// Charge et affiche le graphique selon les sélections de l'utilisateur
async function loadAndRender(): Promise<void> {
    clearError()
    setLoading(true)

    try {
        var symbols = getSelectedSymbols()
        const period = (document.getElementById("period") as HTMLSelectElement).value
        const chartType = (document.getElementById("chart-type") as HTMLSelectElement).value as "line" | "bar"

        // Filtre les valeurs "null" (option par défaut non sélectionnée)
        const symbolsNotNull =[]
        for (const symbol of symbols) {
            if (symbol != "null"){
                symbolsNotNull.push(symbol)
            }
        }
        symbols = symbolsNotNull;
        if (symbols.length === 0) {
            throw new Error("selectioner au moins une action")
        }

        // Récupère et filtre les données de chaque action sélectionnée
        const filtered = symbols.map(symbol => {
            const action = allActions.find(a => a.symbol === symbol)
            if (!action) throw new Error(`Action introuvable : ${symbol}`)
            return filterByPeriod(action, period)
        })

        if (filtered.some(f => f.history.length === 0)) {
            throw new Error("Aucune donnée disponible pour cette période.")
        }

        // Rendu du graphique selon le type choisi
        if (chartType === "line") renderChartLine(filtered)
        else renderChartBar(filtered)
    } catch (e) {
        showError(e instanceof Error ? e.message : "Erreur inconnue")
    } finally {
        setLoading(false)
    }
}

// Point d'entrée : charge les actions et initialise l'interface
async function main(): Promise<void> {
    try {
        setLoading(true)
        allActions = await fetchActions()
        await delay(1000) // Délai visuel pour simuler un chargement
        populateSelect(allActions)
        initCompareToggle()
    } catch (e) {
        showError("Impossible de charger les actions : " + (e instanceof Error ? e.message : ""))
    } finally {
        setLoading(false)
    }

    // Lie le bouton "Charger" au rendu du graphique
    document.getElementById("load-btn")!.addEventListener("click", loadAndRender)
}

main()

// --- Gestion du mode sombre ---

const darkToggleBtn = document.getElementById('dark-toggle') as HTMLButtonElement;
// Restaure le mode sombre si l'utilisateur l'avait activé lors d'une session précédente
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  darkToggleBtn.textContent = '☀️ Mode clair';
}
// Bascule le mode sombre et sauvegarde la préférence
darkToggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  darkToggleBtn.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
  localStorage.setItem('darkMode', String(isDark));
});