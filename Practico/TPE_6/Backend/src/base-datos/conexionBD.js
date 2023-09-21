import { Sequelize } from "sequelize";
import CONSTANTES from "../constantes.js";
import modeloCiudades from "../modelos/modelo-ciudades.js";
import modeloPedidoLoQueSea from "../modelos/modelo-pedido_lo_que_sea.js";
import modeloUsuarios from "../modelos/modelo-usuarios.js";

const conexionBD = new Sequelize({
    dialect: "sqlite",
    storage: "./BD/base-DeliverEat.db"
})

export const Ciudades = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_CIUDADES,
    modeloCiudades.atributosCiudaes,
    modeloCiudades.opcionesCiudades
)

export const Usuarios = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_USUARIOS,
    modeloUsuarios.atributosUsuarios,
    modeloUsuarios.opcionesUsuarios,
)

export const PedidosLoQueSea = conexionBD.define(
    CONSTANTES.MODELOS_BD.MODELO_PEDIDO,
    modeloPedidoLoQueSea.atributosPedidoLoQueSea,
    modeloPedidoLoQueSea.opcionesPedidosLoQueSea
)

conexionBD.sync();

export default conexionBD;