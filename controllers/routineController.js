const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



//  TRAER TODAS EJERCICIOS DE BUSQUEDA
// Esta función obtiene todos los ejercicios de búsqueda desde la base de datos
const getAllEjerciciosBusqueda = async (req, res) => {
  try {
    const ejercicios = await prisma.Ejerciciobusqueda.findMany({
      orderBy: { id: 'asc' } // Ordenar por id de manera ascendente
    });
    res.json(ejercicios);
  } catch (error) {
    console.error("Error al obtener todos los ejercicios:", error);
    res.status(500).json({ error: "Error al obtener todos los ejercicios" });
  }
};







//..........................................................................................
// --- Routine Controllers ---

const getAllRoutines = async (req, res) => {
  try {
    const rutinas = await prisma.rutina.findMany({
      include: {
        ejercicios: true, // Include the related exercises for each routine
      },
      orderBy: {
        creadoEn: 'desc',
      }
    });
    res.json(rutinas);
  } catch (error) {
    console.error("Failed to get routines:", error);
    res.status(500).json({ error: "Failed to retrieve routines" });
  }
};

const createRoutine = async (req, res) => {
  const { nombre, descripcion, ejercicios } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'Routine name is required' });
  }

  try {
    const newRutina = await prisma.rutina.create({
      data: {
        nombre,
        descripcion,
        ejercicios: {
          create: ejercicios.map(ex => ({
            nombre: ex.nombre,
            repeticiones: ex.repeticiones,
            instrucciones: ex.instrucciones,
          })),
        },
      },
      include: {
        ejercicios: true,
      },
    });
    res.status(201).json(newRutina);
  } catch (error) {
    console.error("Failed to create routine:", error);
    res.status(500).json({ error: "Failed to create routine" });
  }
};

const updateRoutine = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, ejercicios } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'Routine name is required' });
  }

  try {
    // Prisma requires a transaction to update a routine and its exercises safely.
    // 1. Delete old exercises.
    // 2. Update the routine and create the new exercises.
    const updatedRutina = await prisma.$transaction(async (tx) => {
      await tx.ejercicio.deleteMany({
        where: { rutinaId: parseInt(id) },
      });

      const rutina = await tx.rutina.update({
        where: { id: parseInt(id) },
        data: {
          nombre,
          descripcion,
          ejercicios: {
            create: ejercicios.map(ex => ({
              nombre: ex.nombre,
              repeticiones: ex.repeticiones,
              instrucciones: ex.instrucciones,
            })),
          },
        },
        include: {
          ejercicios: true,
        },
      });
      return rutina;
    });

    res.json(updatedRutina);
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
      await tx.ejercicio.deleteMany({
        where: { rutinaId: parseInt(id) },
      });
      await tx.rutina.delete({
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
  getAllEjerciciosBusqueda
};
