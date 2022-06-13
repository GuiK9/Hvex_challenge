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

