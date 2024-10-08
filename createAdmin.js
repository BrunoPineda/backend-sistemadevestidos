const mongoose = require('mongoose');
const Usuario = require('./models/usuarioModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
    crearAdmin();
}).catch(err => console.log(err));

const crearAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash('root123', 10);
        const adminUsuario = new Usuario({
            nombre: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            rol: 'admin'
        });

        await adminUsuario.save();
        console.log('Usuario Admin creado con éxito');
        process.exit();
    } catch (err) {
        console.error('Error al crear el usuario Admin:', err.message);
        process.exit(1);
    }
};
