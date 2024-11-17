import "dotenv/config"
import Imap, { Config } from "imap"
import { simpleParser } from "mailparser"

const getNewsletter = async() => {
    const imapConfig: Config = {
        user: process.env.IMAP_EMAIL as string,
        password: process.env.IMAP_PASSWORD as string,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
    }
    
    const imap = new Imap(imapConfig)

    try {
        imap.once("ready", () => {
            imap.openBox("inbox", false, (err, box) => {
                if (err) {
                    console.log(err)
                    return
                }

                const filter = [["FROM", "newsletter@filipedeschamps.com.br"]]
    
                imap.search(filter, (err, results) => {
                    if (err) {
                        console.log(err)
                        return
                    }

                    if (!results || results.length === 0) {
                        console.log("Nenhum email encontrado")
                        return
                    }

                    const fetch = imap.fetch(results, { bodies: ["TEXT"], struct: true })

                    fetch.on("message", (msg) => {
                        msg.on("body", (stream) => {
                            let emailData = ""

                            stream.on("data", (chunk) => {
                                emailData += chunk.toString()
                            })

                            stream.once("end", () => {
                                simpleParser(emailData, (err, parsed) => {
                                    if (err) {
                                        console.log(err)
                                        return
                                    }

                                    console.log(parsed.subject)
                                    console.log(parsed.date)
                                    console.log(parsed.text)
                                })
                            })
                        })
                    })

                    fetch.once("end", () => {
                        console.log("Finished")
                        imap.end()
                    })
                })
            })
        })

        imap.connect()
    } catch (error) {
        console.log(error)
    }
}

export default getNewsletter
