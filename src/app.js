const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.user_email,
        pass: process.env.pass_email,
    }
})

transport.sendMail({
    from: `Nicolas Klein <${process.env.user_email}>`,
    subject: "Convert",
    to: process.env.send_email,
    attachments: [{
        filename: "Filipe Newsletter 06/01/24",
        content: "teste.txt"
    }]
})
.then((res) => console.log('Email enviado com sucesso'))
.catch((err) => console.log(err))
