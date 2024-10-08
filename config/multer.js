const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
    }
});

// Middleware para aceptar múltiples imágenes (3 como máximo)
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limita el tamaño a 5MB por archivo
}).array('imagenes', 5); // Asegúrate de que el nombre sea 'imagenes'

module.exports = upload;
