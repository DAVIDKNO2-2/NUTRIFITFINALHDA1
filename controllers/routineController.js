const db = require('../models/database');

// --- Routine Controllers ---

const getAllRoutines = (req, res) => {
  res.json(db.getAllRoutines());
};

const createRoutine = (req, res) => {
  const { name, description, exercises } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Routine name is required' });
  }
  const newRoutine = db.createRoutine({ name, description, exercises });
  res.status(201).json(newRoutine);
};

const updateRoutine = (req, res) => {
  const { id } = req.params;
  const { name, description, exercises } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Routine name is required' });
  }
  const updatedRoutine = db.updateRoutine(id, { name, description, exercises });
  if (!updatedRoutine) {
    return res.status(404).json({ message: 'Routine not found' });
  }
  res.json(updatedRoutine);
};

const deleteRoutine = (req, res) => {
  const { id } = req.params;
  const success = db.deleteRoutine(id);
  if (!success) {
    return res.status(404).json({ message: 'Routine not found' });
  }
  res.status(204).send(); // No Content
};

// --- Assignment Controllers ---

const getAllAssignments = (req, res) => {
  res.json(db.getAllAssignments());
};

const createAssignment = (req, res) => {
  const { routineId, userId } = req.body;
  if (!routineId || !userId) {
    return res.status(400).json({ message: 'Routine ID and User ID are required' });
  }
  const newAssignment = db.createAssignment({ routineId, userId });
  if (!newAssignment) {
    return res.status(404).json({ message: 'Routine not found' });
  }
  res.status(201).json(newAssignment);
};

const deleteAssignment = (req, res) => {
  const { id } = req.params;
  const success = db.deleteAssignment(id);
  if (!success) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.status(204).send(); // No Content
};

module.exports = {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllAssignments,
  createAssignment,
  deleteAssignment,
};
