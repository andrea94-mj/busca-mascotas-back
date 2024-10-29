import {Router} from 'express';
import { crearEncontrado, getEncontrados } from '../controllers/encontrados.controller.js';
import { createRegister, authLogin } from '../controllers/usuarios.controller.js';
import { crearPerdido, getPerdidos } from '../controllers/perdidos.controller.js';


const router = Router();

//rutas para encontrados
router.get("/encontrados", getEncontrados);

router.post("/nuevoEncontrado", crearEncontrado);

//rutas para perdidos
router.get("/perdidos", getPerdidos);

router.post("/nuevoPerdido", crearPerdido);

//rutas para usuarios

router.post("/registro", createRegister);

router.post("/acceso", authLogin);

export default router;