import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import exp from "constants";

const router = Router();
const prisma = new PrismaClient();

//Get meseros
router.get('/', async (req, res) => {
    try {
        const meseros = await prisma.mesero.findMany();
        res.json(meseros);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los meseros'});
    }
});

//Get mesero by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const mesero = await prisma.mesero.findUnique({
            where: {id: parseInt(id)},
        });
        res.json(mesero);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el mesero'});
    }
});

//Crear mesero
router.post('/', async (req, res) => {
    const {nombre, sueldo_basico, nivel, estado = "Activo"} = req.body;
    try {
        const meseroCreado = await prisma.mesero.create({
            data: {
                id: 0,
                nombre,
                sueldo_basico,
                nivel,
                estado
            },
        });
        res.json(meseroCreado);
    } catch (error) {
        res.status(500).json({error: 'Error al crear el mesero'});
    }
});

//Actualizar mesero by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, sueldo_basico, nivel, estado} = req.body;
    try {
        const meseroActualizado = await prisma.mesero.update({
            where: {id: parseInt(id)},
            data: {
                nombre,
                sueldo_basico,
                nivel,
                estado
            },
        });
        res.json(meseroActualizado);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el mesero'});
    }
});

//eliminar mesero by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const meseroEliminado = await prisma.mesero.delete({
            where: {id: parseInt(id)},
        });
        res.json(meseroEliminado);
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el mesero'});
    }
});

export default router;