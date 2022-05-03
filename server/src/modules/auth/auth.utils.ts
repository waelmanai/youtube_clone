import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const EXPIRE_IN = process.env.EXPIRE_IN || "7d";

export function signJwt( payload: string | Buffer | object ){
    return jwt.sign(payload, JWT_SECRET,{
        expiresIn: EXPIRE_IN
    });
}

export function verifyJwt(token: string){
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
}