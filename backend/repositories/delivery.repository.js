import { promises as fs } from "fs";

const { readFile, writeFile } = fs;


async function insertOrder(order) {
    const data = JSON.parse (await readFile(global.fileName))

    //account.id = data.nextId
    //data.nextId++
    //account = { id: data.nextId++, ...account }
    order = {
        id: data.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: false,
        timestamp: new Date()
    }
    data.pedidos.push(order)

    await writeFile(global.fileName, JSON.stringify(data, null, 2))

    return order
}

async function getOrders() {
    const data = JSON.parse (await readFile(global.fileName))
    return data.pedidos
}

async function getOrder(id){
    const orders = await getOrders()
    const order = orders.find(order => order.id === parseInt(id))
    if(order){
        return order
    }
    throw new Error("Registro nao encontrado")
}

async function getOrdersTrue(entregue){
    const orders = await getOrders()
    const order = orders.filter(order => order.entregue === true)
    if(order){
        return order
    }
    throw new Error("Registro nao encontrado")
}


async function getOrderByCliente(cliente){
    const orders = await getOrders()
    const order = orders.filter(order => order.cliente === cliente &&
        order.entregue === true)
    if(order){
        return order
        logger.info(`GET /orderbycliente - ${JSON.stringify(order)}`)
    }
    throw new Error("Registro nao encontrado")
}

async function getOrderByProduto(produto){
    const orders = await getOrders()
    const order = orders.filter(order => order.produto === produto &&
        order.entregue === true)
    if(order){
        return order
        logger.info(`GET /orderbyproduto - ${JSON.stringify(order)}`)
    }
    throw new Error("Registro nao encontrado")
}

async function deleteOrder(id){
    const data = JSON.parse (await readFile(global.fileName))     
    if( !id ){
        throw new Error(" Id é obrigatório. ")
    }
    data.pedidos = data.pedidos.filter(
        order => order.id !== parseInt(id))
     await writeFile( global.fileName, JSON.stringify(data, null, 2)) 
}

async function updateOrder(order){
    const data = JSON.parse (await readFile(global.fileName))

    const index = data.pedidos.findIndex(a => a.id === order.id)

    if( index === -1 ) {
        throw new Error(" Registro não encontrado.")
    }

    data.pedidos[index].cliente = order.cliente
    data.pedidos[index].produto = order.produto
    data.pedidos[index].valor = order.valor
    data.pedidos[index].entregue = order.entregue
    data.pedidos[index].timestamp = new Date()
  

    await writeFile(global.fileName, JSON.stringify(data, null, 2))

    return data.pedidos[index]

}

export default {
    getOrders,
    insertOrder,
    getOrder,
    deleteOrder,
    updateOrder,
    getOrderByCliente,
    getOrderByProduto,
    getOrdersTrue,
}