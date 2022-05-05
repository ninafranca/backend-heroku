import express from "express";
import {carts} from "../daos/index.js";

const router = express.Router();

//GET
// Devuelve todos los productos de un carrito
router.get("/:cart_id/productos", (req, res)=>{
    let cartId = req.params.cart_id;
    carts.getCart(cartId).then(result => {
        res.send(result);
    })
})
// Devuelve el carrito de un usuario
router.get("/:user_id", (req, res) => {
    let userId = req.params.user_id;
    carts.getCartByUserId(userId).then(result => {
        res.send(result);
    })
})

//POST 
//Crea un carrito y devuelve su id
router.post("/:user_id", (req, res) => {
    let userId = req.params.user_id;
    carts.newCart(userId).then(result => {
        res.send(result);
    }); 
})

//Agrega producto a carrito de usuario
router.post("/usuario/:user_id/producto/:prod_id", (req, res) => {
    let userId = req.params.user_id;
    let prodId = req.params.prod_id;
    carts.getCartByUserIdAddProd(userId, prodId).then(result => {
        res.send(result);
    })
})

//incorpora productos al carrito de usuario por su id de producto
router.post("/:id_cart/productos/:id_prod", (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    carts.saveProdById(prodId, cartId).then(result => {
        res.send(result);
    })
})

//DELETE
//Elimina un carrito
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    carts.deleteCartById(id).then(result => {
        res.send(result);
    })
})

//Elimina una sola equivalencia de producto del carrito por su id de producto y de carrito
router.delete("/:id_cart/producto/:id_prod", (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    carts.deleteOneCartProd(cartId, prodId).then(result => {
        res.send(result);
    })
})

//Elimina todos los IDs de mismo producto del carrito por su id de producto y de carrito
router.delete("/:id_cart/productos/:id_prod", (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    carts.deleteCartProd(cartId, prodId).then(result => {
        res.send(result);
    })
})

export default router;