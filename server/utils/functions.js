import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export function genrateToken(user){
    const payload={
        username:user.username,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token
}