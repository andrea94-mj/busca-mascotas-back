import mongoose from 'mongoose';
import { mongodbUri } from '../config/config.js';

// Conexión a la base de datos MongoDB
const connectDB = async () =>{
    try{
        await mongoose.connect(mongodbUri);  // Intentamos conectar a MongoDB con la URI configurada
        console.log("MongoDB conectado correctamente");
    }catch (e){
        console.log("Error conexion a MongoBD: ", e.message);  
        process.exit(1);  
    }
}

// Esquemas de MongoDB

// Esquema para los animales encontrados
const encontradoSchema = new mongoose.Schema({
    imagen: { type: String, required: true },  
    tipo_de_animal: { type: String, required: true },  
    raza: { type: String, default: null },  
    color: { type: String, required: true },  
    genero: { type: String, default: null },  
    lugar_encontrado: { type: String, required: true },  
    fecha_encontrado: { type: Date, required: true }, 
    contacto_nombre: { type: String, required: true },  
    contacto_telefono: { type: String, required: true }  
});

// Esquema para los animales perdidos
const perdidoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  
    imagen: { type: String, required: true },  
    tipo_de_animal: { type: String, required: true },  
    raza: { type: String, default: null },  
    color: { type: String, required: true },  
    genero: { type: String, default: null }, 
    lugar_perdido: { type: String, required: true },  
    fecha_perdido: { type: Date, required: true },  
    contacto_nombre: { type: String, required: true },  
    contacto_telefono: { type: String, required: true }  
});

// Esquema para los usuarios
// Esquema para los usuarios
const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    username: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        required: true  
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Solo permite estos dos valores
        default: 'user' // Por defecto, los usuarios son normales, no administradores
    }
},
{
    timestamps: true,  // Genera automáticamente 'createdAt' y 'updatedAt'
    strict: false,  // Permite campos adicionales no definidos en el esquema
    versionKey: false  // Desactiva la versión del documento (__v)
});

// Modelos de Mongoose
export const Encontrado = mongoose.model('Encontrado', encontradoSchema);
export const Perdido = mongoose.model('Perdido', perdidoSchema);
export const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportamos la función para conectar a la base de datos
export { connectDB }




