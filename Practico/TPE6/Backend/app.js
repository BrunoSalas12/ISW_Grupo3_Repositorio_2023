import express from 'express';
import CONSTANTES from './src/constantes.js';
import ciudadesServicio from './src/servicios/ciudades.servicio.js';
import e from 'cors';
const cors = e;
import pedidosLoQueSeaServicio from './src/servicios/pedido_lo_que_sea.servicio.js';


const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

app.get('/api/ciudades', async (req, res) => {
    try {
        const ciudades = await ciudadesServicio.obtenerCiudades()
        return res.status(200).json(ciudades)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.post('/api/pedidos_lo_que_sea', async (req, res) =>{
    try{
        const pedidoAGuardar = await pedidosLoQueSeaServicio.mapearPedido(req.body)
        await pedidosLoQueSeaServicio.insertarPedidoLoQueSea(pedidoAGuardar)
        return res.status(200)
    }catch(err){
        return res.status(500).json({error: err.message})
    }

})


app.listen(CONSTANTES.PUERTO, () => {
    console.log(`Aplicacion levantada en el puerto ${CONSTANTES.PUERTO}`)
})