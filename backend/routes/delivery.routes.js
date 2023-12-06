import exppress from "express";

const router = exppress.Router();

import DeliveryController from "../controllers/delivery.controller.js"


// npx nodemon index.js

router.post("/", DeliveryController.createOrder) 

router.get("/", DeliveryController.getOrders)

// Get a Most Sold Products
router.get("/mostproducts/:entregue", DeliveryController.getMostSoldProducts)

//Get a Products eentregues
router.get("/product/:entregue", DeliveryController.getOrdersTrue)

// Get user by Id
router.get("/:id", DeliveryController.getOrder)

// Get orders by Cliente
router.get("/orders/:cliente", DeliveryController.getOrderByCliente)

// Get a sum orders by Cliente
router.get("/sumorders/:cliente", DeliveryController.getSumOrders)

// Get orders by Produto
router.get("/ordersbyproduct/:produto", DeliveryController.getOrderByProduto)

// Get orders by Produto
router.get("/sumordersbyproduct/:produto", DeliveryController.getSumOrdersByProduct)

// Delete user by Id
router.delete("/:id", DeliveryController.deleteOrder) 

//put atualizar os dados de toda conta
// patch atualizar somente alguns dados

// Update user 
router.put("/", DeliveryController.updateOrder)

// Update a Balance Account by id 
router.patch("/updateStatusOrder/:id", DeliveryController.updateStatusOrder)

router.use((err, req, res, next) => {
    logger.error(`${err.message}`)
    //console.log(err)
    res.status(400).send( {error: err.message })
})


export default router;
