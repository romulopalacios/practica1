/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Secuencia` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `secuencia` on the `Secuencia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Secuencia" DROP COLUMN "secuencia",
ADD COLUMN     "secuencia" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Secuencia_nombre_key" ON "Secuencia"("nombre");
