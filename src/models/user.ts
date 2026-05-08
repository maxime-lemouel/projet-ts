// Préférences utilisateur sauvegardées entre les sessions
export interface UserPreferences {
    stock1: string
    stock2: string
    period: string
}

// Sauvegarde les préférences dans le localStorage du navigateur
export function savePreferences(prefs: UserPreferences): void {
    localStorage.setItem("mybourse_prefs", JSON.stringify(prefs))
}

// Charge les préférences depuis le localStorage, retourne null si absentes ou corrompues
export function loadPreferences(): UserPreferences | null {
    const raw = localStorage.getItem("mybourse_prefs")
    if (!raw) return null
    try {
        return JSON.parse(raw) as UserPreferences
    } catch {
        return null
    }
}