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

function OpenModalChoiceP_A(message, order_item_id, available_quantity) {
    let wrapper_modal_c_p_a = document.querySelector(".wrapper_modal_c_p_a");
    let response_message = document.querySelector(".response_message");
    let bnts = document.querySelectorAll(".modal_choice_p_a__btn");
    bnts.forEach((btn)=>{
        btn.setAttribute("data-order_item_id", order_item_id)
        btn.setAttribute("data-available_quantity", available_quantity)
    })
    response_message.innerHTML = message;
    wrapper_modal_c_p_a.style.display = "flex";
}

function ClientChoiceContinuation(btn) {
    let ClientChoice = btn.getAttribute("data-choice");
    let order_item_id = btn.getAttribute("data-order_item_id");
    let available_quantity = btn.getAttribute("data-available_quantity");

    let URL = '/basket/changing_basket/';
    const csrftoken = getCsrfToken();

    if (ClientChoice === "Yes" || ClientChoice === "No") {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                "order_item_id": order_item_id,
                "available_quantity": available_quantity,
                "client_choice": ClientChoice
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.status === "success") {
                location.reload()
            } else {
                console.log("Щось пішло не так!!!")
            }
        });
    } else {
        createMessage("error", "Виберіть Так, або Ні");
    }
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
        }
        if (data.status === "product_expired") {
            createMessage("error", data.message)
            setTimeout(()=>{
                location.reload()
            },3500)
        }
        if (data.status === "errorAvailableProduct") {
            OpenModalChoiceP_A(data.message, data.order_item_id, data.available_quantity)
        }
        else {
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
                    "Тут повинно бути повідомлення, замість Логу!!!"
                    "Тут повинно бути повідомлення, замість Логу!!!"
                    "Тут повинно бути повідомлення, замість Логу!!!"
                    console.log("Щось пішло не так!!!")
                }
            })
        }
    } else {
        console.log("CheckPreviousURL in else!!!")
    }
}

CheckPreviousURL()