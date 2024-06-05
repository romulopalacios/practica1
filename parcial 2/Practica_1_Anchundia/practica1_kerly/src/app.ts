import server from 'express'
import { tutorRouter, tutoradoRouter, tutoriaRouter,conexion } from './routes'
import cors from 'cors'

const app = server()

app.use(server.json())

app.use('/tutor', tutorRouter)
app.use('/tutorado', tutoradoRouter)
app.use('/tutoria', tutoriaRouter)
app.use('/conexion',conexion)


app.listen(3000, () => {
    console.log('Server on port 3000')
})