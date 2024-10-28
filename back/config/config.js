import dotenv from 'dotenv'

dotenv.config();

import path from 'path';
export const __dirname = path.resolve();

export const PORT = process.env.PORT || 3000;
export const DOMAIN = process.env.DOMAIN || "http://localhost";

//configuración de MongoDB
export const mongodbUri = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET || "utiliza_esta_clave_segura"