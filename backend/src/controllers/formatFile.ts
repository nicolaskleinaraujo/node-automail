import fs from "node:fs"
import path from "node:path"
import iconv from "iconv-lite"

const formatFile = async() => {
    try {
        const filePath = path.resolve("../teste.txt")
        const rawFile = fs.readFileSync(filePath)
        let file = iconv.decode(rawFile, "windows-1252")

        const regex = /(From: [\s\S]*?Subject: [\s\S]*?(\r?\n)+)|Cancelar inscrição\s*\(\s*https?:\/\/[^\)]+\)\s*\|\s*Indicar Newsletter\s*\(\s*https?:\/\/[^\)]+\)|^-{50,}\s*$/gm
        file = file.replace(regex, '')

        file = file.replace(
            /([^\s]+)\s*\(\s*(https?:\/\/[^\s\)]+)\s*\)/g,
            (match, text, url) => `<a href="${url}" target="_blank" style="text-decoration: underline;">${text}</a>`
        )

        file = file.trim().split(/\r?\n\s*\r?\n/).map(paragraph => `<p>${paragraph.trim()}</p>`).join("\n\n")

        const encodedFile = iconv.encode(file, "utf-8")
        fs.writeFileSync(filePath, encodedFile)

        console.log("formated")
    } catch (error) {
        console.log(error)
    }
}

export default formatFile
