import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendMail = async (mailOptionsParameters: {
    from?: string,
    to: string,
    subject: string,
    text: string,
    html: string
}): Promise<void> => {
    const mailOptions = {
        from: mailOptionsParameters.from || process.env.EMAIL_USER,
        to: mailOptionsParameters.to,
        subject: mailOptionsParameters.subject,
        text: mailOptionsParameters.text,
        html: mailOptionsParameters.html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};