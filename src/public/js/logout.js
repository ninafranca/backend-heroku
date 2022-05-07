function logout () {
    fetch(`http://localhost:8080/logout`, {
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
        return {status: "error", message: "Error al desloguearse"}
    })
}