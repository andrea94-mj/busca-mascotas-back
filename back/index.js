import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/mongodb.routes.js';
import {PORT, DOMAIN} from './config/config.js';
import {connectDB} from './data/mongoDb.js';
import path from 'path';
import {upload} from './middleweares/multer.js';
import { __dirname } from './config/config.js';



const app = express();

connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/v1', indexRoutes);

app.use('/uploads', express.static('public/uploads'));

app.use((err, req, res, next)=>{
    console.error(err.stack);

    const responseAPI= {
        status: 'error',
        msg: 'Error en la API',
        error: err.message,
        code: 500
    }
    res.status(500).send(responseAPI)
});

app.post('/api/v1/upload', upload.single('profile'), (req, res, next) => {
    debug.blue("Subiendo Archivo");
    try {

        console.log("file es ", req.file); 
        console.log("body es:", req.body); 
        debug.magenta("El titulo del form es ", req.body.titulo);

        res.status(200).json({
            msg: "Archivo subido correctamente",
            file: req.file,
            body: req.body,
            peso: `${Math.round(req.file.size / 1024)} Kbytes`,
            url: `${FULL_DOMAIN}/uploads/${req.file.filename}`
        });

    } catch (e) {
        debug.red(e);
        next(e);
    }
});


app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html")

    const proyecto = `<h1>Bienvenidos a nuestra BuscaMascotas</h1>
    <p> Este proyecto es una aplicación para buscar y encontrar mascotas </p>
    `
    res.status(200).send(proyecto)
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${DOMAIN}:${PORT}`);
});
