import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"
import cron from "node-cron"

import getNewsletter from "./config/imap"
import formatFile from "./config/formatFile"
import epubParser from "./config/epubParser"
import sendNewsLetter from "./config/sendNewsletter"

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.use(
    cors({
        origin: process.env.ORIGIN_URL,
    })
)

cron.schedule("0 15 * * 1-5", async() => {
    try {
        await getNewsletter()
        formatFile()
        await epubParser()
        await sendNewsLetter()
    } catch (error) {
        console.log("stoped")
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
