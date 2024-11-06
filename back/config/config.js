import dotenv from 'dotenv'

// Carga las variables de entorno desde el archivo .env
dotenv.config();

import path from 'path';
// Resuelve la ruta absoluta del directorio actual
export const __dirname = path.resolve();

// Puerto del servidor, con un valor por defecto si no está definido en .env
export const PORT = process.env.PORT || 3000;
// Dominio base, con un valor por defecto
export const DOMAIN = process.env.DOMAIN || "http://localhost";

// Configuración de la URI de MongoDB desde las variables de entorno
export const mongodbUri = process.env.MONGODB_URI;

// Clave secreta para JWT, con un valor por defecto en caso de no encontrarla en .env
export const JWT_SECRET = process.env.JWT_SECRET || "utiliza_esta_clave_segura"
