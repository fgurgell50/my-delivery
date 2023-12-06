import DeliveryRepository from "../repositories/delivery.repository.js"

async function createOrder(order) {
    console.log("Entramos no Service")
    return await DeliveryRepository.insertOrder(order)
}

async function getOrders() {
    return await DeliveryRepository.getOrders()
}

async function getOrder(id) {
    return DeliveryRepository.getOrder(id)
}

async function getOrdersTrue(entregue) {
    return DeliveryRepository.getOrdersTrue(entregue)
}


async function getMostSoldProducts(entregue) {
    const orders = await getOrdersTrue(entregue);
    const productCount = {};

    // Contar as ocorrências de cada produto
    orders.forEach(order => {
        if (productCount[order.produto]) {
            productCount[order.produto]++;
        } else {
            productCount[order.produto] = 1;
        }
    });

    // Converter em um array e ordenar
    const sortedProducts = Object.entries(productCount)
                                  .sort((a, b) => b[1] - a[1]);

    // Formatar os resultados
    return sortedProducts.map(product => ({
        nome: product[0],
        quantidade: product[1]
    }));
}


async function getOrderByCliente(cliente) {
    return DeliveryRepository.getOrderByCliente(cliente)
}

async function getSumOrders(cliente) {
    const ordersByCliente = await getOrderByCliente(cliente);

    if (ordersByCliente.length > 0) {
        const totalValue = ordersByCliente.reduce((total, order) => total + order.valor, 0);
        const result = {
            Cliente: cliente,
            Total_Valor: totalValue,
            Qtde_Pedidos: ordersByCliente.length
        };
        logger.info(`GET /getSumOrders - Cliente: ${cliente}, Valor Total: ${totalValue}`);
        return result;
    } else {
        throw new Error("Nenhum pedido encontrado para o cliente especificado");
    }
}

async function getOrderByProduto(produto) {
    return DeliveryRepository.getOrderByProduto(produto)
}

async function getSumOrdersByProduct(produto) {
    const ordersByProduto = await getOrderByProduto(produto);

    if (ordersByProduto.length > 0) {
        const totalValue = ordersByProduto.reduce((total, order) => total + order.valor, 0);
        const result = {
            Produto: produto,
            Total_Valor: totalValue,
            Qtde_Pedidos: ordersByProduto.length
        };
        logger.info(`GET /getSumOrdersByProduct - Produto: ${produto}, Valor Total: ${totalValue}`);
        return result;
    } else {
        throw new Error("Nenhum pedido encontrado para o cliente especificado");
    }
}

async function deleteOrder(id) {
    return await DeliveryRepository.deleteOrder(id)

}

async function updateOrder(order) {
    return await DeliveryRepository.updateOrder(order)
}

async function updateStatusOrder(order){
    const acc = await DeliveryRepository.getOrder(order.id)
    acc.entregue = order.entregue
    return await DeliveryRepository.updateOrder(acc)
}

export default {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder,
    updateStatusOrder,
    getSumOrders,
    getOrderByCliente,
    getOrderByProduto,
    getSumOrdersByProduct,
    getMostSoldProducts,
    getOrdersTrue,
}