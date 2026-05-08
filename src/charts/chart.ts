import { Action } from "../models/actions.js"

// Chart.js est chargé via CDN dans index.html
declare const Chart: any

// Instance du graphique en cours — permet de le détruire avant d'en créer un nouveau
let chartInstance: any = null

export type ChartType = "line" | "bar"

// Affiche un graphique en ligne pour les actions données
export function renderChartLine(actions: Action[]): void {
    const chartType = "line"

    // Détruire l'ancien graphique pour éviter les doublons
    if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
    }

    // Couleurs attribuées à chaque action (max 4)
    const colors = ["#3b82f6", "#ef4444","#008000","#FFFF00"]

    // Construction des datasets Chart.js à partir des historiques
    const datasets = actions.map((action, i) => ({
        label: `${action.name} (${action.symbol})`,
        data: action.history.map((h) => h.price),
        borderColor: colors[i],
        backgroundColor: colors[i] + "10",
        tension: 0.3,
        fill: chartType === "line",
    }))

    // Les labels sont les dates formatées en français
    const labels = actions[0].history.map((h) =>
        new Date(h.date).toLocaleDateString("fr-FR")
    )

    chartInstance = new Chart("myChart", {
        type: chartType,
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
            scales: {
                y: { beginAtZero: false },
            },
        },
    })
}

// Affiche un graphique en barres pour les actions données
export function renderChartBar(actions: Action[]): void {
    const chartType = "bar"

   // Détruire l'ancien graphique pour éviter les doublons
    if (chartInstance) {
        chartInstance.destroy()
        chartInstance = null
    }

    const colors = ["#3b82f6", "#ef4444","#008000","#FFFF00"]

    const datasets = actions.map((action, i) => ({
        label: `${action.name} (${action.symbol})`,
        data: action.history.map((h) => h.price),
        borderColor: colors[i],
        backgroundColor: colors[i] + "90",
        tension: 0.3,
        fill: chartType === "bar",
    }))

    const labels = actions[0].history.map((h) =>
        new Date(h.date).toLocaleDateString("fr-FR")
    )

    chartInstance = new Chart("myChart", {
        type: chartType,
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
            scales: {
                y: { beginAtZero: false },
            },
        },
    })
}