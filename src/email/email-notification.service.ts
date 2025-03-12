import { sendMail } from "../utils/email";

export class EmailService {

    async sendWelcomeEmail(email: string): Promise<void> {
        await sendMail({
            to: email,
            subject: 'Welcome to our platform',
            text: 'Welcome to our platform',
            html: '<p>Welcome to our platform</p>'
        })
    }

    async sendPasswordResetEmail(email: string, link: string): Promise<void> {
        await sendMail({
            to: email,
            subject: 'Password Reset',
            text: 'You requested a password reset',
            html: `<a href="${link}">Click here to reset your password</a>`
        })
    }

    async sendPasswordChangedEmail(email: string): Promise<void> {
        await sendMail({
            to: email,
            subject: 'Password Changed',
            text: 'Your password has been changed',
            html: '<p>Your password has been changed</p>'
        })
    }
}
