import {Router} from 'express';
import { crearEncontrado, getEncontrados } from '../controllers/encontrados.controller.js';
import { createRegister, authLogin } from '../controllers/usuarios.controller.js';


const router = Router();

//rutas para encontrados
router.get("/encontrados", getEncontrados);

router.post("/nuevoEncontrado", crearEncontrado);

//rutas para usuarios

router.post("/registro", createRegister);

router.post("/acceso", authLogin);

export default router;