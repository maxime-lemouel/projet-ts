export interface UserPreferences {
    stock1: string
    stock2: string
    period: string
}

export function savePreferences(prefs: UserPreferences): void {
    localStorage.setItem("mybourse_prefs", JSON.stringify(prefs))
}

export function loadPreferences(): UserPreferences | null {
    const raw = localStorage.getItem("mybourse_prefs")
    if (!raw) return null
    try {
        return JSON.parse(raw) as UserPreferences
    } catch {
        return null
    }
}