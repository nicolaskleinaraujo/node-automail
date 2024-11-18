import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

app.use(
    cors({
        origin: process.env.ORIGIN_URL,
    })
)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
