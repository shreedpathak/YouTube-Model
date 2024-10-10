import dotenv from "dotenv"
import connectdb from './db/db.js'
import app from './app.js'
import { urlencoded } from "express"
import cookieParser from "cookie-parser"

dotenv.config({
    path: '.env'
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(urlencoded({extended: true}))
app.use(cookieParser())

connectdb().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is listening at PORT: ${process.env.PORT}`)
    })
}).catch((error) =>{
    console.log(`Mongo DB connection is failed:`, error)
})