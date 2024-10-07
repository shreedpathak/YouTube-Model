import express from "express"
import dotenv from "dotenv"
import connectdb from './db/db.js'

dotenv.config({
    path: '.env'
})

connectdb();

const app = express()