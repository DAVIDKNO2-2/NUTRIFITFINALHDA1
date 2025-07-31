const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- Routine Controllers ---

const getAllRoutines = async (req, res) => {
  try {
    const routines = await prisma.routine.findMany({
      include: {
        exercises: true, // Include the related exercises for each routine
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    res.json(routines);
  } catch (error) {
    console.error("Failed to get routines:", error);
    res.status(500).json({ error: "Failed to retrieve routines" });
  }
};

const createRoutine = async (req, res) => {
  const { name, description, exercises } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Routine name is required' });
  }

  try {
    const newRoutine = await prisma.routine.create({
      data: {
        name,
        description,
        exercises: {
          create: exercises.map(ex => ({
            name: ex.name,
            repetitions: ex.repetitions,
            instructions: ex.instructions,
          })),
        },
      },
      include: {
        exercises: true,
      },
    });
    res.status(201).json(newRoutine);
  } catch (error) {
    console.error("Failed to create routine:", error);
    res.status(500).json({ error: "Failed to create routine" });
  }
};

const updateRoutine = async (req, res) => {
  const { id } = req.params;
  const { name, description, exercises } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Routine name is required' });
  }

  try {
    // Prisma requires a transaction to update a routine and its exercises safely.
    // 1. Delete old exercises.
    // 2. Update the routine and create the new exercises.
    const updatedRoutine = await prisma.$transaction(async (tx) => {
      await tx.exercise.deleteMany({
        where: { routineId: parseInt(id) },
      });

      const routine = await tx.routine.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          exercises: {
            create: exercises.map(ex => ({
              name: ex.name,
              repetitions: ex.repetitions,
              instructions: ex.instructions,
            })),
          },
        },
        include: {
          exercises: true,
        },
      });
      return routine;
    });

    res.json(updatedRoutine);
  } catch (error) {
    console.error(`Failed to update routine ${id}:`, error);
    if (error.code === 'P2025') { // Prisma code for record not found
        return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(500).json({ error: "Failed to update routine" });
  }
};

const deleteRoutine = async (req, res) => {
  const { id } = req.params;
  try {
    // Because of the foreign key relationship, we must delete the exercises first,
    // then the routine. A transaction ensures this happens atomically.
    await prisma.$transaction(async (tx) => {
      await tx.exercise.deleteMany({
        where: { routineId: parseInt(id) },
      });
      await tx.routine.delete({
        where: { id: parseInt(id) },
      });
    });
    res.status(204).send();
  } catch (error) {
    console.error(`Failed to delete routine ${id}:`, error);
    if (error.code === 'P2025') { // Prisma code for record not found
        return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(500).json({ error: "Failed to delete routine" });
  }
};


// --- Assignment Controllers (Placeholders) ---
// The DB schema does not have assignments yet, so these return empty data.
const getAllAssignments = (req, res) => {
  res.json([]);
};

const createAssignment = (req, res) => {
  res.status(201).json({ message: "Assignment feature not implemented" });
};

const deleteAssignment = (req, res) => {
  res.status(204).send();
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
