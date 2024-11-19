import path from "node:path"
import fs from "node:fs"
import iconv from "iconv-lite"
import Epub, { Options } from "epub-gen"

const epubParser = async() => {
    try {
        const txtFilePath: string = path.resolve("./src/newsletters/newsletter.txt")
        const tocTemplatePath: string = path.resolve("./src/templates/toc.xhtml")

        const rawText: Buffer = fs.readFileSync(txtFilePath)
        const decodedText: string = iconv.decode(rawText, "utf-8")
    
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
            verbose: false,
            lang: "pt",
            customHtmlTocTemplatePath: tocTemplatePath,
        }

        await new Epub(options, "./src/newsletters/newsletter.epub").promise
    } catch (error) {
        console.log(error)
    }
}

export default epubParser
