let OrderOrBackBtn = document.getElementById('order_btn');
let backToShopBtn = document.getElementById('back_to_shop_btn');

if (cartItem === "" || totalPrice === "" || cartItem === "0" || totalPrice === "0"){
    OrderOrBackBtn.innerText = "В Магазин";
    OrderOrBackBtn.setAttribute('href', "/");
    backToShopBtn.style.display = "none";
} else{
    OrderOrBackBtn.innerText = "Оформити замовлення";
    OrderOrBackBtn.setAttribute("onclick", "RedirectToCheckout(this)")
}

function RedirectToCheckout(order_btn) {
    let order_id = order_btn.getAttribute("data-order");
    let URL = '/basket/add_reserved_product/';
    const csrftoken = getCsrfToken();
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"order_id": Number(order_id)})
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.success === "success"){
            localStorage.setItem("NextURL","/basket/checkout/")
            window.location.href = "/basket/checkout/"
        } else {
            console.log("Щось пішло не так!!!")
        }
    })
}

function CheckPreviousURL() {
    let url = localStorage.getItem("NextURL");
    if (url) {
        if (url === "/basket/checkout/") {
            let order_btn = document.getElementById("order_btn");
            let order_id = order_btn.getAttribute("data-order");
            let URL = '/basket/remove_reserved_products/';
            const csrftoken = getCsrfToken();
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({"order_id": Number(order_id)})
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.success === "success") {
                    localStorage.removeItem("NextURL");
                } else {
                    console.log("Щось пішло не так!!!")
                }
            })
        }
    } else {
        console.log("CheckPreviousURL in else!!!")
    }
}

CheckPreviousURL()