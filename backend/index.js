import express  from "express";
import deliveryRouter from "./routes/delivery.routes.js"
import { promises as fs } from "fs"
import winston from "winston"
import cors from "cors"

import AccountService from "./services/delivery.service.js";
import { create } from "domain";

// npx nodemon index.js

const { readFile, writeFile } = fs

global.fileName = "pedidos.json"

const { label, combine, timestamp, printf } = winston.format
const myFormat = printf(({ label, level, timestamp, message  }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new ( winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-delivery.log" })
    ],
    format: combine(
        label({ label: "my-delivery-api" }),
        timestamp(),
        myFormat
    )
})

const app = express()
app.use(express.json())
app.use(cors())

app.use( "/delivery", deliveryRouter )

app.listen(3000, async () => {
    try {
        await readFile(global.fileName)
        //console.log("API Started!")
        logger.info("API Started !")
    } catch (err) {
        logger.error(err)
    } 
})