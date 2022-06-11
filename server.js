(async () => {
    const database = require('./src/db')
    const Client = require('./src/tables/client')
    await database.sync()
})() 
