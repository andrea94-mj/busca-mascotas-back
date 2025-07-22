import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/mongodb.routes.js';
import { PORT, DOMAIN } from './config/config.js';
import { connectDB } from './data/mongoDb.js';
import path from 'path';
import { upload } from './middleweares/multer.js';
import { __dirname } from './config/config.js';
import { errorHandler } from './middleweares/error.js'; 

const app = express();

// Conectar a la base de datos
connectDB();

// Definir carpeta para archivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Habilitar CORS para permitir peticiones 
// app.use(cors());
app.use(cors({
    origin: [
      'http://localhost:5173/', // desarrollo Vite
      'http://localhost:3000/', // desarrollo adicional
      'https://proyecto-final-fullstack-front-gsze.vercel.app' // producción
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Habilitar JSON en las solicitudes
app.use(express.json());

// Habilitar formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// Rutas principales de la API
app.use('/api/v1', indexRoutes);

// Ruta archivos subidos (imagenes, etc.)
app.use('/uploads', express.static('public/uploads'));

// Ruta para subir archivos (usando multer)
app.post('/api/v1/upload', upload.single('profile'), (req, res, next) => {
    debug.blue("Subiendo Archivo");
    try {
        console.log("file es: ", req.file); 
        console.log("body es:", req.body); 
        debug.magenta("El titulo es: ", req.body.titulo);

        // Respuesta con detalles del archivo subido
        res.status(200).json({
            msg: "Archivo subido correctamente",
            file: req.file,
            body: req.body,
            peso: `${Math.round(req.file.size / 1024)} Kbytes`,
            url: `${FULL_DOMAIN}/uploads/${req.file.filename}`
        });
    } catch (e) {
        debug.red(e);
        next(e); // Pasa el error al siguiente middleware de manejo de errores
    }
});

// Ruta de inicio de la API
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");

    const proyecto = `<h1>Bienvenidos a nuestra API BuscaMascotas</h1>
    <p> Este proyecto es una aplicación para buscar y encontrar mascotas </p>
    `;
    res.status(200).send(proyecto);
});

// Middleware para manejar errores 
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${DOMAIN}:${PORT}`);
});
