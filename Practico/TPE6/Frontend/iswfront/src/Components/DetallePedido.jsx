import '../Styles/detallepedidos.css';

import { useEffect, useState } from 'react';

import { Modal, Box, Typography, Grid, Alert, AlertTitle, Stack, CircularProgress, Button } from "@mui/material"
import { FORMA_PAGO } from "../utils/common"
import { postPedido } from "../api"

const lineStyle = { margin: '10px 0px 10px 0px', width: '65vw', height: '2px', backgroundColor: 'white' }

const ButtonProgress = ({ done, loading, setLoading, setDone, handleSend }) => {
    if (done) {
        return (<Alert
            severity="success">
            <AlertTitle>Pedido Enviado</AlertTitle>
            El pedido fue enviado con éxito!
        </Alert>)
    } else if (loading) {
        return (<button
            className='botonConfirmarDetallePedido align-center rounded-full py-2 px-4' >
            <CircularProgress />
        </button>)
    } else {
        return (<button
            className='botonConfirmarDetallePedido align-center rounded-full py-2 px-4'
            onClick={() => {
                handleSend();
                setLoading(true);
                setTimeout(() => { setDone(true); setLoading(false) }, 1000)
            }}>
            Confirmar
        </button>)
    }
}

export default function DetallePedido({ confirmationModal, setConfirmationModal, form }) {

    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDone(false);
        setLoading(false);
    }, []);

    const handleSend = () => {
        postPedido(form);
    }

    return (
        <Modal
            open={confirmationModal}
            onClose={() => setConfirmationModal(!confirmationModal)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                display: 'flex',
                margin: '2rem',
                backgroundColor: '#007090',
                color: '#EAEBED',
                padding: '1rem',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                <Stack>
                    <Typography sx={{ fontFamily: 'Montserrat', textAlign: 'center', textJustify: 'center', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                        <b>Detalle del pedido</b><br />
                        <Grid style={lineStyle}></Grid>
                        <b>Descripcion de pedido</b><br />
                        {form.desc_objetos} <br />
                        <Grid style={lineStyle}></Grid>
                        <b>Comercio </b><br />
                        {form.ciudad?.nombre} <br />
                        {form.calle_comercio} {form.nro_comercio} <br />
                        {form.ref_comercio} <br />
                        <Grid style={lineStyle}></Grid>
                        <b>Entrega </b><br />
                        {form.ciudad?.nombre} <br />
                        {form.calle_entrega} {form.nro_entrega} <br />
                        {form.ref_entrega} <br />
                        <Grid style={lineStyle}></Grid>
                        <b>Monto Total </b><br />
                        ${form.monto_total} <br />
                        <Grid style={lineStyle}></Grid>
                        <b>Forma de Pago </b><br />
                        {form.forma_pago} <br />
                        {form.forma_pago === FORMA_PAGO.EFECTIVO && '$ ' + form.monto_efectivo}
                        <Grid style={lineStyle}></Grid>
                        <b>Fecha de Entrega </b><br />
                        {form.fecha_entrega === 1 ? "Lo antes posible" : form.fecha_entrega + ' ' + form.hora_entrega}
                        <Grid style={lineStyle}></Grid>
                    </Typography>
                    <Grid className='containerBotonDetalleConfirmar'>
                        <ButtonProgress done={done} loading={loading} setLoading={setLoading} setDone={setDone} handleSend={handleSend} />
                    </Grid>
                </Stack>
            </Box>
        </Modal>
    )
}