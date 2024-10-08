const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema de Usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
    fecha_registro: { type: Date, default: Date.now }
});

// Middleware para hashear la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // Generar salt y hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para verificar la contraseña en el login
usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
