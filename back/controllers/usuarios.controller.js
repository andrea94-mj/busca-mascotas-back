import { Usuario } from '../data/mongoDb.js';
// Hash y JWT
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import { JWT_SECRET, __dirname } from '../config/config.js';

// Función para autenticar el login de un usuario
export const authLogin = async (req, res, next) => {
    try {
        // Desestructuramos el usuario y la contraseña del cuerpo de la solicitud
        const {username, password} = req.body;

        // Buscamos el usuario en la base de datos
        const userCreated = await Usuario.findOne({ username: username });
    
        // Si no encontramos el usuario, respondemos con un error
        if (!userCreated) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
    
        // Comparamos la contraseña proporcionada con la guardada en la base de datos
        const isMatch = await bcrypt.compare(password, userCreated.password);
    
        // Si las contraseñas no coinciden, respondemos con un error
        if (!isMatch) {
            return res.status(400).json({message: "Clave incorrecta"});
        }
    
        // Creamos un token JWT con el nombre de usuario, que expira en 1 hora
        const token = jwt.sign({username:username}, JWT_SECRET, {expiresIn: '1h'});
    
        // Respondemos con el usuario, el mensaje de éxito y el token
        res.status(200).json({data: userCreated, message: "Correcto login", token});
    } catch (error) {
        // Pasamos el error al middleware centralizado de manejo de errores
        next(error);
    }
};

// Función para registrar un nuevo usuario
export const createRegister = async (req, res, next) => {
    try {
        // Desestructuramos la información del nuevo usuario del cuerpo de la solicitud
        const {name, username, password, image='https://picsum.photos/200'} = req.body;

        // Creamos un hash de la contraseña con bcrypt para mayor seguridad
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Creamos un nuevo usuario con la información proporcionada
        const newUser = new Usuario({name, username, password:hashedPassword, image});
        await newUser.save();  // Guardamos el usuario en la base de datos
    
        // Buscamos el usuario recién creado
        const userCreated = await Usuario.findOne({username: username});
    
        // Respondemos con los datos del nuevo usuario y un mensaje de éxito
        res.status(200).json({data: userCreated, message: "Registro exitoso"});
    
    } catch (error) {
        // Pasamos el error al middleware centralizado de manejo de errores
        next(error);
    }
};
