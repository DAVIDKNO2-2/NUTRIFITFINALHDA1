const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- Alimentacion Controllers ---

const getAllAlimentacion = async (req, res) => {
  try {
    const alimentaciones = await prisma.alimentacion.findMany({
      include: {
        comidas: true, // Incluir las comidas relacionadas
      },
      orderBy: {
        creadoEn: 'desc',
      }
    });
    res.json(alimentaciones);
  } catch (error) {
    console.error("Failed to get alimentaciones:", error);
    res.status(500).json({ error: "Failed to retrieve alimentaciones" });
  }
};

const createAlimentacion = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFin, comidas } = req.body;

  if (!nombre || !fechaInicio || !fechaFin) {
    return res.status(400).json({ message: 'El nombre, la fecha de inicio y la fecha de fin son obligatorios' });
  }

  try {
    const nuevaAlimentacion = await prisma.alimentacion.create({
      data: {
        nombre,
        descripcion,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        comidas: {
          create: comidas.map(comida => ({
            tipo: comida.tipo,
            descripcion: comida.descripcion,
            hora: comida.hora,
          })),
        },
      },
      include: {
        comidas: true,
      },
    });
    res.status(201).json(nuevaAlimentacion);
  } catch (error) {
    console.error("Failed to create alimentacion:", error);
    res.status(500).json({ error: "Failed to create alimentacion" });
  }
};

const updateAlimentacion = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fechaInicio, fechaFin, comidas } = req.body;

  if (!nombre || !fechaInicio || !fechaFin) {
    return res.status(400).json({ message: 'El nombre, la fecha de inicio y la fecha de fin son obligatorios' });
  }

  try {
    const alimentacionActualizada = await prisma.$transaction(async (tx) => {
      // Eliminar las comidas existentes
      await tx.comida.deleteMany({
        where: { alimentacionId: parseInt(id) },
      });

      // Actualizar la alimentacion y crear las nuevas comidas
      const alimentacion = await tx.alimentacion.update({
        where: { id: parseInt(id) },
        data: {
          nombre,
          descripcion,
          fechaInicio: new Date(fechaInicio),
          fechaFin: new Date(fechaFin),
          comidas: {
            create: comidas.map(comida => ({
              tipo: comida.tipo,
              descripcion: comida.descripcion,
              hora: comida.hora,
            })),
          },
        },
        include: {
          comidas: true,
        },
      });
      return alimentacion;
    });

    res.json(alimentacionActualizada);
  } catch (error) {
    console.error(`Failed to update alimentacion ${id}:`, error);
    if (error.code === 'P2025') { // Código de Prisma para registro no encontrado
        return res.status(404).json({ message: 'Alimentacion no encontrada' });
    }
    res.status(500).json({ error: "Failed to update alimentacion" });
  }
};

const deleteAlimentacion = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (tx) => {
      // Eliminar las comidas asociadas primero
      await tx.comida.deleteMany({
        where: { alimentacionId: parseInt(id) },
      });
      // Luego eliminar la alimentacion
      await tx.alimentacion.delete({
        where: { id: parseInt(id) },
      });
    });
    res.status(204).send();
  } catch (error) {
    console.error(`Failed to delete alimentacion ${id}:`, error);
    if (error.code === 'P2025') { // Código de Prisma para registro no encontrado
        return res.status(404).json({ message: 'Alimentacion no encontrada' });
    }
    res.status(500).json({ error: "Failed to delete alimentacion" });
  }
};

module.exports = {
  getAllAlimentacion,
  createAlimentacion,
  updateAlimentacion,
  deleteAlimentacion,
};