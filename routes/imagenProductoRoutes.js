const express = require('express');
const { subirImagen, obtenerImagenes } = require('../controllers/imagenProductoController');
const router = express.Router();

router.post('/', subirImagen); // Subir imagen de un producto
router.get('/:producto_id', obtenerImagenes); // Obtener todas las imágenes de un producto

module.exports = router;
