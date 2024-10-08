const express = require('express');
const router = express.Router();
const { registrarProducto, obtenerProductos, obtenerProductoPorId, editarProducto, eliminarProducto } = require('../controllers/productoController');
const upload = require('../middleware/multerConfig');

// Ruta para crear un producto con múltiples imágenes
router.post('/crear', upload.array('imagenes', 10), registrarProducto);

// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

// Ruta para obtener un producto por ID
router.get('/:id', obtenerProductoPorId);

// Ruta para editar un producto (incluye la capacidad de agregar más imágenes)
router.put('/editar/:id', upload.array('imagenes', 10), editarProducto);

// Ruta para eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
