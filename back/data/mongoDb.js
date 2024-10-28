import mongoose from 'mongoose';
import { mongodbUri } from '../config/config.js';

//conexión con la DB

const connectDB = async () =>{
    try{
        await mongoose.connect(mongodbUri);
        console.log("MongoDB conectado correctamente");
    }catch (e){
        console.log("Error conexion a MongoBD: ", e.message);
        process.exit(1);
    }
}


//SCHEMAS

//Encontrados

const encontradoSchema = new mongoose.Schema({
    imagen: { type: String, required: false },
    tipo_de_animal: { type: String, required: true },
    raza: { type: String, default: null },
    color: { type: String, required: true },
    genero: { type: String, default: null },
    lugar_encontrado: { type: String, required: true },
    fecha_encontrado: { type: String, required: true },
    contacto_nombre: { type: String, required: true },
    contacto_telefono: { type: String, required: true }
});

//Perdidos

const perdidoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    imagen: { type: String, required: true },
    tipo_de_animal: { type: String, required: true },
    raza: { type: String, default: null },
    color: { type: String, required: true },
    genero: { type: String, default: null },
    lugar_encontrado: { type: String, required: true },
    fecha_encontrado: { type: String, required: true },
    contacto_nombre: { type: String, required: true },
    contacto_telefono: { type: String, required: true }
});


//Usuarios

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
    }
},
{
    timestamps: true,
    strict: false,
    versionKey: false
})

export const Encontrado = mongoose.model('Encontrado', encontradoSchema);
export const Perdido = mongoose.model('Perdido', perdidoSchema);
export const Usuario = mongoose.model('Usuario', usuarioSchema);




export {connectDB}



