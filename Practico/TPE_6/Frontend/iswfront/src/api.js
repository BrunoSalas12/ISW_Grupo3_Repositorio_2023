const BASE_PATH = 'http://localhost:8080/api';

export async function fetchCiudades() {
    try {
        const response = await fetch(`${BASE_PATH}/ciudades`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
}

export async function postPedido(pedido) {
    try {
        const response = await fetch(`${BASE_PATH}/pedidos_lo_que_sea`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedido)
        })
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);
    } catch (e) {
        console.log('Error enviando el pedido: ', e);
    }
}
