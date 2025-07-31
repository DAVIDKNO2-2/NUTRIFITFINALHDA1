// In-memory data store
let routines = [];
let assignments = [];

// --- Routines ---

const getAllRoutines = () => routines;

const getRoutineById = (id) => routines.find(r => r.id === id);

const createRoutine = (routineData) => {
  const newRoutine = {
    id: Date.now().toString(),
    ...routineData,
    createdAt: new Date().toISOString(),
  };
  routines.push(newRoutine);
  return newRoutine;
};

const updateRoutine = (id, routineData) => {
  const routineIndex = routines.findIndex(r => r.id === id);
  if (routineIndex === -1) {
    return null;
  }
  const updatedRoutine = { ...routines[routineIndex], ...routineData, id };
  routines[routineIndex] = updatedRoutine;
  return updatedRoutine;
};

const deleteRoutine = (id) => {
  const initialLength = routines.length;
  routines = routines.filter(r => r.id !== id);
  // Also delete related assignments
  assignments = assignments.filter(a => a.routineId !== id);
  return routines.length < initialLength;
};

// --- Assignments ---

const getAllAssignments = () => {
  // For convenience, embed the routine object in the assignment
  return assignments.map(assignment => ({
    ...assignment,
    routine: getRoutineById(assignment.routineId)
  }));
};

const createAssignment = (assignmentData) => {
  const routine = getRoutineById(assignmentData.routineId);
  if (!routine) {
    return null; // Or throw an error
  }
  const newAssignment = {
    id: Date.now().toString(),
    ...assignmentData,
    assignedAt: new Date().toISOString(),
  };
  assignments.push(newAssignment);
  return { ...newAssignment, routine };
};

const deleteAssignment = (id) => {
  const initialLength = assignments.length;
  assignments = assignments.filter(a => a.id !== id);
  return assignments.length < initialLength;
};


module.exports = {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllAssignments,
  createAssignment,
  deleteAssignment,
};
