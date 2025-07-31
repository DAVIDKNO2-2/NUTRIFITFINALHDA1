const express = require('express');
const router = express.Router();
const controller = require('../controllers/routineController');

// --- Routine Routes ---
// GET all routines
router.get('/routines', controller.getAllRoutines);

// POST a new routine
router.post('/routines', controller.createRoutine);

// PUT to update a routine
router.put('/routines/:id', controller.updateRoutine);

// DELETE a routine
router.delete('/routines/:id', controller.deleteRoutine);


// --- Assignment Routes ---
// Note: The user has not yet requested the assignments table in the DB.
// These routes are placeholders for when that functionality is added.
// I will implement them to return empty/mocked data for now.

// GET all assignments
router.get('/assignments', controller.getAllAssignments);

// POST a new assignment
router.post('/assignments', controller.createAssignment);

// DELETE an assignment
router.delete('/assignments/:id', controller.deleteAssignment);


module.exports = router;
