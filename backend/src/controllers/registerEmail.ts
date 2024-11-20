import { Request, Response } from "express"
import prisma from "../config/prisma"
import z from "zod"

interface Email {
    email: string
}

const EmailSchema = z.object({
    email: z.string().email().trim().max(150),
})

const registerEmail = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email }: Email = EmailSchema.parse(req.body)

        const emailExists = await prisma.email.findUnique({ where: { email } })
        if (emailExists) {
            res.status(400).json({ msg: "Email já cadastrado" })
            return
        }

        await prisma.email.create({ data: { email } })

        res.status(201).json({ msg: "Email cadastrado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default registerEmail
