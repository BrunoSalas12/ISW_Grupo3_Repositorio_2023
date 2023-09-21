import { DataTypes } from "sequelize";

const atributosUsuarios = {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Nombre:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
};

const opcionesUsuarios ={
    timestamps: false
};

const modeloUsuarios = {atributosUsuarios, opcionesUsuarios};
export default modeloUsuarios;