import fs from "node:fs"
import path from "node:path"
import iconv from "iconv-lite"

const formatFile = async() => {
    try {
        const filePath = path.resolve("../teste.txt")
        const rawFile = fs.readFileSync(filePath)
        let file = iconv.decode(rawFile, "utf-8")

        const headerRegex = /(?:^[-_]+[\r\n]+|^De:.*?[\r\n]+Enviado:.*?[\r\n]+Para:.*?[\r\n]+Assunto:.*?[\r\n]+)/gm
        file = file.replace(headerRegex, "")

        const footerRegex = /Cancelar inscrição[\s\S]*$/gm
        file = file.replace(footerRegex, "")

        file = file.replace(
            /([^\s<]+)<(https?:\/\/[^\s>]+)>/g,
            (_match, text, url) => `<a href="${url}" target="_blank" style="text-decoration: underline;">${text}</a>`
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
