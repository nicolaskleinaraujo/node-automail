import fs from "node:fs"
import path from "node:path"

const formatFile = async() => {
    try {
        const filePath = path.resolve("../teste.txt")
        const file = fs.readFileSync(filePath, "utf8")

        const regex = /(From: [\s\S]*?Subject: [\s\S]*?(\r?\n)+)|Cancelar inscri��o\s*\(\s*https?:\/\/[^\)]+\)\s*\|\s*Indicar Newsletter\s*\(\s*https?:\/\/[^\)]+\)/g

        const newFile = file.replace(regex, '')
        fs.writeFileSync(filePath, newFile)

        console.log("formated")
    } catch (error) {
        console.log(error)
    }
}

export default formatFile
