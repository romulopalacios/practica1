-- CreateTable
CREATE TABLE "Plato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,

    CONSTRAINT "Plato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesero" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "sueldo_basico" DOUBLE PRECISION NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "Mesero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "platoId" INTEGER NOT NULL,
    "meseroId" INTEGER NOT NULL,
    "fecha" TEXT NOT NULL,
    "mesa" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "Plato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_meseroId_fkey" FOREIGN KEY ("meseroId") REFERENCES "Mesero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
