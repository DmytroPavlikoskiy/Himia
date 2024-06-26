

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




function IfBasketDelRemoveReservedProducts() {
    let back_basket_btn = document.querySelector(".back_basket_btn");
    let order_id = back_basket_btn.getAttribute("data-order");
    let URL = '/basket/remove_basked_and_reserved_products/';
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
            ClearCheckoutLocalStorage()
            window.location.replace("/")
        } else {
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            console.log("Щось пішло не так!!!")
        }
    })

}


function ClearCheckoutLocalStorage() {
    const CheckoutLSList = ["step_three", "Step", "selectedCity", "name", "DepartmentFullName", "dataDel",
        "selectedPaymentMethod", "surname", "DepShortAddress", "RecipientIndex", "selectedCityRef", "total_price",
        "delivery_cost", "homeInfo", "StreetFullName", "apartment", "email", "CityFullName", "NextURL", "RecipientDepartRef", "phone", "redirect_liqpay"]

    CheckoutLSList.forEach((el)=>{
        localStorage.removeItem(el)
    })
}

