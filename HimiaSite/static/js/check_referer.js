


function checkReferrer(btn) {
    let order_id = btn.getAttribute("data-order")
    let URL = '/basket/remove_reserved_products/';
    const csrftoken = getCsrfToken();
    console.log("checkReferrer i'm here")
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
            localStorage.removeItem("NextURL");
            window.location.replace("/basket/basket_detail/")
        } else {
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            "Тут повинно бути повідомлення, замість Логу!!!"
            console.log("Щось пішло не так!!!")
        }
    })
}