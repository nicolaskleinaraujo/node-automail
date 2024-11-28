import { Request, Response } from "express"
import z from "zod"

interface Credential {
    password: string
}

const CredentialSchema = z.object({
    password: z.string().trim().max(150),
})

const forceNewsletter = async(req: Request, res: Response) => {
    try {
        const { password }: Credential = CredentialSchema.parse(req.body)
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default forceNewsletter
