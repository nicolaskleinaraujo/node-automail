import "dotenv/config"
import { Request, Response } from "express"
import z from "zod"
import getNewsletter from "../config/imap"
import formatFile from "../config/formatFile"
import epubParser from "../config/epubParser"
import sendNewsLetter from "../config/sendNewsletter"

interface Credential {
    password: string
}

const CredentialSchema = z.object({
    password: z.string().trim().max(150),
})

const forceNewsletter = async(req: Request, res: Response): Promise<void> => {
    try {
        const { password }: Credential = CredentialSchema.parse(req.body)

        const serverPassword = process.env.SERVER_PASSWORD

        if (password !== serverPassword) {
            res.status(401).json({ msg: "Senha incorreta" })
            return
        }

        await getNewsletter()
        formatFile()
        await epubParser()
        await sendNewsLetter()

        res.status(200).json({ msg: "Newsletter enviada" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default forceNewsletter
