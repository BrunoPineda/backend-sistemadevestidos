const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombres únicos para las imágenes
    }
});

// Middleware para aceptar múltiples archivos
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño de las imágenes a 5MB
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb('Error: Solo se permiten imágenes (jpeg, jpg, png)');
        }
    }
});

module.exports = upload;
