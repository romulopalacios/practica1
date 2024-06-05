import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const tutors = await prisma.tutor.findMany({
        where: { estado: 'Activo' }
    });
    
    res.json(tutors)
})

router.post('/', async (req, res) => {
    const { identificacion, nombre, experticia, estado } = req.body;
    const tutor = await prisma.tutor.create({
        data:{
            identificacion,
            nombre,
            experticia,
            estado
        }
    })
    res.json(tutor)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tutor = await prisma.tutor.findFirst({
        where:{
            id: parseInt(id)
        }
    })
    res.json(tutor)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { identificacion, nombre, experticia, estado } = req.body
    const actualizarTutor = await prisma.tutor.update({
        where: {
            id: parseInt(id)
        },
        data:{
            identificacion,
            nombre,
            experticia,
            estado
        }
    })
    res.json(actualizarTutor)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.tutor.update({
        where:{ 
            id: parseInt(id)
        },
        data:{
            estado: 'Eliminado',
        }
    })
    res.json("Tutor marcado como eliminado")
})

export default router;