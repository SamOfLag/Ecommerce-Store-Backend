import { IMailOptions } from "../types/interfaces";
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'


const sendEmail = async (options: IMailOptions) => {
    const auth = {
        api_key: process.env.MAILGUN_API_KEY!,
        domain: process.env.MAILGUN_DOMAIN!
    }

    const transport = nodemailer.createTransport(mg({auth}))

    const message = {
        from: `ecommerce@${process.env.MAILGUN_DOMAIN}`,
        to: options.email,
        text: options.message,
        subject: options.subject
    }

    const info = await transport.sendMail(message)
}

export default sendEmail;