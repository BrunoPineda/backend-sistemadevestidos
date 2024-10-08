const mongoose = require('mongoose');

const imagenProductoSchema = new mongoose.Schema({
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    url_imagen: { type: String, required: true }
});

module.exports = mongoose.model('ImagenProducto', imagenProductoSchema);
