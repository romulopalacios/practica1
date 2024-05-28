import {Router} from 'express';
import {PrismaClient} from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//Get platos
router.get('/', async (req, res) => {
    try {
        const platos = await prisma.plato.findMany({
            where: {estado: 'Activo'},
        });
        res.json(platos);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los platos'});
    }
});

//Get plato by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const plato = await prisma.plato.findUnique({
            where: {id: parseInt(id)},
        });
        res.json(plato);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el plato'});
    }
});

//Crear plato
router.post('/', async (req, res) => {
    const { nombre, estado } = req.body;
    try {
        // Obtener y actualizar la secuencia para 'plato'
        const platoSequence = await prisma.secuencia.update({
            where: { nombre: 'plato' },
            data: { secuencia: { increment: 1 } },
            select: { secuencia: true },
        });

        // Crear el nuevo plato con el ID obtenido de la secuencia
        const platoCreado = await prisma.plato.create({
            data: {
                id: platoSequence.secuencia,
                nombre,
                estado: estado || 'Activo',  // Default estado to 'Activo' if not provided
            },
        });

        res.json(platoCreado);
    } catch (error) {
        console.error('Error al crear el plato:', error);
        res.status(500).json({ error: 'Error al crear el plato' });
    }
});


//Actualizar plato by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, precio, estado} = req.body;
    try {
        const platoActualizado = await prisma.plato.update({
            where: {id: parseInt(id)},
            data: {
                nombre,
                estado,
            },
        });
        res.json(platoActualizado);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el plato'});
    }
});

//Eliminar plato by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.plato.update({
            where: {id: parseInt(id)},
            data: {
                estado: 'Eliminado',
            },
        });
        res.json("Plato eliminado");
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el plato'});
    }
});

export default router;