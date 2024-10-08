const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const path = require('path');
const cors = require('cors'); // Importar CORS

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
});

// Middleware para servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas de productos
app.use('/api/productos', productoRoutes);

app.use('/api/usuarios', usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
