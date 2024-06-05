import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
    const tutorias = await prisma.tutoria.findMany({
        where:{
            estado: 'Activo',
            tutor: {
                estado: 'Activo'
            },
            tutorado: {
                estado: 'Activo'
            }
        },
        include: {
            tutor: true,
            tutorado: true
        }
    })
    res.json(tutorias)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tutoria = await prisma.tutoria.findUnique({
        where: {
            id: parseInt(id),
            estado: 'Activo',
            tutor: {
                estado: 'Activo'
            },
            tutorado: {
                estado: 'Activo'
            }
        },
        include: {
            tutor: true,
            tutorado: true
        }
    })
    res.json(tutoria)
})

router.post('/', async (req, res) => {
    const { asignatura, horas, fecha, hora, tutorID, tutoradoID } = req.body
    const tutoria = await prisma.tutoria.create({
        data: {
            asignatura,
            horas,
            fecha,
            hora,
            tutorID,
            tutoradoID
        }
    })
    res.json(tutoria)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { asignatura, horas, fecha, hora, tutorID, tutoradoID, estado } = req.body
    const tutoria = await prisma.tutoria.update({
        where: {
            id: parseInt(id)
        },
        data: {
            asignatura,
            horas,
            fecha,
            hora,
            tutorID,
            tutoradoID,
            estado
        },
        include: {
            tutor: true,
            tutorado: true
        }
    })
    res.json(tutoria)
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.tutoria.update({
        where: {
            id: parseInt(id)
        },
        data: {
            estado: 'Eliminado'
        }
    })
    res.json('Tutoria eliminada correctamente')
})

export default router;