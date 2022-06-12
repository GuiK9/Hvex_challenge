const express = require("express")
const routes = require("./src/routes/routes.js")
const database = require('./src/db')

require("dotenv").config()



database.sync().then(() => { console.log("DB connected") }).catch((err) => { console.log(err) })

const app = express()

app.use("/", routes)

app.listen(process.env.PORT_SERVER, () => {
    console.log("running")
})
/* (async () => {
    const database = require('./src/db')
    const Client = await require('./src/tables/client')
    const Product = require('./src/tables/product')
    const Request = require('./src/tables/request')
    const Category = require('./src/tables/category')
    await database.sync({force: true})

    const newClient = await Client.create({
        name: "paa",
        email:"kdk",
        password:'dddd'
    })

    const newProduct = await Product.create({
        id: "asdsd",
        title: "sdfsdf",
        price: 22,
        available_quantity: 12
    })

    const newRequest = await Request.create({
        client_id: newClient.id,
        product_id: newProduct.id
    })

    const newCategory = await Category.create({
        id: "asd",
        name: "dfsdfsdfsdfsd"
    })

    await newClient.save()
    await newRequest.save()
})()  */
