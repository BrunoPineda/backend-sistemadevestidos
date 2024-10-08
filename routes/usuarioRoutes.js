const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de tener la ruta correcta

// Ruta para registrar un nuevo usuario
router.post('/registro', usuarioController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', usuarioController.login);

// Ruta para obtener la información del usuario autenticado (protegida con JWT)
router.get('/:id', authMiddleware, usuarioController.obtenerUsuario);

// Ruta para actualizar un usuario por su ID (protegida con JWT)
router.put('/:id', authMiddleware, usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario por su ID (protegida con JWT)
router.delete('/:id', authMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
