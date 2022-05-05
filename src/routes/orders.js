import express from "express";
import {orders, carts} from "../daos/index.js";

const router = express.Router();

//GET
// Devuelve el carrito de un usuario
// router.get("/:user_id", (req, res) => {
//     let userId = req.params.user_id;
//     carts.getCartByUserId(userId).then(result => {
//         res.send(result);
//     })
// })

//POST
//Crea órden por id de carrito y usuario
router.post("/cart/:cart_id/user/:user_id", (req, res) => {
    let cartId = req.params.cart_id;
    let userId = req.params.user_id;
    carts.getCart(cartId).then(result => {
        console.log(1);
        let products = result.payload.products;
        console.log(products);
        orders.setOrder(products, userId).then(async result => {
            console.log(2);
            await carts.deleteCartById(cartId).then(result => {
                console.log(3);
                res.send(result);
                return;
            });
            //console.log(4);
            //res.send(result);
            //return;
        })
    })
})

//DELETE
//Elimina un carrito
// router.delete("/:id", (req, res) => {
//     let id = req.params.id;
//     carts.deleteCartById(id).then(result => {
//         res.send(result);
//     })
// })

export default router;