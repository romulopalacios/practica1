import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatemodificaciones() {
  const entidades = ['plato', 'mesero', 'pedido'];
  const resultados: { entidad: string, actualizado: boolean }[] = [];

  for (const entidad of entidades) {
    // Obtener el ID máximo de la entidad
    const maxIdResult = await prisma.$queryRawUnsafe<{ max: number }[]>(`SELECT MAX(id) as max FROM "${entidad.charAt(0).toUpperCase() + entidad.slice(1)}"`);
    const maxId = maxIdResult[0]?.max || 0;

    // Obtener la secuencia actual de la entidad
    const secuenciaActual = await prisma.secuencia.findUnique({
      where: { nombre: entidad },
      select: { secuencia: true },
    });

    // Comparar y actualizar si es necesario
    if (secuenciaActual && maxId >= secuenciaActual.secuencia) {
      await prisma.secuencia.update({
        where: { nombre: entidad },
        data: { secuencia: maxId + 1 },
      });
      resultados.push({ entidad, actualizado: true });
    } else {
      resultados.push({ entidad, actualizado: false });
    }
  }

  // Mostrar los resultados
  console.log('Resultados de actualización de secuencias:');
  resultados.forEach(({ entidad, actualizado }) => {
    console.log(`Entidad: ${entidad}, Secuencia ${actualizado ? 'actualizada' : 'sin cambios'}`);
  });

  // Devolver el resumen
  const totalActualizadas = resultados.filter(result => result.actualizado).length;
  const totalSinCambios = resultados.length - totalActualizadas;

  return { totalActualizadas, totalSinCambios };
}

// Ejecutar la función
updatemodificaciones()
  .then(result => {
    console.log(`Total secuencias actualizadas: ${result.totalActualizadas}`);
    console.log(`Total secuencias sin cambios: ${result.totalSinCambios}`);
  })
  .catch(error => {
    console.error('Error al actualizar secuencias:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });