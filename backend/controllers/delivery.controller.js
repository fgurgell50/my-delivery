
import DeliveryService from "../services/delivery.service.js"


async function createOrder ( req, res, next ) {
    try {
        let order = req.body;

        if( !order.cliente || !order.produto || order.valor == null  ){
            throw new Error(" Cliente, produto e Valor são obrigatórios. ")
        }

        console.log("Passamos da Validacao do Controller")

        order = await DeliveryService.createOrder(order)

        res.send(order)
        logger.info(`POST /order - ${JSON.stringify(order)}`)
    } catch (err) {
        next(err)
    }
}

async function getOrders(req, res, next) {
    try {
        res.send(await DeliveryService.getOrders())
        logger.info("GET/orders")
    } catch (err) {
        next(err)
    }    
}

async function getMostSoldProducts(req, res, next){
    try {

        if(req.params.entregue !== 'true' && req.params.entregue !== 'false'){
            throw new Error("Status de Entrega é obrigatórios.")
        }

        res.send(await DeliveryService.getMostSoldProducts(req.params.entregue))
        logger.info("GET/mostsoldorders/:entregue")
    } catch (err) {
        next(err)
    }    

}

async function getOrdersTrue(req, res, next) {
    try {
        res.send(await DeliveryService.getOrdersTrue(req.params.entregue))
        logger.info("GET/orderstrure/:entregue")
    } catch (err) {
        next(err)
    }
}

async function getOrder(req, res, next) {
    try {
        res.send(await DeliveryService.getOrder(req.params.id))
        logger.info("GET/order/:id")
    } catch (err) {
        next(err)
    }
}

async function getOrderByCliente(req, res, next) {
    try {
        if(!req.params.cliente){
            throw new Error(" Cliente é obrigatórios. ")
        }

        logger.info("Passamos da Validacao do Controller")

        res.send(await DeliveryService.getOrderByCliente(req.params.cliente))
        logger.info("GET/orderbycliente/:cliente")
    } catch (err) {
        next(err)
    }
}

async function getOrderByProduto(req, res, next) {
    try {
        if(!req.params.produto){
            throw new Error(" Produto é obrigatórios. ")
        }

        logger.info("Passamos da Validacao do Controller")

        res.send(await DeliveryService.getOrderByProduto(req.params.produto))
        logger.info("GET/getOrderByProduto/:produto")
    } catch (err) {
        next(err)
    }
}

async function getSumOrders(req, res, next) {

    try {
        res.send(await DeliveryService.getSumOrders(req.params.cliente))
        logger.info("GET/order/:id")
    } catch (err) {
        next(err)
    }
}

async function getSumOrdersByProduct(req, res, next) {
    try {
        res.send(await DeliveryService.getSumOrdersByProduct(req.params.produto))
        logger.info("GET/ordersbyproduct/:produto")
    } catch (err) {
        next(err)
    }

}


async function deleteOrder(req, res, next) {
    try {
        await DeliveryService.deleteOrder(req.params.id)
            res.send("Deletado com sucesso!")
        
    } catch (err) {
        next(err)
    }
}

async function updateOrder(req, res, next) {
    try {

        let order = req.body;

        if( !order.id || !order.cliente || !order.produto || order.valor == null  ){
            throw new Error(" Id, Cliente e Produto e Valor são obrigatórios. ")
        }
    
        res.send(await DeliveryService.updateOrder(order))
        logger.info(`PUT /updateOrder - ${JSON.stringify(order)}`)
    } catch (err) {
        next(err)
    }
}

async function updateStatusOrder(req, res, next) {
    try {
        let order = req.body;

        if( !order.id || !order.entregue == null || typeof order.entregue !== 'boolean'){
            throw new Error(" Id e Status de Entrega são obrigatórios. ")
        }

        res.send( await DeliveryService.updateStatusOrder(order) )
        logger.info(`PATCH /updateStatusOrder - ${JSON.stringify(order)}`)
    } catch (err) {
        next(err)
    }
}

export default {
    createOrder,
    getOrder,
    getOrders,
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