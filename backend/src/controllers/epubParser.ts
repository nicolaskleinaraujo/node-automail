import path from "node:path"
import fs from "node:fs"
import Epub, { Options } from "epub-gen"

const epubParser = async() => {
    const txtFilePath = path.resolve("../teste.txt")
    const epubFilePath = path.resolve("../teste.epub")
    
    const content = fs.readFileSync(txtFilePath, "utf8")

    const options: Options = {
        title: "Newsletter",
        author: "Filipe Deschamps",
        content: [
            {
                title: "Capitulo 1",
                data: content
            }
        ]
    }

    try {
        new Epub(options, epubFilePath)
        console.log("Parsed")
    } catch (error) {
        console.log(error)
    }
}

export default epubParser
