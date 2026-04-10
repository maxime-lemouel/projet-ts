import { Action } from "../models/actions.js"

// Chart.js est chargé via CDN dans index.html donc on déclare Chart globalement
declare const Chart: any

let chartInstance: any = null

export type ChartType = "line" | "bar"

export function renderChartLine(actions: Action[]): void {
    const chartType = "line"

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
        backgroundColor: colors[i] + "10",
        tension: 0.3,
        fill: chartType === "line",
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

