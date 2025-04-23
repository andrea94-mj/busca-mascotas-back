import { Encontrado } from "../data/mongoDb.js";

// Función para obtener todas las mascotas encontradas
export const getEncontrados = async (req, res, next) => {
    try {
        // Buscamos todos los registros de mascotas encontradas en la base de datos
        const encontrados = await Encontrado.find({});
        
        // Respondemos con la lista de mascotas encontradas
        res.status(200).json({ data: encontrados, message: "" });
    } catch (error) {
        // Pasamos el error al middleware centralizado de manejo de errores
        next(error);
    }
}

// Función para crear un nuevo registro de mascota encontrada
export const crearEncontrado = async (req, res, next) => {
  try {
    // Desestructuramos los datos enviados en el cuerpo de la solicitud
    const {
      tipo_de_animal,
      raza,
      color,
      genero,
      lugar_encontrado,
      fecha_encontrado,
      contacto_nombre,
      contacto_telefono
    } = req.body;

    // Si se sube una imagen, la almacenamos en la propiedad 'imagen'
    const imagen = req.file ? req.file.path : null;

    // Creamos un nuevo documento en la base de datos con los datos de la mascota encontrada
    const nuevoEncontrado = new Encontrado({
      imagen,
      tipo_de_animal,
      raza,
      color,
      genero,
      lugar_encontrado,
      fecha_encontrado,
      contacto_nombre,
      contacto_telefono
    });

    // Guardamos el nuevo registro en la base de datos
    const guardado = await nuevoEncontrado.save();

    // Respondemos con un mensaje de éxito y los datos del registro guardado
    res.status(200).json({
      message: "Registro de mascota encontrada guardado con éxito.",
      data: guardado
    });
  } catch (error) {
    // Pasamos el error al middleware centralizado de manejo de errores
    next(error);
  }
};


