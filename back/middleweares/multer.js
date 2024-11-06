import multer from "multer";
import path from 'path';

// Configuración de Multer para la subida de archivos
export const storage = multer.diskStorage({
    // Definimos el destino donde se guardarán los archivos
    destination: function (req, file, cb) {
        // 'public/uploads/' es la carpeta donde se guardarán los archivos subidos
        cb(null, 'public/uploads/')
    },
    // Definición del nombre del archivo guardado
    filename: function (req, file, cb) {
        // Obtenemos la extensión original del archivo (ej. .png, .jpg)
        const extension = path.extname(file.originalname)
        
        const uniqueSuffix = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        
        // Ejemplo de nombre final del archivo: "avatar-unixTimeStamp-655466764.png"
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
    }
});

// Creamos el middleware de multer utilizando la configuración de almacenamiento
export const upload = multer({storage:storage});
