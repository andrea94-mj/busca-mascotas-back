import { Perdido } from "../data/mongoDb.js";
import fs from 'fs';
import path from 'path';

// Función para obtener todas las mascotas perdidas
export const getPerdidos = async (req, res, next) => {
    try {
        // Buscamos todos los registros de mascotas perdidas en la base de datos
        const perdidos = await Perdido.find({});
        
        // Respondemos con la lista de mascotas perdidas encontradas
        res.status(200).json({ data: perdidos, message: "" });
    } catch (error) {
        // Pasamos el error al middleware centralizado de manejo de errores
        next(error);
    }
}

// Función para obtener una mascota perdida por ID
export const getPerdidoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Buscamos la mascota en la base de datos por su ID
        const perdido = await Perdido.findById(id);
        
        if (!perdido) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        
        // Respondemos con los datos de la mascota
        res.status(200).json({ data: perdido, message: "" });
    } catch (error) {
        next(error);
    }
}

// Función para crear un nuevo registro de mascota perdida
export const crearPerdido = async (req, res, next) => {
    try {
        // Desestructuramos los datos enviados en el cuerpo de la solicitud
        const {
            nombre,
            tipo_de_animal,
            raza,
            color,
            genero,
            lugar_perdido,
            fecha_perdido,
            contacto_nombre,
            contacto_telefono
        } = req.body;

        // Si se sube una imagen, la almacenamos en la propiedad 'imagen'
        const imagen = req.file ? req.file.path : null;
    
        // Creamos un nuevo documento en la base de datos con los datos de la mascota perdida
        const nuevoPerdido = new Perdido({
            imagen,
            nombre,
            tipo_de_animal,
            raza,
            color,
            genero,
            lugar_perdido,
            fecha_perdido,
            contacto_nombre,
            contacto_telefono
        });
    
        // Guardamos el nuevo registro en la base de datos
        const guardado = await nuevoPerdido.save();
        
        // Respondemos con un mensaje de éxito y los datos del registro guardado
        res.status(200).json({
            message: "Registro de mascota perdida guardado con éxito.",
            data: guardado
        });
    } catch (error) {
        // Pasamos el error al middleware centralizado de manejo de errores
        next(error);
    }
};

// Función para actualizar una mascota perdida
export const actualizarPerdido = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Buscamos la mascota existente
        const mascotaExistente = await Perdido.findById(id);
        
        if (!mascotaExistente) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        
        // Extraemos los datos del cuerpo de la solicitud
        const {
            nombre,
            tipo_de_animal,
            raza,
            color,
            genero,
            lugar_perdido,
            fecha_perdido,
            contacto_nombre,
            contacto_telefono
        } = req.body;
        
        // Creamos el objeto con los datos actualizados
        const datosActualizados = {
            nombre,
            tipo_de_animal,
            raza,
            color,
            genero,
            lugar_perdido,
            fecha_perdido,
            contacto_nombre,
            contacto_telefono
        };
        
        // Si hay una nueva imagen, la procesamos
        if (req.file) {
            // Si ya hay una imagen, la eliminamos
            if (mascotaExistente.imagen) {
                try {
                    fs.unlinkSync(mascotaExistente.imagen);
                } catch (error) {
                    console.error("Error al eliminar la imagen anterior:", error);
                }
            }
            
            // Añadimos la nueva ruta de imagen
            datosActualizados.imagen = req.file.path;
        }
        
        // Actualizamos el documento en la base de datos
        const mascotaActualizada = await Perdido.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true } // Para devolver el documento actualizado
        );
        
        res.status(200).json({
            message: "Mascota actualizada correctamente",
            data: mascotaActualizada
        });
        
    } catch (error) {
        next(error);
    }
};

// Función para eliminar una mascota perdida
export const eliminarPerdido = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Buscamos la mascota a eliminar
        const mascota = await Perdido.findById(id);
        
        if (!mascota) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        
        // Si la mascota tiene una imagen, la eliminamos del sistema de archivos
        if (mascota.imagen) {
            try {
                fs.unlinkSync(mascota.imagen);
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
            }
        }
        
        // Eliminamos el documento de la base de datos
        await Perdido.findByIdAndDelete(id);
        
        res.status(200).json({
            message: "Mascota eliminada correctamente"
        });
        
    } catch (error) {
        next(error);
    }
};