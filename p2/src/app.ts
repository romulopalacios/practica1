import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //insertar registros
    async function insertData() {
        const meseroRecords = await prisma.mesero.createMany({
            data: [
                {
                    nombre: 'Juan',
                    sueldo_basico: 460,
                    nivel: 4,
                },
                {
                    nombre: 'Maria',
                    sueldo_basico: 500,
                    nivel: 3,
                },
                {
                    nombre: 'Pedro',
                    sueldo_basico: 400,
                    nivel: 2,
                },
            ],
        });
        console.log({ meseroRecords });

        const platoRecords = await prisma.plato.createMany({
            data: [
                {
                    nombre: 'Ceviche',
                },
                {
                    nombre: 'Lomo Saltado',
                },
                {
                    nombre: 'Arroz con Pollo',
                },
            ],
        });
        console.log({ platoRecords });

        const pedidoRecords = await prisma.pedido.createMany({
            data: [
                {
                    fecha: "2021-10-10",
                    mesa: 1,
                    cantidad: 3,
                    precio: 50,
                    platoId: 1,
                    meseroId: 1,
                    estado: true,
                },
                {
                    fecha: "2021-10-11",
                    mesa: 3,
                    cantidad: 3,
                    precio: 60,
                    platoId: 2,
                    meseroId: 2,
                    estado: true,
                },
                {
                    fecha: "2021-10-12",
                    mesa: 2,
                    cantidad: 4,
                    precio: 70,
                    platoId: 3,
                    meseroId: 3,
                    estado: true,
                },
            ],
        });
    }
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

//Crear Funcion ELIMINAR
async function eliminar(id: number) {
    const pedido = await prisma.pedido.findUnique({
        where: { id: id },
    });

    if (pedido) {
        await prisma.pedido.update({
            where: { id: id },
            data: { estado: false },
        });
    } else {
        console.log(`Pedido con id ${id} no encontrado`);
    }
}

eliminar(1)
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

//Crear Funcion RECUPERAR
async function recuperar(id: number) {
    const pedido = await prisma.pedido.findUnique({
        where: { id: id },
    });

    if (pedido) {
        await prisma.pedido.update({
            where: { id: id },
            data: { estado: true },
        });
    } else {
        console.log(`Pedido con id ${id} no encontrado`);
    }
}

recuperar(1)
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });