// Modules
import "dotenv/config"
import express, { Application, Request, Response } from "express"
import cors from "cors"
import cron from "node-cron"
import logger from "./config/logging"

// Cron-Job Files
import getNewsletter from "./config/imap"
import formatFile from "./config/formatFile"
import epubParser from "./config/epubParser"
import sendNewsLetter from "./config/sendNewsletter"

// Controllers
import registerEmail from "./controllers/registerEmail"
import deleteEmail from "./controllers/deleteEmail"
import forceNewsletter from "./controllers/forceNewsletter"
import activeUsers from "./controllers/activeUsers"

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
        logger.error(error)
    }
})

app.post("/email", (req: Request, res: Response) => registerEmail(req, res))
app.delete("/email", (req: Request, res: Response) => deleteEmail(req, res))
app.post("/force", (req: Request, res: Response) => forceNewsletter(req, res))
app.get("/users", (req: Request, res: Response) => activeUsers(req, res))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
