// Importamos las dependencias necesarias
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

// Importar rutas
const apiRoutes = require('./routes/api');


// Creamos la aplicación de Express
const app = express();

// Puerto donde se ejecutará el servidor
const PORT = process.env.PORT || 3010;

// --- MIDDLEWARE ---
// Habilitar CORS
app.use(cors());

// Middleware para servir archivos estáticos (HTML, CSS, JS del cliente)
// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para manejar sesiones (¡Debe ir antes de las rutas que lo usan!)
app.use(session({
  secret: 'nutrifit-secret-key', // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Poner en true si usas HTTPS
}));


// --- RUTAS ---
// Usamos las rutas de autenticación (login, register, logout, etc.) en la raíz
// app.use(authRoutes);

// Usamos las rutas de la API bajo el prefijo /api
app.use('/api', apiRoutes);

// Ruta para obtener los datos de la sesión del usuario logueado


// Ruta catch-all para Single Page Applications (SPA)
// Siempre debe ir al final, después de todas las demás rutas.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});