# MyBourse 

Application web de visualisation de données boursières, développée en TypeScript.

## Fonctionnalités

- Affichage du cours d'une action sur une période donnée (1 semaine, 1 mois, 1 an)
- Mode comparaison : visualisation simultanée de jusqu'à 4 actions
- Choix du type de graphique : ligne ou barres
- Mode sombre / clair avec mémorisation de la préférence
- Interface responsive (Bootstrap 5)

## Technologies utilisées

- TypeScript
- Chart.js
- Bootstrap 5
- HTML5

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/maxime-lemouel/projet-ts.git
cd projet-ts

# Installer les dépendances
npm install

# Compiler le TypeScript
npx tsc

# Ouvrir index.html dans un navigateur
```

## Utilisation

1. Sélectionner une action dans le menu déroulant
2. Choisir la période et le type de graphique
3. Cliquer sur **Charger** pour afficher le graphique
4. (Optionnel) Cliquer sur **Comparer** pour sélectionner plusieurs actions simultanément
5. Utiliser le bouton 🌙 / ☀️ en haut à droite pour basculer en mode sombre

## Structure du projet

```
projet-ts/
├── index.html          # Page principale
├── tsconfig.json       # Configuration TypeScript
├── src/
│   └── ui/
│       └── app.ts      # Logique principale de l'interface
└── dist/               # Fichiers compilés (généré par tsc)
```
