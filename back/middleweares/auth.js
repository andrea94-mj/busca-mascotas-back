import { JWT_SECRET } from "../config/config.js";
import jwt from 'jsonwebtoken'

// Middleware para autenticar el token JWT
export const authenticateToken = (req, res, next) => {

    // Obtener el encabezado de autorización de la solicitud
    const authHeader = req.headers['authorization'];

    // Extraer el token del encabezado, asumiendo que es del tipo 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];

    // Si no hay token, respondemos con un error 401 (No autorizado)
    if(!token) return res.sendStatus(401);

    // Verificar el token usando el JWT_SECRET, si es válido, se pasa el siguiente middleware
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403); // Si el token es inválido o expiró, respondemos con 403 
        
        // Si el token es válido, agregamos la información del usuario al objeto de la solicitud
        req.user = user;

        // Si todo está bien, se llama al siguiente middleware o ruta
        next();
    });
}


