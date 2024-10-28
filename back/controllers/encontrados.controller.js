import { Encontrado } from "../data/mongoDb.js";


export const getEncontrados = async (req,res,next)=>{
    try {
        const encontrados = await Encontrado.find({})
        res.status(200).json({ data: encontrados, message: "" });
    } catch (error) {
        res.status(500).json({ message: '', error });
    }
}

export const crearEncontrado = async (req, res, next) => {
  try {
    const {
      imagen,
      tipo_de_animal,
      raza,
      color,
      genero,
      lugar_encontrado,
      fecha_encontrado,
      contacto_nombre,
      contacto_telefono
    } = req.body;

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

    const guardado = await nuevoEncontrado.save();
    
    res.status(200).json({
      message: "Registro de mascota encontrado guardado con éxito.",
      data: guardado
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al guardar el registro de mascota encontrada.",
      error: error.message
    });
  }
};
