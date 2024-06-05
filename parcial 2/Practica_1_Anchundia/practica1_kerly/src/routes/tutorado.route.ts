import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
    const tutorados = await prisma.tutorado.findMany({
        where: {
            estado: 'Activo'
        }
    })
    res.json(tutorados)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tutorado = await prisma.tutorado.findFirst({
        where: {
            id: parseInt(id),
            estado: 'Activo'
        }
    })
    res.json(tutorado)
})

router.post('/', async (req, res) => {
    const { identificacion, nombre } = req.body
    const tutorado = await prisma.tutorado.create({
        data: {
            identificacion,
            nombre
        }
    })
    res.json(tutorado)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { identificacion, nombre, estado } = req.body
    const tutorado = await prisma.tutorado.update({
        where: {
            id: parseInt(id)
        },
        data: {
            identificacion,
            nombre,
            estado
        }
    })
    res.json(tutorado)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.tutorado.update({
        where:{
            id: parseInt(id)
        },
        data: {
            estado: 'Eliminado'
        }
    })
    res.json("Tutorado eliminado")
})

export default router;