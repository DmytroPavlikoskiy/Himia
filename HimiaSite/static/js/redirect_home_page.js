

function RedirectFromLiqPayToHomePage(){
    let redirect_liqpay = localStorage.getItem("redirect_liqpay");
    if (redirect_liqpay === "true") {
        VisibleLoader()
        IfBasketDelRemoveReservedProducts()
    }
}

RedirectFromLiqPayToHomePage()

function VisibleLoader(){
    let block_loader = document.querySelector(".block_loader");
    block_loader.classList.remove("hide");
    block_loader.classList.add("visible_load");
}

// function CloseCheckoutLoader() {
//     let redirect_liqpay = localStorage.getItem("redirect_liqpay");
//     let block_loader = document.querySelector(".block_loader");
//     if (!redirect_liqpay) {
//         block_loader.classList.remove("visible_load");
//         block_loader.classList.add("hide");
//     }
//
// }
// CloseCheckoutLoader()

function IfBasketDelRemoveReservedProducts() {
    let back_basket_btn = document.querySelector(".back_basket_btn");
    let order_id = back_basket_btn.getAttribute("data-order");
    let URL = '/basket/remove_reserved_products/';
    let csrfToken = getCsrfToken();

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({"order_id": Number(order_id)})
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.success === "success"){
            BasketDelete()
        } else {
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            console.log("Щось пішло не так!!!")
        }
    })

}

function BasketDelete() {
    let user_or_anonymousUser = document.getElementById("user_or_anonymousUser").value;  // отримуємо значення, не сам елемент
    let URL = '/basket/delete_basket/';
    const csrftoken = getCsrfToken();

    let data = {
        session_or_user_id: user_or_anonymousUser,
        order_id: order,
    };

    $.ajax({
        type: 'POST',
        url: URL,
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
        success: function (response) {
            console.log('Basket deleted successfully:', response);
            ClearCheckoutLocalStorage()
            window.location.replace("/")
        },
        error: function (error) {
            console.error('Error deleting basket:', error);
        },
    });
}

function ClearCheckoutLocalStorage() {
    const CheckoutLSList = ["step_three", "Step", "selectedCity", "name", "DepartmentFullName", "dataDel",
        "selectedPaymentMethod", "surname", "DepShortAddress", "RecipientIndex", "selectedCityRef", "total_price",
        "delivery_cost", "homeInfo", "apartment", "email", "CityFullName", "NextURL", "RecipientDepartRef", "phone", "redirect_liqpay"]

    CheckoutLSList.forEach((el)=>{
        localStorage.removeItem(el)
    })
}

