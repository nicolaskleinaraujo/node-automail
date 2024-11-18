import "dotenv/config"
import { Resend } from "resend"
import path from "node:path"
import fs from "node:fs"

const resend = new Resend(process.env.RESEND_KEY)

const sendNewsLetter = async() => {
    const date = new Date()

    const filePath: string = path.resolve("../teste.epub")
    const attachment = fs.readFileSync(filePath).toString("base64")

    const { data, error } = await resend.emails.send({
        from: "contatonkfa@nkportfolio.tech",
        to: [process.env.EMAIL_TO as string],
        subject: "Convert",
        text: "Newsletter do dia",
        attachments: [
            {
                content: attachment,
                contentType: "application/epub+zip",
                filename: `Newsletter ${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getFullYear()).slice(2)}.epub`
            }
        ]
    })

    console.log(data)
    console.log(error)
}