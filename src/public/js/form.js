//INSTANCIO
const socket = io();
const productForm = document.querySelector("#product-form");

productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = new FormData(productForm);
    let object = {
        title: data.get("title"),
        brand: data.get("brand"),
        code: data.get("code"),
        price: data.get("price"),
        stock: data.get("stock"),
        description: data.get("description"),
        gender: data.get("gender"),
        thumbnail: data.get("thumbnail").toLowerCase()
    };
    fetch("/api/productos", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {"Content-type": "application/json"}
    })
    .then(result => {
        if (result.status === 200) {
        let sent = document.getElementById("sent");
        let sentObject = `<h2 class="sent-object">Producto añadido con éxito</h2>`;
        sent.innerHTML = sentObject;
        productForm.reset();
        setTimeout(() => {
            sent.innerHTML = "";
        }, 1500)
        return result.json();
        }
    })
    .catch(() => {
        return {status: "error", message: "Error al enviar el producto"}
    })
})

socket.on("deliverProducts", data => {
    let products = data.payload;
    fetch("templates/ProductTable.handlebars").then(string => string.text()).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            products: products
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById("deliverProducts");
        div.innerHTML = html;
    })
})