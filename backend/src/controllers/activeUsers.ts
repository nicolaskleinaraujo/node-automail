import { Request, Response } from "express"
import logger from "../config/logging"
import prisma from "../config/prisma"

const activeUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.email.count()
        res.status(200).json({ users })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default activeUsers
