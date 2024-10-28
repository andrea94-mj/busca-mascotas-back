import { Usuario } from '../data/mongoDb.js';
// Hash y JWT
import bcrypt from 'bcrypt' // Hacer hash a nuestros pass
import jwt from 'jsonwebtoken' // Crear y leer token
import { JWT_SECRET, __dirname } from '../config/config.js';



export const authLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const userCreated = await Usuario.findOne({ username: username });
    
        if (!userCreated) {
            return res.status(400).json({message: "Usuario no encontrado"})
        }
    
        const isMatch = await bcrypt.compare(password, userCreated.password)
    
        if (!isMatch) {
            return res.status(400).json({message: "Clave incorrecta"})
        }
    
        // Crear jwt y devuelvo el usuario
        // create and sign a new token(contenido purpura, llave privada, opciones(cuado expira))
        const token = jwt.sign({username:username}, JWT_SECRET, {expiresIn: '1h'});
    
        res.status(200).json({data: userCreated, message: "Correcto login", token})
        } catch (error) {
            res.status(500).json({error: "Error en el servidor"})
        }
    }

    export const createRegister =  async (req, res, next) => {
        try {
            const {name, username, password, image='https://picsum.photos/200'} = req.body;
            // Hash de contraseña con bcrypt(importante el orden)
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new Usuario({name, username, password:hashedPassword, image:"https://picsum.photos/200"});
            await newUser.save();
    
            // Obtener el usuario recien creado
            const userCreated = await Usuario.findOne({username : username});
    
            res.status(200).json({data: userCreated, message: "Registro exitoso"})
    
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message})
        }
    }