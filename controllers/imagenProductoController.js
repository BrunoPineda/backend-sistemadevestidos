const ImagenProducto = require('../models/imagenProductoModel');

// Subir una imagen para un producto
exports.subirImagen = async (req, res) => {
    const { producto_id, url_imagen } = req.body;
    try {
        const nuevaImagen = new ImagenProducto({ producto_id, url_imagen });
        await nuevaImagen.save();
        res.json(nuevaImagen);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
};

// Obtener todas las imágenes de un producto
exports.obtenerImagenes = async (req, res) => {
    const { producto_id } = req.params;
    try {
        const imagenes = await ImagenProducto.find({ producto_id });
        res.json(imagenes);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
};
