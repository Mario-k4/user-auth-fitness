import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET!, {
        expiresIn: "15m"
    });
}

export const generateRefreshToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role: role }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "7d"
    });
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
}

export const decodeToken = (token: string) => {
    return jwt.decode(token);
}
