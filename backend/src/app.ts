import "dotenv/config"
import { Resend } from "resend"
import path from "node:path"
import fs from "node:fs"

const resend = new Resend(process.env.RESEND_KEY)

const sendNewsLetter = async() => {
    const email: string | undefined = process.env.EMAIL_TO

    const filePath: string = path.resolve("../teste.txt")
    const attachment = fs.readFileSync(filePath).toString("base64")

    if (email !== undefined) {
        const { data, error } = await resend.emails.send({
            from: "contatonkfa@nkportfolio.tech",
            to: [email],
            subject: "Convert",
            text: "",
            attachments: [
                {
                    content: attachment,
                    filename: `Newsletter ${Date.now()}.epub`
                }
            ]
        })

        console.log(data)
        console.log(error)
    }
}

sendNewsLetter()
