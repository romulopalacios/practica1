import server from "express";
import { plato, pedido, mesero, secuencia } from "./routes";
import { PrismaClient } from '@prisma/client';


const app = server();
const prisma = new PrismaClient();

app.use(server.json())

app.use('/plato', plato);
app.use('/pedido', pedido);
app.use('/mesero', mesero);
app.use('/secuencia', secuencia);

app.listen(3000, () => {
    console.log('Server on port 3000');
});

async function main() {
  // Crear secuencias iniciales si no existen
await prisma.secuencia.createMany({
    data: [
        { id: 1, nombre: 'plato', secuencia: 1 },
        { id: 2, nombre: 'mesero', secuencia: 1 },
        { id: 3, nombre: 'pedido', secuencia: 1 },
    ],
    skipDuplicates: true, // Omitir si ya existen
});

// Obtener y mostrar las secuencias
const secuencias = await prisma.secuencia.findMany();
console.log('Secuencias:', secuencias);

  // Ejemplo de creación de un nuevo plato con un ID de secuencia
  const platoSequence = await prisma.secuencia.update({
    where: { nombre: 'plato' },
    data: { secuencia: { increment: 1 } },
    select: { secuencia: true },
  });

  const newPlato = await prisma.plato.create({
    data: {
      id: platoSequence.secuencia,
      nombre: 'Plato de prueba',
      estado: 'Activo',
    },
  });

  console.log('Nuevo Plato:', newPlato);
}



main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
