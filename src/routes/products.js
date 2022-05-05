import express from "express";
import {products} from "../daos/index.js";
//import logger from "../public/js/logger.js";

const router = express.Router();

//GETS
router.get("/", (req, res) => {
    products.getAll().then(result => {
        res.send(result);
    })
})

router.get("/:id", (req, res) => {
    let id = req.params.id;
    products.getById(id).then(result => {
        res.send(result);
    })
})

//POST
router.post("/", (req, res) => {
    let prod = req.body;
    products.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            products.getAll().then(result => {
                req.io.emit("deliverProducts", result);
            })
        }
    })
})

//PUT
router.put("/:id", (req, res) => {
    let body = req.body;
    let id = req.params.id;
    products.updateObject(id, body).then(result => {
        res.send(result);
    })
})

//DELETE
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    products.deleteById(id).then(result => {
        res.send(result);
    })
})

export default router;