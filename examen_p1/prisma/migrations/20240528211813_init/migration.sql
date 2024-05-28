/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Mesero" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Mesero_id_seq";

-- AlterTable
ALTER TABLE "Pedido" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Pedido_id_seq";

-- AlterTable
ALTER TABLE "Plato" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Plato_id_seq";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Secuencia" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "secuencia" INTEGER NOT NULL,

    CONSTRAINT "Secuencia_pkey" PRIMARY KEY ("id")
);
