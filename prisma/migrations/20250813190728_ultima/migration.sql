-- CreateEnum
CREATE TYPE "public"."Categoria" AS ENUM ('TODAS_LAS_PARTES', 'BACK', 'CARDIO', 'CHEST', 'LOWER_ARMS', 'LOWER_LEGS', 'NECK', 'SHOULDERS', 'UPPER_ARMS', 'UPPER_LEGS', 'WAIST');

-- CreateTable
CREATE TABLE "public"."Ejerciciobusqueeda" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" "public"."Categoria" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Ejerciciobusqueeda_pkey" PRIMARY KEY ("id")
);
