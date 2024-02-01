


function checkReferrer(btn) {
    let order_id = btn.getAttribute("data-order")
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
        if (data.success === "success"){
            localStorage.removeItem("NextURL");
            window.location.replace("/basket/basket_detail/")
        } else {
            console.log("Щось пішло не так!!!")
        }
    })
}

document.addEventListener('keydown', function(event) {
    // Перевірка, чи натискана клавіша "Backspace"
    if (event.key === 'Backspace') {
        // Ваш код, який викликається при натисканні клавіші "Backspace"
        console.log('Клавіша "Backspace" була натиснута.');
    }
});