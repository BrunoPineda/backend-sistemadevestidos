const mongoose = require('mongoose');

// Definir el esquema de Producto
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio_venta: { type: Number },
    precio_alquiler: { type: Number },
    talla: { type: String },
    estado: { type: String, enum: ['disponible', 'no_disponible'], default: 'disponible' },
    imagenes: [{ type: String }],  // Asegúrate de que sea un array para múltiples imágenes
    fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productoSchema);
