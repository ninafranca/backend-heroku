let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let counter = document.getElementById("counter-value");

function deleteProduct (cartId, prodId) {
    fetch(`/api/carrito/${cartId}/productos/${prodId}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al borrar el producto"}
    })
}

function deleteOneProduct (cartId, prodId) {
    fetch(`/api/carrito/${cartId}/producto/${prodId}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al borrar el producto"}
    })
}

function addProduct (cartId, prodId) {
    fetch(`/api/carrito/${cartId}/productos/${prodId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al agregar producto"}
    })
}

function deleteCart (cartId) {
    fetch(`/api/carrito/${cartId}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al borrar el producto"}
    })
}

function newOrder (cartId, userId) {
    fetch(`/orders/cart/${cartId}/user/${userId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .catch(() => {
        return {status: "error", message: "Error al crear órden"}
    })
}

function buyProduct (userId, prodId) {
    fetch(`/carrito/usuario/${userId}/producto/${prodId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .catch(() => {
        return {status: "error", message: "Error al comprar el producto"}
    })
}

function refreshCart() {
    location.reload()
}