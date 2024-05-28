import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


//Get pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            where: {estado: 'ACTIVO'},
            include: {
                plato: true,
                mesero: true,
            }
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los pedidos'});
    }
});

//Get pedido by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const pedido = await prisma.pedido.findUnique({
            where: {id: parseInt(id)},
            include: {
                plato: true,
                mesero: true,
            }
        });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el pedido'});
    }
});

//Crear pedido
router.post('/', async (req, res) => {
    const { platoId, meseroId, fecha, mesa, cantidad, precio, estado = "Activo" } = req.body;
    try {
        const pedidoCreado = await prisma.pedido.create({
            data: {
                id: 0,
                platoId,
                meseroId,
                fecha,
                mesa,
                cantidad,
                precio,
                estado,
            }
        });
        res.json(pedidoCreado);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el pedido'});
    }
});

//Actualizar pedido by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const { platoId, meseroId, fecha, mesa, cantidad, precio, estado } = req.body;
    try {
        const pedidoActualizado = await prisma.pedido.update({
            where: {id: parseInt(id)},
            data: {
                platoId,
                meseroId,
                fecha,
                mesa,
                cantidad,
                precio,
                estado,
            }
        });
        res.json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el pedido'});
    }
});

//Eliminar pedido by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.pedido.update({
            where: {id: parseInt(id)},
            data: {
                estado: 'Eliminado',
            }
        });
        res.json({message: 'Pedido eliminado correctamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el pedido'});
    }
});

export default router;