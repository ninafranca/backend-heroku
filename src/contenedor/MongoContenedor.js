import mongoose from "mongoose";
import config from "../config/config.js";
import {normalize, denormalize, schema} from "normalizr";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";
const logger = createLogger(envConfig.NODE_ENV);

mongoose.connect(config.mongo.baseUrl, {useNewUrlParser: true, useUnifiedTopology: true});

export default class MongoContenedor {  

    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps));
    }

    //MÉTODOS PRODUCTOS
    async getAll() {
        try {
            const readFile = await this.collection.find();
            return {status: "success", payload: readFile}
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error buscando productos"}
        }
    }

    async getById(id) {
        try {
            const product = await this.collection.findById(id);
            if(!product) {
                logger.error(error.message);
                return {status: "error", message: "Producto no encontrado"}
            } else {
                return {status: "success", payload: product}
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error buscando el producto"}
        }
    }

    async save(product) {
        try {
            let exists = await this.collection.findOne({title: {$eq: product.title}});
            if(exists) {
                logger.error(error.message);
                return {status: "error", message: "El producto ya existe"}
            }
            let newProduct = await this.collection.create(product);
            return {status: "success", payload: newProduct}
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al guardar producto"}
        }
    }

    async updateObject(id, body) {
        try {
            let product = await this.collection.findById(id);
            if(product) {
                await product.updateOne(body);
                return {status: "success", message: "Producto actualizado exitosamente"};
            }
            logger.error(error.message);
            return {status: "error", message: "No hay productos con el id especificado"}
        } catch(error) {
            return {status: "error", message: "Fallo al actualizar el producto: "}
        }
    }

    // async deleteById(id) {
    //     try {
    //         let product = await this.collection.findOne(id)
    //         if(product) {
    //             await product.update("delete");
    //             return {status: "success", message: "Producto borrado exitosamente"};
    //         }
    //         logger.error(error.message);
    //         return {status: "error", message: "Producto inexistente"};
    //     } catch(error) {
    //         logger.error(error.message);
    //         return {status: "error", message: "Error borrando producto"};
    //     }
    //}
    async deleteById(id) {
        try {
            let product = await this.collection.findById(id)
            if(product) {
                await this.collection.findByIdAndDelete(id);
                return {status: "success", message: "Producto borrado exitosamente"};
            }
            logger.error(error.message);
            return {status: "error", message: "Producto inexistente"};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error borrando producto"};
        }
    }

    async getByCategory(gender) {
        try {
            const category = await this.collection.find({gender: gender});
            if(!category) {
                logger.error(error.message);
                return {status: "error", message: "No existe la categoría"};
            } else {
                return {status: "success", payload: category};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

    //MÉTODOS CARRITO
    async newCart(userId) {
        try {
            const hasCart = this.collection.findOne({user: userId});
            console.log(hasCart);
            if(hasCart) {
                logger.error(error.message);
                return {status: "error", message: "Usuario ya tiene carrito"};
            }
            const cart = await this.collection.create({products: [], user: userId});
            return {status: "success", payload: cart};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al crear carrito"};
        }
    }

    //Agrego validación si ya existe el producto en el carrito
    async saveProdById(productId, id) {
        try {
            await this.collection.findByIdAndUpdate(id, {$push: {products: productId }});
            return {status: "success", message: "El producto se ha guardado exitosamente"};
            // let cartProduct = await this.collection.findById(id).findOne({products: productId});
            // if(cartProduct) {
            //     return {status: "error", message: "Producto ya existente en carrito"}
            // } else {
            //     await this.collection.findByIdAndUpdate(id, {$push: {products: productId }});
            //     return {status: "success", message: "El producto se ha guardado exitosamente"};
            // }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al añadir producto"};
        }
    }

    async getCart(id) {
        try {
            let cart = await this.collection.findById(id);
            if(!cart) {
                logger.error(error.message);
                return {status: "error", message: "El carrito no existe"};
            } else {
                return {status: "success", payload: cart};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al obtener carrito" + error};
        }
    }

    async getCartByUserId(userId) {
        try {
            // const user = await users.findById(userId);
            // if(!user) return {status: "error", message: "El usuario no existe"};
            let cart = await this.collection.findOne({user: userId});
            if(!cart) {
                logger.error(error.message);
                return {status: "error", message: "El usuario no cuenta con carrito existente"};
            }
            let productsId = cart.products;
            let cartId = cart._id;
            return {status: "success", payload: cart}
        } catch(error) {
            logger.error(`Error encontrando carrito de usuario`);
            return {status: "error", message: "Error encontrando carrito de usuario"};
        }
    }

    // async getCartByUserIdAddProd(userId, productId) {
    //     try {
    //         const userCart = await this.collection.findOne({user: userId});
    //         console.log(userCart);
    //         if(!userCart) {
    //             let createCart = await this.collection.create({products: {id: productId, quantity: 1}, user: userId});
    //             let cart = await this.collection.findOne({user: userId});
    //             return {status: "success", payload: cart}
    //         } else {
    //             let productInCart = cart.findOne({products: {id: productId}});
    //             console.log(productInCart);
    //             if(productInCart) {
    //                 let addProdToCart = await userCart.findOneAndUpdate({products: {id: productId}}, {$inc: {products: {quantity: +1}}});
    //                 return {status: "success", payload: addProdToCart};
    //             } else {
    //                 let addNewProdToCart = await userCart.insertOne({products: {id: productId, quantity: 1}});
    //                 return {status: "success", payload: cart};                  
    //             }
    //         }
    //     } catch(error) {
    //         //logger.error(error.message);
    //         return {status: "error", message: error.message};
    //     }
    // }
    async getCartByUserIdAddProd(userId, productId) {
        try {
            const userCart = await this.collection.findOne({user: userId});
            console.log(userCart);
            if(!userCart) {
                let createCart = await this.collection.create({products: productId, user: userId});;
                let cart = await this.collection.findOne({user: userId});
                return {status: "success", payload: cart}
            } else {
                let addProdToCart = await this.collection.findByIdAndUpdate(userCart._id, {$push: {products: productId}})
                return {status: "success", payload: cart}
            }
        } catch(error) {
            logger.error(`Error agregando producto a carrito`);
            return {status: "error", message: error.message};
        }
    }

    async deleteCartById(cartId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "El carrito no existe"};
            } else {
                await this.collection.findByIdAndDelete(cartId);
                return {status: "success", message: "El carrito se ha borrado exitosamente"};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al borrar carrito"};
        }
    }

    async deleteOneCartProd(cartId, productId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.collection.findById(cartId).findOne({products: productId});
                if (!product) {
                    logger.error(error.message);
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.collection.findById(cartId).updateOne({products: productId}, {$set: {"products.$": "delete"}});
                    await this.collection.findOneAndUpdate("delete", {$pull: { products: "delete"}})
                    return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
            logger.error(error.message);
            return {status: 'error', message: error.message}
        }
    }

    async deleteCartProd(cartId, productId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.collection.findById(cartId).findOne({products: productId});
                if (!product) {
                    logger.error(error.message);
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.collection.findByIdAndUpdate(cartId, {$pull: {products: productId}})
                    return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
            logger.error(error.message);
            return {status: 'error', message: error.message}
        }
    }

    //MÉTODOS CHAT
    async getAllMessages() {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                logger.error(error.message);
                return {status: "error", message: "No hay mensajes"};
            } else {
                return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error leyendo los mensajes"};
        }
    }

    async saveMessage(message) {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                await this.collection.create();
                await this.collection.create(message);
            } else {
                await this.collection.create(message);
                let id = 1
                for (let message of readFile) {
                    message.id = id
                    id++
                }
                const data= {
                    "id": id,
                    "mensajes": JSON.parse(JSON.stringify(readFile))
                }
                const authorSchema = new schema.Entity("authors")
                const messageSchema = new schema.Entity("messages",{
                    author: authorSchema
                })
                const chatSchema = new schema.Entity("chats", {
                    author: authorSchema,
                    mensajes: [messageSchema]
                })
                const normalizedData= normalize(data,chatSchema)
                //const denormalizedData = denormalize(data.result, chatSchema, data.entities);
                return {status: "success", payload: normalizedData};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "No se ha podido guardar el mensaje"};
        }
    }

    //MÉTODOS USERS
    async getUsers() {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                logger.error(error.message);
                return {status: "error", message: "No hay usuarios"};
            } else {
                return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error leyendo los usuarios"};
        }
    }

    async saveUser(user) {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                await this.collection.create();
                let exists = await this.collection.findOne({email: user.email});
                if(exists) {
                    logger.error(error.message);
                    return {status: "error", message: "Ya existe usuario con mismo e-mail"};
                }
                await this.collection.create(user);
            } else {
                let exists = await this.collection.findOne({email: user.email});
                if(exists) {
                    logger.error(error.message);
                    return {status: "error", message: "Ya existe usuario con mismo e-mail"};
                } else {
                    let newUser = await this.collection.create(user);
                    return {status: "success", payload: newUser};
                }
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

    async getByEmail(email) {
        try {
            const userFound = await this.collection.findOne({email: email});
            console.log(userFound);
            if(!userFound) {
                logger.error(error.message);
                return {status: "error", message: "No existe el usuario"};
            } else {
                return {status: "success", payload: userFound};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

    async getById(id) {
        try {
            const userFound = await this.collection.findById({_id: id});
            console.log(userFound);
            if(!userFound) {
                logger.error(error.message);
                return {status: "error", message: "No existe el usuario"};
            } else {
                return {status: "success", payload: userFound};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

    //MÉTODO ORDERS
    async setOrder(products, userId) {
        try {
            const order = await this.collection.create({products: products, user: userId});
            return {status: "success", payload: order};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al crear órden"};
        }
    }

}