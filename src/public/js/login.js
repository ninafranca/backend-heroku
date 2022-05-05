const login = document.getElementById("login");

const sendLogin = document.getElementById("loginForm");
sendLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(sendLogin);
    let sendObject = {
        email: info.get("login-email"),
        password: info.get("login-password")
    }
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        console.log(sendObject);
        location.replace("/logged")
    })
})