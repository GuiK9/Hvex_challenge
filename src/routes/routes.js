const express = require("express")
const middlewares = require("../middlewares/middleware.js")
const bodyParser = require("body-parser")

const router = express.Router()


router.use(bodyParser.json())

router.post("/cadastro", middlewares.register)

/* router.post("/login", middlewares.login)

router.get("/categoria", middlewares.category)

/*Câmeras e Acessórios
Celulares e Telefones
Eletrônicos, Áudio e Vídeo
Games

router.get("/produtos:category_id", middlewares.products)

router.get("/produto:product_id", middlewares.products)

router.get("/pedidos", middlewares.products)
 */
//cada usuário deve ter uma tabela de pedidos prépronta para ser testada





module.exports = router