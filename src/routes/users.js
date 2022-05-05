import express from "express";
import {users} from "../daos/index.js";

const router = express.Router();

//GET
router.get("/", (req, res) => {
    users.getUsers().then(result => {
        res.send(result);
    })
})
router.get("/:user_id", (req, res) => {
    const userId = req.params.user_id
    users.getById(userId).then(result => {
        res.send(result);
    })
})

//POST
// router.post("/:user_id", async (req, res) => {
//     let userId = req.params.user_id;
//     console.log(userId);
//     let data = await users.saveCartToUser(userId)
//     res.send({user_cart: data})
// })

// router.post("/:user_id", (req, res) => {
//     let userId = req.params.user_id;
//     let productId = req.params.product_id;
//     carts.saveProdById(userId, cartId).then(result => {
//         res.send(result);
//     })
// })

export default router;