import { Usuario } from '../data/mongoDb.js';
// Hash y JWT
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import { JWT_SECRET, __dirname } from '../config/config.js';

// Función para autenticar el login de un usuario
export const authLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const userCreated = await Usuario.findOne({ username: username });
    
        if (!userCreated) {
            return res.status(400).json({message: "Usuario no encontrado"});
        }
    
        const isMatch = await bcrypt.compare(password, userCreated.password);
    
        if (!isMatch) {
            return res.status(400).json({message: "Clave incorrecta"});
        }
    
        // Crear token incluyendo ID y role
        const token = jwt.sign(
            {
                id: userCreated._id,
                username: username,
                role: userCreated.role
            }, 
            JWT_SECRET, 
            {expiresIn: '1h'}
        );
    
        res.status(200).json({
            data: userCreated, 
            message: "Correcto login", 
            token
        });
    } catch (error) {
        next(error);
    }
};

// Función para registrar un nuevo usuario
export const createRegister = async (req, res, next) => {
    try {
        const {name, username, password, image='https://picsum.photos/200', role='user'} = req.body;
        
        // Verificar que el role sea válido (user o admin)
        if (role !== 'user' && role !== 'admin') {
            return res.status(400).json({ message: "El rol debe ser 'user' o 'admin'" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new Usuario({name, username, password:hashedPassword, image, role});
        await newUser.save();
        
        const userCreated = await Usuario.findOne({username: username});
    
        res.status(200).json({data: userCreated, message: "Registro exitoso"});
    
    } catch (error) {
        next(error);
    }
};


// Obtener todos los usuarios (solo para administradores)
export const getAllUsers = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find({}, '-password'); // Excluimos las contraseñas
        
        res.status(200).json({
            data: usuarios,
            message: "Lista de usuarios obtenida con éxito"
        });
    } catch (error) {
        next(error);
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findById(id, '-password');
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.status(200).json({
            data: usuario,
            message: "Usuario encontrado con éxito"
        });
    } catch (error) {
        next(error);
    }
};

// Hacer administrador a un usuario
export const makeAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { role: 'admin' },
            { new: true, select: '-password' }
        );
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.status(200).json({
            data: usuario,
            message: "Usuario actualizado a administrador con éxito"
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const usuario = await Usuario.findByIdAndDelete(id);
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.status(200).json({
            message: "Usuario eliminado con éxito"
        });
    } catch (error) {
        next(error);
    }
};

