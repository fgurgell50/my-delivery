import express  from "express";
import carRouter from "./routes/cars.js"
import { promises as fs } from "fs"
import winston from "winston"
import cors from "cors"

// npx nodemon index.js

const { readFile, writeFile } = fs

global.fileName = "car-list.json"

const { label, combine, timestamp, printf } = winston.format
const myFormat = printf(({ label, level, timestamp, message  }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new ( winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-cars-api.log" })
    ],
    format: combine(
        label({ label: "my-car-api"  }),
        timestamp(),
        myFormat
    )
})

const app = express()
app.use(express.json())
app.use(cors())

//app.use( "/account", accountRouter )
app.use("/car", carRouter)

app.listen(3000, async () => {
    try {
        await readFile(global.fileName)
        //console.log("API Started!")
        logger.info("API Started !")
    } catch (err) {
        logger.error(err)
    } 
})