import conexionBD from "../base-datos/conexionBD.js";

const obtenerCiudades = async () => {
    const resultado = await conexionBD.models.Ciudades.findAll({
        attributes:['Id', 'Nombre', 'Dir_Comercio', 'Dir_Entrega'],
        order:[['Nombre', 'ASC']]
    })

    const vecCid = resultado.map(c =>{
        return{
            id: c.dataValues.Id,
            nombre: c.dataValues.Nombre,
            direcciones:{
                comercio: c.dataValues.Dir_Comercio,
                entrega: c.dataValues.Dir_Entrega
            } 
        }
    })
    return {"ciudades": vecCid}
};

const ciudadesServicio = {obtenerCiudades};

export default ciudadesServicio;