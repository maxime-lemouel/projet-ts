/*
import { Meal, Order } from "./meals.js"

export class TropPauvreErreur extends Error {
    public solde: number
    public prixCommande: number


    constructor(message: string, solde: number, prixCommande: number) {
        super(message)
        this.name = "TropPauvreErreur"
        this.solde = solde
        this.prixCommande = prixCommande
    }
}

export class User {
    id: number
    name: string
    wallet: number
    orders: Order[]

    constructor(id: number, name: string, wallet: number) {
        this.id = id
        this.name = name
        this.wallet = wallet

        this.orders = this.loadOrders()
    }

    orderMeal(meal: Meal): void {
        if (this.wallet < meal.price) {

            throw new TropPauvreErreur(
                `Fonds insuffisants pour "${meal.name}"`,
                this.wallet,
                meal.price

            )
        }

        this.wallet -= meal.price

        const order: Order = {
            id: Date.now(),
            meals: [meal],
            total: meal.price

        }

        this.orders.push(order)
        this.saveOrders()
    }

    private saveOrders(): void {
        localStorage.setItem(`orders_${this.id}`, JSON.stringify(this.orders))
    }

    removeOrder(orderId: number): void {
        this.orders = this.orders.filter((o) => o.id !== orderId)
        this.saveOrders()

    }

    private loadOrders(): Order[] {
        const raw = localStorage.getItem(`orders_${this.id}`)

        if (!raw) {
            return []
        }
        try {
            return JSON.parse(raw) as Order[]

        } catch {
            return []
        }
    }

    totalSpent(): number {
        return this.orders.reduce((acc, order) => acc + order.total, 0)
    }

}*/