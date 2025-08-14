/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Routine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_routineId_fkey";

-- DropTable
DROP TABLE "public"."Exercise";

-- DropTable
DROP TABLE "public"."Routine";

-- CreateTable
CREATE TABLE "public"."Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" SERIAL NOT NULL,
    "tipoDePlan" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainerId" INTEGER,
    "planId" INTEGER,
    "rolId" INTEGER NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Entrenador" (
    "id" SERIAL NOT NULL,
    "fotoPerfil" TEXT,
    "nombreCompleto" TEXT NOT NULL,
    "edad" INTEGER,
    "telefono" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "biografia" TEXT,
    "nivelAcademico" TEXT,
    "certificaciones" TEXT,
    "aniosExperiencia" INTEGER,
    "especialidades" TEXT,
    "documentosAdjuntos" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Entrenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "fotoPerfil" TEXT,
    "nombreCompleto" TEXT NOT NULL,
    "genero" TEXT,
    "edad" INTEGER,
    "correoElectronico" TEXT,
    "telefono" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "alturaCm" DOUBLE PRECISION,
    "pesoActualKg" DOUBLE PRECISION,
    "pesoObjetivoKg" DOUBLE PRECISION,
    "condicionesMedicas" TEXT,
    "alergias" TEXT,
    "nivelActividad" TEXT,
    "objetivoGeneral" TEXT,
    "tipoAlimentacion" TEXT,
    "alimentosPreferidos" TEXT,
    "alimentosNoPreferidos" TEXT,
    "restriccionesDieteticas" TEXT,
    "planId" INTEGER,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rutina" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rutina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ejercicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "repeticiones" TEXT,
    "instrucciones" TEXT,
    "rutinaId" INTEGER NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RutinasUsuario" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "rutinaId" INTEGER NOT NULL,

    CONSTRAINT "RutinasUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Alimentacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alimentacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AlimentacionCliente" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "alimentacionId" INTEGER NOT NULL,

    CONSTRAINT "AlimentacionCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comida" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "hora" TEXT,
    "descripcion" TEXT NOT NULL,
    "alimentacionId" INTEGER NOT NULL,

    CONSTRAINT "Comida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entrenador_usuarioId_key" ON "public"."Entrenador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Entrenador_clienteId_key" ON "public"."Entrenador"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuarioId_key" ON "public"."Cliente"("usuarioId");

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "public"."usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "public"."Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrenador" ADD CONSTRAINT "Entrenador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrenador" ADD CONSTRAINT "Entrenador_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ejercicio" ADD CONSTRAINT "Ejercicio_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "public"."Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RutinasUsuario" ADD CONSTRAINT "RutinasUsuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RutinasUsuario" ADD CONSTRAINT "RutinasUsuario_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "public"."Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AlimentacionCliente" ADD CONSTRAINT "AlimentacionCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AlimentacionCliente" ADD CONSTRAINT "AlimentacionCliente_alimentacionId_fkey" FOREIGN KEY ("alimentacionId") REFERENCES "public"."Alimentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comida" ADD CONSTRAINT "Comida_alimentacionId_fkey" FOREIGN KEY ("alimentacionId") REFERENCES "public"."Alimentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
