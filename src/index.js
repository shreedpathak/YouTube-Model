import dotenv from "dotenv"
import connectdb from './db/db.js'
import app from './app.js'

dotenv.config({
    path: '.env'
})

connectdb().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is listening at PORT: ${process.env.PORT}`)
    })
}).catch((error) =>{
    console.log(`Mongo DB connection is failed:`, error)
})