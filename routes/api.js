const express = require('express');
const router = express.Router();

// Importamos los controladores
const authController = require('../controllers/authController');
const controller = require('../controllers/routineController');
const alimentacionController = require('../controllers/alimentacionController');
const cliente = require('../controllers/clienteController');



// --- Auth Routes (Login, Registro, etc.) ---
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/recuperar-usuario', authController.recuperarUsuario);
router.post('/recuperar-contrasena', authController.enviarTokenRecuperacion);
router.post('/resetear-contrasena', authController.cambiarContrasena);

// app.get('/session', (req, res) => {
//   if (req.session.userId) {
//     res.json({
//       loggedIn: true,
//       userName: req.session.userName,
//       userEmail: req.session.userEmail,
//       userRol: req.session.userRol
//     });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });

// --- Rutinas Routes ---
// GET all rutinas
router.get('/rutinas', controller.getAllRoutines);

// POST a new rutina
router.post('/rutinas', controller.createRoutine);

// PUT to update a rutina
router.put('/rutinas/:id', controller.updateRoutine);

// DELETE a rutina
router.delete('/rutinas/:id', controller.deleteRoutine);



//ruta busqueda de ejercicios 
// --- EjerciciosBusqueda Routes ---
router.get('/ejerciciosbusqueda', controller.getAllEjerciciosBusqueda);
router.get('/ejerciciosbusqueda/:categoria', controller.getEjerciciosByCategoria);







// --- Assignment Routes (Placeholder) ---
// GET all assignments
// router.get('/assignments', controller.getAllAssignments);

// // POST a new assignment
// router.post('/assignments', controller.createAssignment);

// // DELETE an assignment
// router.delete('/assignments/:id', controller.deleteAssignment);


// --- Alimentacion Routes ---
router.get('/alimentacion', alimentacionController.getAllAlimentacion);

// POST a new alimentacion
router.post('/alimentacion', alimentacionController.createAlimentacion);

// PUT to update an alimentacion
router.put('/alimentacion/:id', alimentacionController.updateAlimentacion);

// DELETE an alimentacion
router.delete('/alimentacion/:id', alimentacionController.deleteAlimentacion);
//clientes y entrenadores 

router.post('/clientes', cliente.createCliente);
router.post('/entrenador', entrenador.createEntrenador);

module.exports = router;


