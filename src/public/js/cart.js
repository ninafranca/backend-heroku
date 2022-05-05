// function deleteProduct (cartId, prodId) {
//     fetch(`http://localhost:8080/api/carrito/${cartId}/productos/${prodId}`, {
//         method: "DELETE",
//         headers: {"Content-type": "application/json"}
//     })
//     .then(result=> {
//         return result.json()
//     })
//     .then(json=> {
//         location.reload()
//     })
//     .catch(() => {
//         return {status: "error", message: "Error al borrar el producto"}
//     })
// }