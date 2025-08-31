let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

let registerBtn = document.querySelector("#sign_up")

let lock = document.querySelector(".fa-lock")

let message = document.querySelector(".message")
registerBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (username.value === "" || email.value === "" || password.value === "") {
        alert("Please fill form")
    } else {
        localStorage.setItem("username", username.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("password", password.value)
        message.style.display = "block"
        setTimeout(() => {
            window.location = "login.html"
        }, 1000)
    }
})

email.addEventListener("focus", function () {
    email.placeholder = ""
    email.style.fontWeight = "600"
    email.style.color = "white"
})
email.addEventListener("blur", function () {
    email.placeholder = "Enter email"
})
username.addEventListener("focus", function () {
    username.placeholder = ""
    username.style.fontWeight = "600"
    username.style.color = "white"
})
username.addEventListener("blur", function () {
    username.placeholder = "Enter Username"
})
password.addEventListener("focus", function () {
    lock.style.display = "none"
    password.placeholder = ""
    password.style.fontWeight = "600"
    password.style.color = "white"
})
password.addEventListener("blur", function () {
    password.placeholder = "Enter password"
    lock.style.display = "block"

})