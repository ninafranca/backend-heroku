let registrationForm = document.getElementById("register-form");

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(document.getElementById("register-user-password").value === document.getElementById("register-user-repeat-password").value) {
        let info = new FormData(registrationForm);
        fetch("/register", {
            method: "POST",
            body: info
        })
        .then(result => {
            if (result.status === 200) {
                console.log("success");
                location.replace("/");
            } else {
                location.replace("../pages/registration-error.html");
            }
          })
    } else {
        alert("Las contraseñas no son iguales");
    }
})