const express = require('express');
const router = express.Router();
const controller = require('../controllers/routineController');

// Routine Routes
router.get('/routines', controller.getAllRoutines);
router.post('/routines', controller.createRoutine);
router.put('/routines/:id', controller.updateRoutine);
router.delete('/routines/:id', controller.deleteRoutine);

// Assignment Routes
router.get('/assignments', controller.getAllAssignments);
router.post('/assignments', controller.createAssignment);
router.delete('/assignments/:id', controller.deleteAssignment);

module.exports = router;
