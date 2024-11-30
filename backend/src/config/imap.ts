import "dotenv/config"
import Imap, { Config } from "imap"
import { simpleParser } from "mailparser"
import fs from "node:fs"

const imapConfig: Config = {
    user: process.env.IMAP_EMAIL as string,
    password: process.env.IMAP_PASSWORD as string,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
}

const imap = new Imap(imapConfig)

const connectToImap = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.once("ready", resolve)
        imap.once("error", reject)
        imap.connect()
    })
}

const openInbox = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.openBox("inbox", false, (err) => {
            if (err) {
                reject("Inbox oppening error")
                return
            }

            resolve()
        })
    })
}

const searchEmail = (filter: string[][]): Promise<number> => {
    return new Promise((resolve, reject) => {
        imap.search(filter, (err, results) => {
            if (err) {
                reject("Search error")
                return
            }

            if (!results || results.length === 0) {
                reject("Email not found")
                return
            }

            resolve(Math.max(...results))
        })
    })
}

const fetchEmail = (seqno: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fetch = imap.fetch(seqno, { bodies: ["TEXT"], struct: true })

        let emailData = ""

        fetch.on("message", (msg) => {
            msg.on("body", (stream) => {
                stream.on("data", (chunk) => {
                    emailData += chunk.toString()
                })

                stream.once("end", () => resolve(emailData))
            })
        })

        fetch.once("error", () => reject("Fetch error"))
    })
}

const addDeleteFlag = (seqno: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.addFlags(seqno, "\\Deleted", (err) => {
            if (err) {
                reject("Add flag error")
                return
            }

            resolve()
        })
    })
}

const expungeEmail = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        imap.expunge((err) => {
            if (err) {
                reject("Delete email error")
                return
            }

            resolve()
        })
    })
}

const getNewsletter = async(): Promise<void> => {
    await connectToImap()
    await openInbox()

    const filter = [["FROM", "newsletter@filipedeschamps.com.br"]]
    const seqno = await searchEmail(filter)

    const emailData = await fetchEmail(seqno)

    const parsed = await simpleParser(emailData)
    fs.writeFileSync("./src/newsletters/newsletter.txt", parsed.text as string)

    await addDeleteFlag(seqno)
    await expungeEmail()

    imap.end()
}

export default getNewsletter
