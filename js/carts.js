let ProductsInCart = localStorage.getItem("ProductInCart")
let allProducts = document.querySelector(".products")

let ProductInFav = localStorage.getItem("fav")
let allFavProducts = document.querySelector(".FavProducts")

if (ProductsInCart) {
    let item = JSON.parse(ProductsInCart)
    drawCartProducts(item)
}
if (ProductInFav) {
    let favItem = JSON.parse(ProductInFav)
    drawFavProducts(favItem)
}
//////////////////////////////////////////////////



let badge = document.querySelector(".badge")

let cartProductDiv = document.querySelector(".carts_products div")
let inner_carts_products = document.querySelector(".inner_carts_products")

let addedItem = localStorage.getItem("ProductInCart") ? JSON.parse(localStorage.getItem("ProductInCart")) : [];

function ShowItems() {

    inner_carts_products.innerHTML = "";
    addedItem.forEach((item) => {
        if (cartProductDiv != "") {
            inner_carts_products.innerHTML += `
        <div class="cart_item">${item.title} - ${item.price} <br>
            <div class="counter">
                <button class="increment" data-id=${item.id}>+</button>
                <p class="quan-${item.id}">${item.quantity}</p>
                <button class="decrement" data-id=${item.id}>-</button>
            </div>
        </div>
    `;
        }
        else {
            cartProductDiv.innerHTML = "none";
        }

    });

    ///////////////////

    let inc = document.querySelectorAll(".increment");
    inc.forEach(element => {
        element.addEventListener("click", function () {
            let id = parseInt(element.getAttribute("data-id"));
            let product = addedItem.find(item => item.id === id);
            product.quantity += 1;

            localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
            ShowItems();
            drawCartProducts(addedItem);
            TotalPrice();
        });
    });

    let dec = document.querySelectorAll(".decrement");
    dec.forEach(element => {
        element.addEventListener("click", function () {
            let id = parseInt(element.getAttribute("data-id"));
            let product = addedItem.find(item => item.id === id);
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                addedItem = addedItem.filter(item => item.id !== id);
            }

            localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
            ShowItems();
            drawCartProducts(addedItem);
            TotalPrice();
        });
    });

    badge.style.display = "block";
    let totalQuantity = addedItem.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerHTML = totalQuantity;

}
ShowItems()
TotalPrice()

if (localStorage.getItem("username")) {

    function AddToCart(id) {
        let choosenItem = products.find((item) => item.id === id);
        let exist = addedItem.find((i) => i.id === choosenItem.id)
        if (exist) {
            exist.quantity += 1;
        } else {
            choosenItem.quantity = 1;
            addedItem = [...addedItem, choosenItem]

        }

        localStorage.setItem("ProductInCart", JSON.stringify(addedItem))

        ShowItems()

    }

    function AddToFav(id) {
        let choosenItemfav = products.find((item) => item.id === id);
        FavItem = [...FavItem, choosenItemfav]
        localStorage.setItem("fav", JSON.stringify(FavItem))
        ShowItems()


    }
}
else {
    window.location = "login.html"
}
////////////////////////////////////////////////////////

let shoppingCartIcon = document.querySelector(".shopping_cart")

let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)

function opencart(e) {

    if (inner_carts_products.innerHTML != "") {

        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none"
        }
        else {
            cartsProducts.style.display = "block"
        }
    }
}
///////////////////////////////////////////////////////


function drawCartProducts(products) {
    let y = products.map((item) => {
        return `
        <div class="product_item">
                    <img class="prodect_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>the New mobile from oppo company 6-2022</p>
                        <span>color : ${item.price}</span>
                    </div>
                    <div class="counter">
                <button class="increment" data-id=${item.id}>+</button>
                <p class="quan-${item.id}">${item.quantity}</p>
                <button class="decrement" data-id=${item.id}>-</button>
            </div>
                    <div class="product_item_action">
                        <button class="remove_to_cart" onclick="RemoveFromCart(${item.id})">Remove from cart</button>
                    </div>
                </div>
        `
    })
    allProducts.innerHTML = y.join("");

    let inc = document.querySelectorAll(".increment");
    inc.forEach(element => {
        element.addEventListener("click", function () {
            let id = parseInt(element.getAttribute("data-id"));
            let product = addedItem.find(item => item.id === id);
            product.quantity += 1;

            localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
            ShowItems();
            drawCartProducts(addedItem);
            TotalPrice();
        });
    });

    let dec = document.querySelectorAll(".decrement");
    dec.forEach(element => {
        element.addEventListener("click", function () {
            let id = parseInt(element.getAttribute("data-id"));
            let product = addedItem.find(item => item.id === id);

            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                addedItem = addedItem.filter(item => item.id !== id);
            }

            localStorage.setItem("ProductInCart", JSON.stringify(addedItem));
            ShowItems();
            drawCartProducts(addedItem);
            TotalPrice();
        });
    });
}
/////////////////////////////////////

function RemoveFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem("ProductInCart")) || [];

    cartItems = cartItems.filter(item => item.id !== id);

    localStorage.setItem("ProductInCart", JSON.stringify(cartItems));

    drawCartProducts(cartItems);

    let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    let badge = document.querySelector(".badge");
    badge.style.display = "block";
    badge.innerHTML = totalQuantity;
    TotalPrice()
}

/////////////////////////////////////////
function drawFavProducts(products) {
    let y = products.map((item, fav) => {
        return `
        <div class="product_item">
                    <img class="prodect_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>the New mobile from oppo company 6-2022</p>
                        <span>color : ${item.color}</span>
                    </div>
                    <div class="product_item_action">
                        <i class="fa-solid fa-heart" style="color:red" onclick="RemoveFromFav(${item.id})"></i>
                    </div>
                </div>
        `
    })
    allFavProducts.innerHTML = y.join("");

}
//////////////////////////
function RemoveFromFav(id) {
    let favItems = JSON.parse(localStorage.getItem("fav")) || [];

    favItems = favItems.filter(item => item.id !== id);

    localStorage.setItem("fav", JSON.stringify(favItems));

    drawFavProducts(favItems);
}



function TotalPrice() {
    let cartItem = JSON.parse(localStorage.getItem("ProductInCart")) || [];
    let total = cartItem.reduce((sum, item) => (item.price * item.quantity) + sum, 0);
    localStorage.setItem("Price", total)
    let totalPrice = document.querySelector(".total")
    totalPrice.innerHTML = localStorage.getItem("Price")
    let price = document.querySelector(".price")
    if (localStorage.getItem("Price") > 0) {
        price.style.display = "block"
    }
}