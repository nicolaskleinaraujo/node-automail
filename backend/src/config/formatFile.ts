import fs from "node:fs"
import path from "node:path"
import iconv from "iconv-lite"

const formatFile = (): void => {
    try {
        const filePath = path.resolve("../teste.txt")
        const rawFile = fs.readFileSync(filePath)
        let file = iconv.decode(rawFile, "utf-8")

        const nonHTML = /^[\s\S]*?(?=<html>)/
        file = file.replace(nonHTML, "")

        const header = /<b>Para:<\/b>.*?<br>/i
        file = file.replace(header, "")

        const footer = /<a[^>]*>\s*(Cancelar\s*inscrição|Indicar\s*Newsletter)\s*<\/a>\s*\|?/g
        file = file.replace(footer, "")

        const encodedFile = iconv.encode(file, "utf-8")
        fs.writeFileSync(filePath, encodedFile)

        console.log("File formated")
    } catch (error) {
        console.log(error)
    }
}

export default formatFile
