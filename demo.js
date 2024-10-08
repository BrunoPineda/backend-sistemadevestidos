const crypto = require('crypto');

// Hashear la contraseña usando SHA256
const generarHash = (passwordPlano) => {
    return crypto.createHash('sha256').update(passwordPlano).digest('hex');
};

// Prueba de hasheo
const passwordPlano = 'root123';
const hashedPassword = generarHash(passwordPlano);

console.log('Hashed password con SHA256:', hashedPassword);
