import fs from "fs"

class ProductManager{
    constructor(){
        this.path = "./src/productList.json"
        this.products = []
    }

    getProducts = () => {
        try {
            let data = fs.readFileSync(this.path, "utf-8")
            let productsToJS = JSON.parse(data)
            return productsToJS
        } catch(error) {
            console.log(error)
            return
        }
    }

    getProductById = (id) => {
        try {
            let data = fs.readFileSync(this.path, "utf-8")
            let arrayToJS = JSON.parse(data)
            let productFind = arrayToJS.find(p => p.id === id)
            console.log(productFind)
        } catch(error) {
            console.log(error)
        }
    }

    addProduct = (title, description, price, thumnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        for (const key in product) {
            if(!product[key]){
                console.log(`No se completaron todos los campos.`)
                return
            }
        }
        const uniqueCode = product.code
        if(this.products.some(x => x.code === uniqueCode)){
            console.log("Codigo ya registrado, ingrese un codigo que no este cargado.")
            return
        }
        if(this.products.length===0){
            product.id=1
        } else {
            product.id = this.products[this.products.length-1].id+1
        }
        this.products.push(product)
        let productToJSON = JSON.stringify(this.products, null, "\t")
        fs.writeFileSync(this.path, `\n${productToJSON}`, function(err) {
            if(err) throw err
            console.log("Elemento cargado correctamente.")
        })
    }

    deleteProduct = (idDelete) => {
        let productDelete = this.products.find(x => x.id === idDelete)
        if(productDelete === undefined){
            console.log("Producto no existente")
            return
        } else {
            let indexDelete = this.products.indexOf(productDelete)
            return this.products.splice(indexDelete, 1)
        }
    }

    updateProduct = (id, newField, newValue) => {
        if(newField == "id"){
            console.log("No se puede cambiar el id")
            return
        }
        try {
            let productFind = this.products.find(p => p.id === id)
            productFind[newField] = newValue
            let productToJSON = JSON.stringify(this.products, null, "\t")
            fs.writeFileSync(this.path, `\n${productToJSON}`, function(err) {
                if(err) throw err
                console.log("Elemento cargado correctamente.")
            })
            console.log("Producto actualizado correctamente")
        } catch(error) {
            console.log(error)
        }
    }
}

export default ProductManager