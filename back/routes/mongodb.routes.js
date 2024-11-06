import { Router } from 'express';
import { crearEncontrado, getEncontrados } from '../controllers/encontrados.controller.js';
import { createRegister, authLogin } from '../controllers/usuarios.controller.js';
import { crearPerdido, getPerdidos } from '../controllers/perdidos.controller.js';
import { upload } from '../middleweares/multer.js'; 

const router = Router();

// Rutas para encontrados
router.get("/encontrados", getEncontrados);

// Usamos el middleware `upload.single('imagen')` para manejar un solo archivo de imagen
router.post("/nuevoEncontrado", upload.single('imagen'), crearEncontrado);

// Rutas para perdidos
router.get("/perdidos", getPerdidos);

// Usamos el middleware `upload.single('imagen')` para manejar un solo archivo de imagen
router.post("/nuevoPerdido", upload.single('imagen'), crearPerdido);

// Rutas para usuarios
router.post("/registro", createRegister);
router.post("/acceso", authLogin);

export default router;
