const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    // Verificar si hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, 'secreto'); // Cambiar 'secreto' por tu clave secreta

        // Guardar la información del usuario en la request
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
