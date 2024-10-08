const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // Verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        usuario = new Usuario({
            nombre,
            email,
            password,
            rol
        });

        // Guardar el nuevo usuario en la base de datos
        await usuario.save();

        // Crear y firmar un token JWT
        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
            'secreto', // Cambiar por una clave secreta más segura
            { expiresIn: '1h' }
        );

        // Enviar token y datos del usuario
        res.status(201).json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor'+500 });
    }
};

// Iniciar sesión (Login)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Verificar la contraseña
        const esCorrecta = await usuario.compararPassword(password);
        if (!esCorrecta) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
            'secreto', // Cambiar por una clave secreta más segura
            { expiresIn: '1h' }
        );

        // Enviar el token y la información del usuario como respuesta
        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor '+error });
    }
};

// Obtener información de un usuario por su ID (protegiendo con autenticación)
exports.obtenerUsuario = async (req, res) => {
    try {
        // Buscar al usuario por su ID (proporcionado en el token JWT)
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); // Excluir la contraseña

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

// Actualizar información de un usuario (ejemplo para actualizar perfil)
exports.actualizarUsuario = async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nombre, email },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({ msg: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
};
