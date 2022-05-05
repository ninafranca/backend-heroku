let user = {}

fetch('/logged')
    .then(result => {
        if (result.status !== 200) location.replace("/login");
        return result.json();
    })
    .then(response => {
        user = response;
        userProfile(response);
        fetchProducts();
})

const userProfile = (user) => {
    const avatar = document.getElementById("register-user-avatar")
    if (avatar && user.avatar) {avatar.setAttribute("src", user.avatar)}
    const email = document.getElementById("email")
    if (email) {email.innerText = user.email}
    const role = document.getElementById("role")
    if (role) {role.innerText = user.role}
}