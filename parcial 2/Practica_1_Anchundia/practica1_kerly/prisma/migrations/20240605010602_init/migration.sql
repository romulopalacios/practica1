-- CreateTable
CREATE TABLE "Tutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificacion" TEXT NOT NULL,
    "nombre" TEXT,
    "experticia" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "Tutorado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificacion" TEXT NOT NULL,
    "nombre" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "Tutoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "asignatura" TEXT,
    "horas" TEXT,
    "fecha" TEXT,
    "hora" TEXT,
    "tutorID" INTEGER NOT NULL,
    "tutoradoID" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    CONSTRAINT "Tutoria_tutorID_fkey" FOREIGN KEY ("tutorID") REFERENCES "Tutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tutoria_tutoradoID_fkey" FOREIGN KEY ("tutoradoID") REFERENCES "Tutorado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_identificacion_key" ON "Tutor"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Tutorado_identificacion_key" ON "Tutorado"("identificacion");
