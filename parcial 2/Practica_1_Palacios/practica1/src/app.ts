import server from 'express'
import { plato, mesero, pedido,conexion } from './routes' 
import cors from 'cors'

const app = server()

app.use(cors())
app.use(server.json())

app.use('/plato', plato)
app.use('/mesero', mesero)
app.use('/pedido', pedido)
app.use('/conexion', conexion)

app.listen(4000, () => {
    console.log('Server running on port 4000')
})