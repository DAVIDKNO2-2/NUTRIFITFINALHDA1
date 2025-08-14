// Importa la instancia de Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// Función para crear un nuevo cliente
const createCliente = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const {
      nombreCompleto,
      usuarioId,
      fotoPerfil,
      genero,
      edad,
      correoElectronico,
      telefono,
      ciudad,
      pais,
      alturaCm,
      pesoActualKg,
      pesoObjetivoKg,
      condicionesMedicas,
      alergias,
      nivelActividad,
      objetivoGeneral,
      tipoAlimentacion,
      alimentosPreferidos,
      alimentosNoPreferidos,
      restriccionesDieteticas,
      plan
    } = req.body;


    // Validación básica: asegura que los campos obligatorios existan
    if (!nombreCompleto || !usuarioId) {
      return res.status(400).json({ error: 'El nombre completo y el ID de usuario son obligatorios.' });
    }


    // Crea un nuevo registro de cliente en la base de datos usando Prisma
    const newCliente = await prisma.cliente.create({
      data: {
        nombreCompleto,
        usuarioId,
        fotoPerfil,
        genero,
        edad,
        correoElectronico,
        telefono,
        ciudad,
        pais,
        alturaCm,
        pesoActualKg,
        pesoObjetivoKg,
        condicionesMedicas,
        alergias,
        nivelActividad,
        objetivoGeneral,
        tipoAlimentacion,
        alimentosPreferidos,
        alimentosNoPreferidos,
        restriccionesDieteticas,
        plan
      },
    });


    // Envía una respuesta de éxito con el nuevo cliente creado
    res.status(201).json(newCliente);
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    // Envía una respuesta de error en caso de fallo
    res.status(500).json({ error: 'Ha ocurrido un error al crear el cliente.' });
  }
};



//entrenador 
// entrenador.controller.js


const createEntrenador = async (req, res) => {
  try {
    const { 
      nombreCompleto, 
      usuarioId,
      clienteId,
      fotoPerfil,
      edad,
      telefono,
      ciudad,
      pais,
      biografia,
      nivelAcademico,
      certificaciones,
      aniosExperiencia,
      especialidades,
      documentosAdjuntos
    } = req.body;

    // Validación básica: asegura que los campos obligatorios existan
    if (!nombreCompleto || !usuarioId || !clienteId) {
      return res.status(400).json({ error: 'El nombre completo, ID de usuario y ID de cliente son obligatorios.' });
    }

    const newEntrenador = await prisma.entrenador.create({
      data: {
        nombreCompleto,
        usuarioId,
        clienteId,
        fotoPerfil,
        edad,
        telefono,
        ciudad,
        pais,
        biografia,
        nivelAcademico,
        certificaciones,
        aniosExperiencia,
        especialidades,
        documentosAdjuntos
      },
    });

    res.status(201).json(newEntrenador);
  } catch (error) {
    console.error('Error al crear el entrenador:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al crear el entrenador.' });
  }
};


module.exports = {
  createCliente,
  createEntrenador,
};
