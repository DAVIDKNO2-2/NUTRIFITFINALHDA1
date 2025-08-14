/*
  Warnings:

  - You are about to drop the column `planId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rolId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rol` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RolType" AS ENUM ('ENTRENADOR', 'CLIENTE', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('PREMIUM', 'NORMAL');

-- DropForeignKey
ALTER TABLE "public"."Cliente" DROP CONSTRAINT "Cliente_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuario" DROP CONSTRAINT "usuario_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuario" DROP CONSTRAINT "usuario_rolId_fkey";

-- AlterTable
ALTER TABLE "public"."Cliente" DROP COLUMN "planId",
ADD COLUMN     "plan" "public"."PlanType";

-- AlterTable
ALTER TABLE "public"."usuario" DROP COLUMN "planId",
DROP COLUMN "rolId",
DROP COLUMN "role",
ADD COLUMN     "plan" "public"."PlanType",
ADD COLUMN     "rol" "public"."RolType" NOT NULL;

-- DropTable
DROP TABLE "public"."Plan";

-- DropTable
DROP TABLE "public"."Rol";
