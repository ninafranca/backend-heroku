let input = document.getElementById("info");
let email = document.getElementById("user-email");
let enter = document.getElementById("send-message");
let chatForm = document.getElementById("chat-form");
const socket = io();

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(chatForm);;
    if(input.value) {
        socket.emit('message', {email: email.innerHTML, message: input.value});
        input.value = "";
    }
    let sendObject = {
        author: {
            email: document.getElementById("user-email").innerHTML,
            name: document.getElementById("user-name").innerHTML,
            alias: info.get("alias"),
            avatar: document.getElementById("user-avatar").innerHTML,
            age: document.getElementById("user-age").innerHTML
        },
        text: info.get("text")
    }
    fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        input.value = "";
    })
})

//CUANDO RECIBA EL WELCOME, CON LA DATA QUE ME HAYA PASADO, VOY A EJECUTAR X
socket.on("messagelog", data => {
    let p = document.getElementById("log");
    let avatar = document.getElementById("user-avatar").innerHTML;
    let alias = document.getElementById("alias").value
    let date = new Date();
    let mensajes = data.map(message => {
        return `<div class="sent-msg"><img src="/images/${avatar}" alt="Avatar"> <span class="user alias">${alias}</span> <span class="user">${message.email}</span> <span class="date">[${date.toLocaleString()}] </span><span class="message">${message.message}</span></div>`
    }).join("");
    p.innerHTML = mensajes;
})