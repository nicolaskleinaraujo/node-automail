import fs from "node:fs"
import path from "node:path"
import iconv from "iconv-lite"

const formatFile = (): void => {
    try {
        const filePath: string = path.resolve("./src/newsletters/newsletter.txt")
        const rawFile: Buffer = fs.readFileSync(filePath)
        let file: string = iconv.decode(rawFile, "utf-8")

        const nonHTML: RegExp = /^[\s\S]*?(?=<html>)/
        file = file.replace(nonHTML, "")

        const header: RegExp = /<b>Para:<\/b>.*?<br>/i
        file = file.replace(header, "")

        const footer: RegExp = /<a[^>]*>\s*(Cancelar\s*inscrição|Indicar\s*Newsletter)\s*<\/a>\s*\|?/g
        file = file.replace(footer, "")

        const encodedFile: Buffer = iconv.encode(file, "utf-8")
        fs.writeFileSync(filePath, encodedFile)
    } catch (error) {
        console.log(error)
    }
}

export default formatFile
