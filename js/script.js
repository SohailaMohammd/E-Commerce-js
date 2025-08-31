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

/////////////////////////////////////////////

let allProducts = document.querySelector(".products")
let addedItem = localStorage.getItem("ProductInCart") ? JSON.parse(localStorage.getItem("ProductInCart")) : [];
let FavItem = localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav")) : [];
let btn = document.querySelector(".add_to_cart")


let products = [
    {
        id: 1,
        title: "Butterfly Bracelet",
        price: 350,
        category: "Bracelet",
        imageUrl: "Images/ButterflyBracelet.jpg",
        quantity: 1
    },
    {
        id: 2,
        title: "Pink Pandora",
        price: 550,
        category: "ring",
        imageUrl: "Images/pinkring.jpg",
        quantity: 1
    }, {
        id: 3,
        title: "Green Necklace",
        price: 500,
        category: "necklace",
        imageUrl: "Images/greenNecklace.jpg",
        quantity: 1
    }, {
        id: 4,
        title: "Flower Ring",
        price: 230,
        category: "ring",
        imageUrl: "Images/floerring.jpg",
        quantity: 1
    },
    {
        id: 5,
        title: "White Bracelet",
        price: 140,
        category: "Bracelet",
        imageUrl: "Images/whiteBracelet.jpg",
        quantity: 1
    }, {
        id: 6,
        title: "Gold Butterfly ",
        price: 320,
        category: "necklace",
        imageUrl: "Images/butterflyNecklace.jpg",
        quantity: 1
    }, {
        id: 7,
        title: "Flower Bracelet",
        price: 540,
        category: "Bracelet",
        imageUrl: "Images/FlowerBracelet.jpg",
        quantity: 1
    }, {
        id: 8,
        title: "Purple Ring",
        price: 600,
        category: "ring",
        imageUrl: "Images/purplering.jpg",
        quantity: 1
    },
    {
        id: 9,
        title: "Modern Necklace",
        price: 450,
        category: "necklace",
        imageUrl: "Images/goldNecklace.jpg",
        quantity: 1
    }, {
        id: 10,
        title: "Butterfly Ring",
        price: 540,
        category: "ring",
        imageUrl: "Images/flyring.jpg",
        quantity: 1
    }, {
        id: 11,
        title: "Branches Bracelet",
        price: 380,
        category: "Bracelet",
        imageUrl: "Images/BranchesBracelet.jpg",
        quantity: 1
    },
    {
        id: 12,
        title: "PinkFlower Necklace",
        price: 620,
        category: "necklace",
        imageUrl: "Images/flowerNecklace.jpg",
        quantity: 1
    }

]
function drawItems(products) {
    let y = products.map((item) => {
        let isFav = FavItem.find((i) => item.id === i.id);
        let color = isFav ? "red" : "black"

        let isPro = addedItem.find((i) => item.id === i.id);

        let backgroundcol = isPro ? "red" : "green"
        let content = isPro ? "Remove From Cart" : "Add To Cart"


        return `
        <div class="product_item col-md-3">
                    <img class="prodect_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>Price: ${item.price}</p>
                        <span>category : ${item.category}</span>
                    </div>
                    <div class="product_item_action">
                        <i class="fa-solid fa-heart" onclick="AddToFav(${item.id},this)" style="color:${color}"></i>
                        <button class="add_to_cart" onclick="AddToCart(${item.id},this)" style="background:${backgroundcol}">${content}</button>
                    </div>
                </div>
        `
    })
    allProducts.innerHTML = y.join("");
}
drawItems(products)
////////////////////////////////////////////////
// let SearchByName = document.querySelector("#name")
// let SearchByCategory = document.querySelector("#category")

let searchMood = 'title';

function getSearch(value) {
    let input = document.querySelector(".input")

    if (value == "name") {
        searchMood = 'title';
        input.placeholder = "Search By Name"
        input.addEventListener("keyup", function (e) {
            let value = e.target.value;
            search(value)
        })
        function search(value) {
            let filteredItems = products.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );

            drawItems(filteredItems);

        }
    }
    else {
        searchMood = 'category'
        input.placeholder = "Search By Category"
        input.addEventListener("keyup", function (e) {
            let value = e.target.value;
            search(value)
        })
        function search(value) {
            let filteredItems = products.filter((item) =>
                item.category.toLowerCase().includes(value.toLowerCase())
            );

            drawItems(filteredItems);

        }
    }
}


//////////////////////////////////////////////////

let badge = document.querySelector(".badge")

let cartProductDiv = document.querySelector(".carts_products div")
let inner_carts_products = document.querySelector(".inner_carts_products")




function ShowItems() {

    inner_carts_products.innerHTML = "";
    addedItem.map((item, index) => {
        if (cartProductDiv != "") {
            inner_carts_products.innerHTML += `
        <div class="cart_item">${item.title} - ${item.price} <br>
            <div class="counter">
                <button class="increment" data-index=${index}>+</button>
                <p class="quan-${item.id}">${item.quantity}</p>
                <button class="decrement" data-index=${index}>-</button>
            </div>
        </div>
    `;
        }
        else {
            cartProductDiv.innerHTML = "none";
        }

    });

    ///////////////////
    let inc = document.querySelectorAll(".increment")

    inc.forEach(element => {

        element.addEventListener("click", function () {
            let index = element.getAttribute("data-index");
            addedItem[index].quantity += 1;
            localStorage.setItem("ProductInCart", JSON.stringify(addedItem))
            addedItem = localStorage.getItem("ProductInCart") ? JSON.parse(localStorage.getItem("ProductInCart")) : [];

            ShowItems()
        })
    });

    let dec = document.querySelectorAll(".decrement")

    dec.forEach(element => {
        element.addEventListener("click", function () {
            let index = element.getAttribute("data-index");
            if (addedItem[index].quantity > 1) {
                addedItem[index].quantity -= 1;
            }
            else {
                addedItem.splice(index, 1);
            }
            localStorage.setItem("ProductInCart", JSON.stringify(addedItem))
            addedItem = localStorage.getItem("ProductInCart") ? JSON.parse(localStorage.getItem("ProductInCart")) : [];
            ShowItems()
        })
    });
    badge.style.display = "block";
    let totalQuantity = addedItem.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerHTML = totalQuantity;

}
ShowItems()
function change(id) {

    let btn = document.querySelector(".add_to_cart")

    // let getPro = localStorage.getItem("ProductInCart") ? JSON.parse(localStorage.getItem("ProductInCart")) : [];

    let choosenItem = products.find((item) => item.id === id);
    let exist = addedItem.find((i) => i.id === choosenItem.id)
    // let exist = getPro.find((i) => i.id === id)
    if (exist) {
        btn.innerHTML = "Remove From Cart"
        btn.style.background = "red"
        btn.style.color = "white"
    } else {
        btn.innerHTML = "Add To Cart"
        btn.style.background = "green"
        btn.style.color = "white"
    }

}
if (localStorage.getItem("username")) {


    function AddToCart(id, btn) {
        let choosenItem = products.find((item) => item.id === id);
        let exist = addedItem.find((i) => i.id === choosenItem.id)
        if (exist) {
            // exist.quantity += 1;
            addedItem = addedItem.filter((i) => i.id !== choosenItem.id);
            btn.innerHTML = "Add To Cart";
            btn.style.background = "green";
            btn.style.color = "white";
        } else {
            choosenItem.quantity = 1;
            addedItem = [...addedItem, choosenItem]
            btn.innerHTML = "Remove From Cart";
            btn.style.background = "red";
            btn.style.color = "white";
        }
        localStorage.setItem("ProductInCart", JSON.stringify(addedItem))


        ShowItems()

    }

    function AddToFav(id, btnfav) {
        let choosenItemfav = products.find((item) => item.id === id);

        let exist = FavItem.find((i) => i.id === choosenItemfav.id);

        if (exist) {
            FavItem = FavItem.filter((i) => i.id !== choosenItemfav.id);
            btnfav.style.color = "black"
        }
        else {
            FavItem = [...FavItem, choosenItemfav]
            btnfav.style.color = "red"
        }
        localStorage.setItem("fav", JSON.stringify(FavItem))


        ShowItems()

    }
}
else {
    window.location = "login.html"
}
////////////////////////////////////////////////////////


//////////////////////////////////////
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


