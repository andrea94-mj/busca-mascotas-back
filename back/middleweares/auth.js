import { JWT_SECRET } from "../config/config.js";
import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403); //forbidden
        req.user = user;
        // Si la llave es correcta, hacemos un next()
        next()
    })
}