import fs from "node:fs"
import path from "node:path"
import iconv from "iconv-lite"

const formatFile = async() => {
    try {
        const filePath = path.resolve("../teste.txt")
        const rawFile = fs.readFileSync(filePath)
        let file = iconv.decode(rawFile, "windows-1252")

        file = file.replace(
            /(https?:\/\/[^\s]+)/g,
            (match) => `[${match.match(/(?:www\.|)(\w+\.\w+)/)?.[0]}](${match})`
        )

        const regex = /(From: [\s\S]*?Subject: [\s\S]*?(\r?\n)+)|Cancelar inscri��o\s*\(\s*https?:\/\/[^\)]+\)\s*\|\s*Indicar Newsletter\s*\(\s*https?:\/\/[^\)]+\)/g

        file = file.replace(regex, '')

        const encodedFile = iconv.encode(file, "utf-8")
        fs.writeFileSync(filePath, encodedFile)

        console.log("formated")
    } catch (error) {
        console.log(error)
    }
}

export default formatFile
