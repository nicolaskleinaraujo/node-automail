// Modules
import "dotenv/config"
import express, { Application, Request, Response } from "express"
import cors from "cors"
import cron from "node-cron"

// Cron-Job Files
import getNewsletter from "./config/imap"
import formatFile from "./config/formatFile"
import epubParser from "./config/epubParser"
import sendNewsLetter from "./config/sendNewsletter"

// Controllers
import registerEmail from "./controllers/registerEmail"
import deleteEmail from "./controllers/deleteEmail"

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.use(express.json())
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

app.post("/email", (req: Request, res: Response) => registerEmail(req, res))
app.delete("/email", (req: Request, res: Response) => deleteEmail(req, res))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
