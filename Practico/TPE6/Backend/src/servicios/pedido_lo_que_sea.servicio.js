import { PedidosLoQueSea } from "../base-datos/conexionBD.js"
import CONSTANTES from "../constantes.js";

const mapearPedido = (pedidoReq) => {
    let pedidoLQS = PedidosLoQueSea.build();
    pedidoLQS.Desc_Objetos = pedidoReq.desc_objetos;
    pedidoLQS.Id_Ciudad = pedidoReq.ciudad.id;
    pedidoLQS.Dir_Comercio = pedidoReq.calle_comercio + ' ' + pedidoReq.nro_comercio + ' - referencia: ' + pedidoReq.ref_comercio;
    pedidoLQS.Dir_Entrega = pedidoReq.calle_entrega + ' ' + pedidoReq.nro_entrega + ' - referencia: ' + pedidoReq.ref_entrega;
    pedidoLQS.Forma_Pago = pedidoReq.forma_pago;
    if (pedidoReq.forma_pago == CONSTANTES.METODOS_FORMA_PAGO.METODO_EFECTIVO) {
        pedidoLQS.Monto_Efectivo = pedidoReq.monto_efectivo;
    }
    else if (pedidoReq.forma_pago == CONSTANTES.METODOS_FORMA_PAGO.METODO_TARJETA_CREDITO) {
        pedidoLQS.Numero_TC = pedidoReq.datos_tarjeta.number;
        pedidoLQS.Nombre_Titular_TC = pedidoReq.datos_tarjeta.name;
        pedidoLQS.Fecha_Vencimiento_TC = pedidoReq.datos_tarjeta.expiry;
        pedidoLQS.CVC_TC = pedidoReq.datos_tarjeta.cvc;
    }
    pedidoLQS.Fecha_Entrega = pedidoReq.fecha_entrega + ' ' + (pedidoReq.hora_entrega === undefined ? '' : pedidoReq.hora_entrega);
    pedidoLQS.Monto_Total = pedidoReq.monto_total;
    pedidoLQS.Id_Usuario = 1;
    return pedidoLQS;
};


const insertarPedidoLoQueSea = async (pedidoAGuardar) => {
    await pedidoAGuardar.save();
};

const pedidosLoQueSeaServicio = { insertarPedidoLoQueSea, mapearPedido };

export default pedidosLoQueSeaServicio;