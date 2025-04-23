import { Perdido } from "../data/mongoDb.js";

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
