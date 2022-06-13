const product = require('./src/models/product')
const category = require('./src/models/category')
const axios = require('axios')

function syncDB() {

    axios.get('https://api.mercadolibre.com/sites/MLB/categories').then(async (resApi) => {

        const categories = resApi.data
        const categoriesFiltred = []


        categories.forEach(e => {
            if (e.id === process.env.CATEGORY1 || e.id === process.env.CATEGORY2 || e.id === process.env.CATEGORY3 || e.id === process.env.CATEGORY4) {
                categoriesFiltred.push(e)
            }
        })

        for (let i = 0; i < categoriesFiltred.length; i++) {

            const e = categoriesFiltred[i]

            try {
                /* const categoryModel = await category.create({
                    id: e.id,
                    name: e.name
                }) */
                //categoryModel.save() =======
            } catch (err) {
                console.log(err.message)
            }

        }

        for (let i = 0; i < categoriesFiltred.length; i++) {
            const e = categoriesFiltred[i]

            axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${e.id}`).then(async (resApi) => {
                for (let j = 0; j < 4; j++) {


                    const productApi = resApi.data.results[j]


                    try {
                         const productModel = await product.create({
                            id: productApi.id,
                            title: productApi.title,
                            price: productApi.price,
                            available_quantity: productApi.available_quantity
                        }) 
                        await productModel.save() 
                       
                    } catch (err) {

                        console.log(err.message)
                    }




                }
            })
        }

        /* const categoryModel = await category.create({
            id: 'w', 
          
            name: 2
        })



        categoriesFiltred.forEach

        for (let i = 0; i <= 4 ; i++) {
            const e = categories[0]
            axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${e.id}`).then((resApi) => {
                resApi.data.results[0]
            })
            
        }  */

    })

    //const product = await product.create({ name, email, password } = 

}

syncDB()