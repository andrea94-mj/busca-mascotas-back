import jwt from 'jsonwebtoken';
import { Usuario } from '../data/mongoDb.js';

export const adminMiddleware = async (req, res, next) => {
    try {
        // Verificar si existe un token en los headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Acceso denegado. No se proporcionó token de autenticación.' 
            });
        }
        
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findById(decoded.id);
        
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no válido.' });
        }
        
        // Verificar si el usuario es administrador (esto depende de tu modelo de usuario)
        // Si tienes un campo "rol" o similar, puedes verificarlo aquí
        // Por ejemplo:
        // if (usuario.rol !== 'admin') {
        //     return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
        // }
        
        // Añadir el usuario al objeto de solicitud para su uso posterior
        req.usuario = usuario;
        
        // Continuar con la siguiente función en la cadena
        next();
        
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }
        
        next(error);
    }
};