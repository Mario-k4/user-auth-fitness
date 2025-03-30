import crypto from 'crypto';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { User } from '../user/entities/user.entity';
import { sendMail } from './email';

export function generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
}

export const enableAppAuth = async (user: User) => {
    const secret = speakeasy.generateSecret({
        name: 'Fitness App',
        length: 20,
    });

    if (!secret.otpauth_url) {
        throw new Error('Error generating secret');
    }

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    user.secretKey = secret.base32;
    user.twoFactorMethod = 'app';
    user.twoFactorEnabled = false;
    await user.save();

    return {
        message: "Scan this QR code with your authenticator app",
        qrCode: qrCodeDataURL,
        secret: secret.base32,
        method: 'app',
    };
};

export const enableEmailAuth = async (user: User) => {
    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    user.twoFactorMethod = 'email';
    user.twoFactorEnabled = false;
    await user.save();

    await sendMail({
        to: user.email,
        subject: 'Two-factor authentication',
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    return { message: "OTP sent to your email" };
};

export const verifyAppAuth = async (user: User, otp: string) => {
    if (!user.secretKey) {
        throw new Error('2FA not set up');
    }

    const verified = speakeasy.totp.verify({
        secret: user.secretKey,
        encoding: 'base32',
        token: otp,
    });

    if (!verified) {
        throw new Error('Invalid OTP');
    }

    user.twoFactorEnabled = true;
    await user.save();

    return { message: "Two-factor authentication enabled successfully" };
};

export const verifyEmailAuth = async (user: User, otp: string) => {
    if (!user.otp || !user.otpExpiresAt) {
        throw new Error('OTP not found');
    }
    if (new Date() > user.otpExpiresAt) {
        throw new Error('OTP expired');
    }
    if (user.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    user.twoFactorEnabled = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return { message: "Two-factor authentication enabled successfully" };
};
