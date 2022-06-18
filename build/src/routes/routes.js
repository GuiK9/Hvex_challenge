const express = require("express")
const middlewares = require("../middlewares/middleware.js")
const bodyParser = require("body-parser")

const router = express.Router()


router.use(bodyParser.json())

router.post("/cadastro", middlewares.register)

router.post("/login", middlewares.login)

router.get("/categoria", middlewares.categoryMiddleware)

router.get("/produtos/:category_id", middlewares.products)

router.get("/produto/:product_id", middlewares.oneProduct)

router.get("/pedidos", middlewares.orders)
 


module.exports = router