import { Perdido } from "../data/mongoDb.js";


export const getPerdidos = async (req,res,next) =>{
    try{
        const perdidos = await Perdido.find({})
        res.status(200).json({ data: perdidos, message: "" });
    }catch (error) {
        res.status(500).json({ message: "", error});
    }
}

export const crearPerdido = async (req, res, next) => {
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
  
      const nuevoPerdido = new Perdido({
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
  
      const guardado = await nuevoPerdido.save();
      
      res.status(200).json({
        message: "Registro de mascota perdida guardado con éxito.",
        data: guardado
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al guardar el registro de mascota perdida.",
        error: error.message
      });
    }
  };