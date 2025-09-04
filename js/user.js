let userInfo = document.querySelector("#user_info")

let userData = document.querySelector("#user")

let links = document.querySelector("#links")

if (localStorage.getItem("username")) {
    links.remove()
    userInfo.style.display = "flex"
    userData.innerHTML = "Hello, " + localStorage.getItem("username")
}
//////////////////////////////////////////

let logOutButton = document.querySelector("#logout")

logOutButton.addEventListener("click", function (e) {
    e.preventDefault()
    localStorage.clear()
    setTimeout(() => {
        window.location = "login.html"
    }, 1500)
})

///////////////////////////////////////////
