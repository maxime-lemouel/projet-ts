var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
import {User, TropPauvreErreur} from "./user.js"

const user = new User(1, "Bob", 100)
*/
const menuActions = [];
let allActions = [];
function fetchActions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("https://keligmartin.github.io/api/stocks.json");
            if (!res.ok)
                throw new Error(`Erreur HTTP : ${res.status}`);
            const data = yield res.json();
            console.log(data);
            return data;
        }
        catch (e) {
            console.error("Erreur lors du chargement des repas");
            alert("Erreur lors du chargement des repas");
            return [];
        }
    });
}
/*
function renderWallet(): void {
    const el = document.getElementById("walletDisplay")
    if (el) {
        el.textContent = `Portefeuille de ${user.name} : ${user.wallet} €`
    }
}

function renderHistory(): void {
    const histList = document.getElementById("orderHistory") as HTMLUListElement
    const totalEl  = document.getElementById("totalSpent")
    if (!histList) {
        return
    }
    histList.innerHTML = ""

    user.orders.forEach((order) => {

        const li = document.createElement("li")
        li.className = "list-group-item"
        li.textContent = `Commande #${order.id} — ${order.meals.map(m => m.name).join(", ")} — ${order.total} € `

        const delBtn = document.createElement("button")
        delBtn.className = "btn btn-success"
        delBtn.textContent = "Supprimer"
        delBtn.addEventListener("click", () => {
            user.removeOrder(order.id)
            renderHistory()
        })

        li.appendChild(delBtn)
        histList.appendChild(li)
    })

    if (totalEl) totalEl.textContent = user.totalSpent().toFixed(2)
}

function handleOrder(meal: Meal): void {
    try {
        user.orderMeal(meal)
        renderWallet()
        renderHistory()
        console.log(`Commande passée : ${meal.name}`)

    } catch (e) {
        if (e instanceof TropPauvreErreur) {
            console.error(`${e.message} — Solde : ${e.solde} € | Prix : ${e.prixCommande} €`)

            alert(`${e.message} — Solde : ${e.solde} € | Prix : ${e.prixCommande} €`)
        }
    }
}

function renderMeals(actions: Action[]): void {

    const mealList = document.getElementById("mealList") as HTMLUListElement

    mealList.innerHTML = ""

    actions.forEach((action) => {
        const li = document.createElement("li")
        li.className = "list-group-item"
        li.textContent = `${action.name} — ${action.price} €`

        const btn = document.createElement("button")
        btn.className = "btn btn-primary w-100"
        btn.textContent = "Commander"
        btn.addEventListener("click", () => handleOrder(action))

        const menuBtn = document.createElement("button")
        menuBtn.className = "btn btn-primary w-100"
        menuBtn.textContent = "+ Menu"
        menuBtn.addEventListener("click", () => addToMenu(action))

        li.appendChild(btn)
        li.appendChild(menuBtn)
        mealList.appendChild(li)
    })
}

function setupPriceFilter(): void {
    const slider = document.getElementById("priceFilter") as HTMLInputElement
    const label  = document.getElementById("filterValue") as HTMLElement

    slider.addEventListener("input", () => {
        label.textContent = slider.value
        const max = parseFloat(slider.value)
        const filtered = allMeals.filter(m => m.price <= max)
        renderMeals(filtered)

    })
}


function addToMenu(meal: Meal): void {
    menuMeals.push(meal)

    const menuList = document.getElementById("menuList") as HTMLUListElement
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.textContent = `${meal.name} — ${meal.price} €`

    const removeBtn = document.createElement("button")
    removeBtn.className = "btn btn-primary"
    removeBtn.textContent = "Retirer"
    removeBtn.addEventListener("click", () => {
        menuMeals.splice(menuMeals.indexOf(meal), 1)
        li.remove()
    })

    li.appendChild(removeBtn)
    menuList.appendChild(li)
}

const calcMenuBtn = document.getElementById("calculateMenuBtn") as HTMLButtonElement

calcMenuBtn.addEventListener("click", () => {
    const ht  = menuMeals.reduce((acc, m) => acc + m.price, 0)
    const ttc = ht * 1.2
    const menuTotalHT  = document.getElementById("menuTotalHT")  as HTMLSpanElement
    const menuTotalTTC = document.getElementById("menuTotalTTC") as HTMLSpanElement
    menuTotalHT.textContent  = ht.toFixed(2)
    menuTotalTTC.textContent = ttc.toFixed(2)

})
*/
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        allActions = yield fetchActions();
        /*
        renderMeals(allMeals)
        renderWallet()
        renderHistory()
        setupPriceFilter()
        */
    });
}
main();
export {};
