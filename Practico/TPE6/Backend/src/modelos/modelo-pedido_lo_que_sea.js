import { DataTypes } from "sequelize";
import CONSTANTES from "../constantes.js";

const atributosPedidoLoQueSea = {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Desc_Objetos:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Id_Ciudad:{
        type: DataTypes.INTEGER,
        references: {
            model: CONSTANTES.MODELOS_BD.MODELO_CIUDADES,
            key: 'Id'
          }
    },
    Dir_Comercio:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Dir_Entrega:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Forma_Pago:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Monto_Efectivo:{
        type: DataTypes.INTEGER
    },
    Numero_TC:{
        type: DataTypes.TEXT
    },
    Nombre_Titular_TC:{
        type: DataTypes.TEXT
    },
    Apellido_Titular_TC:{
        type: DataTypes.TEXT
    },
    Fecha_Vencimiento_TC:{
        type: DataTypes.TEXT
    },
    CVC_TC:{
        type: DataTypes.TEXT
    },
    Fecha_Entrega:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Monto_Total:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Usuario:{
        type: DataTypes.INTEGER,
        references: {
            model: CONSTANTES.MODELOS_BD.MODELO_USUARIOS,
            key: 'Id'
          }
    }
};

const opcionesPedidosLoQueSea ={
    timestamps: false
};

const modeloPedidoLoQueSea = {atributosPedidoLoQueSea, opcionesPedidosLoQueSea};
export default modeloPedidoLoQueSea;