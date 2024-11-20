import { Request, Response } from "express"
import prisma from "../config/prisma"
import z from "zod"

interface Email {
    email: string
}

const EmailSchema = z.object({
    email: z.string().email().trim().max(150),
})

const deleteEmail = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email }: Email = EmailSchema.parse(req. body)

        const emailExists = await prisma.email.findUnique({ where: { email } })
        if (!emailExists) {
            res.status(404).json({ msg: "Email não encontrado" })
            return
        }

        await prisma.email.delete({ where: { email } })

        res.status(200).json({ msg: "Email deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default deleteEmail
