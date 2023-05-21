import express from "express";
import ProductManager from "./ProductManager.js";

const app = express()
app.use(express.urlencoded({ extended:true }))

let products = new ProductManager()
products.addProduct("Jamon natural", "Jamon natural embasado al vacio de 150grs", 3500, "url foto", "abc123", 20)
products.addProduct("Queso Dambo", "Pedaso de queso Dambo embaso con un peso de 300grs", 3500, "url foto", "abc124", 20)
let productsList = products.getProducts()

app.get("/products", (req, res) => {
    let limit = req.query.limit
    if (!limit) {
        res.send(productsList)
    } else if (limit > productsList.length || limit < 1) {
        res.send(`Cantidad invalida, por favor ingresar un numero entre 1 y ${productsList.length}`)
    } else {
        let limitedProducts = []
        for (let index = 0; index < limit; index++) {
            limitedProducts.push(productsList[index])
        }
        res.send(limitedProducts)
    }
})

app.get("/products/:id", (req, res) => {
    let productId = req.params.id
    let findProduct = productsList.find(p => p.id === parseInt(productId))
    if (!productId) { 
        res.send(productsList) 
    } else {
        res.send(findProduct)
    }
})

app.listen(8080, () => console.log("Servidor arriba"))

