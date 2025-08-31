let username = document.querySelector("#username")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#sign_in")


let getUsername = localStorage.getItem("username")
let getPassword = localStorage.getItem("password")

let message = document.querySelector(".message")

let lock = document.querySelector(".fa-lock")


loginBtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (username.value === "" || password.value === "") {
        alert("Please fill form")
    } else {
        if (getUsername && getUsername.trim() === username.value.trim() && getPassword && getPassword.trim() === password.value.trim()) {
            message.style.display = "block"

            setTimeout(() => {
                window.location = "index.html"
            }, 1500)
        }
        else {
            alert("Somethin Wrong")
        }
    }
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