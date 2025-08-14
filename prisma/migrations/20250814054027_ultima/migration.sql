/*
  Warnings:

  - You are about to drop the `Ejerciciobusqueeda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Ejerciciobusqueeda";

-- CreateTable
CREATE TABLE "public"."Ejerciciobusqueda" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" "public"."Categoria" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Ejerciciobusqueda_pkey" PRIMARY KEY ("id")
);
