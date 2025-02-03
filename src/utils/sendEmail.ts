import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { IMailOptions } from "../types_/interfaces";

const sendEmail = async (options: IMailOptions) => {
    const auth = {
        api_key: process.env.MAILGUN_API_KEY!,
        domain: process.env.MAILGUN_DOMAIN!
    };

    const transport = nodemailer.createTransport(mg({ auth }));

    const message = {
        from: `ecommerce@${process.env.MAILGUN_DOMAIN}`,
        to: options.email,
        html: options.message, // Use the HTML message passed from the signup function
        subject: options.subject
    };

    try {
        const info = await transport.sendMail(message);
        console.log('Email sent:', info);
        return info;
    } catch (error: any) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;