import path from "node:path"
import fs from "node:fs"
import iconv from "iconv-lite"
import Epub, { Options } from "epub-gen"

const epubParser = async() => {
    try {
        const txtFilePath = path.resolve("../teste.txt")
        const tocTemplatePath = path.resolve("./src/templates/toc.xhtml")

        const rawText = fs.readFileSync(txtFilePath)
        const decodedText = iconv.decode(rawText, "utf-8")
    
        const options: Options = {
            title: "Newsletter",
            author: "Filipe Deschamps",
            content: [
                {
                    data: decodedText,
                    beforeToc: true,
                    excludeFromToc: true,
                }
            ],
            lang: "pt",
            verbose: false,
            customHtmlTocTemplatePath: tocTemplatePath,
        }

        new Epub(options, "../teste.epub").promise.then(() => {
            console.log("Parsed")
        })
    } catch (error) {
        console.log(error)
    }
}

export default epubParser
