import { Router } from 'express';
import { getEncontrados, crearEncontrado, getEncontradoById, actualizarEncontrado, eliminarEncontrado} from '../controllers/encontrados.controller.js';
import { getPerdidos, crearPerdido, getPerdidoById, actualizarPerdido, eliminarPerdido} from '../controllers/perdidos.controller.js';
import { createRegister, authLogin, makeAdmin, getAllUsers, getUserById, deleteUser  } from '../controllers/usuarios.controller.js';
import { upload } from '../middleweares/multer.js'; 
import { adminMiddleware } from '../middleweares/admin.js';

const router = Router();

// Rutas para encontrados
router.get('/encontrados', getEncontrados);
router.get('/encontrados/:id', getEncontradoById);
router.post('/nuevoEncontrado', upload.single('imagen'), crearEncontrado);
router.put('/encontrados/:id', adminMiddleware, upload.single('imagen'), actualizarEncontrado);
router.delete('/encontrados/:id', adminMiddleware, eliminarEncontrado);

// Rutas para perdidos
router.get('/perdidos', getPerdidos);
router.get('/perdidos/:id', getPerdidoById);
router.post('/nuevoPerdido', upload.single('imagen'), crearPerdido);
router.put('/perdidos/:id', adminMiddleware, upload.single('imagen'), actualizarPerdido);
router.delete('/perdidos/:id', adminMiddleware, eliminarPerdido);


// Rutas para usuarios
router.post("/registro", createRegister);
router.post("/acceso", authLogin);


// Rutas para administración de usuarios (solo accesibles por admin)
router.get("/admin/usuarios", adminMiddleware, getAllUsers);
router.get("/admin/usuarios/:id", adminMiddleware, getUserById);
router.put("/admin/usuarios/:id/make-admin", adminMiddleware, makeAdmin);
router.delete("/admin/usuarios/:id", adminMiddleware, deleteUser);

export default router;
