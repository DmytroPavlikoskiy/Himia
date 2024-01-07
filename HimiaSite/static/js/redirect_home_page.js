

function RedirectFromLiqPayToHomePage(){
    let redirect_liqpay = localStorage.getItem("redirect_liqpay");
    if (redirect_liqpay === "true") {
        localStorage.clear()
        BasketDelete()
        window.location.href = homeUrl;
        location.reload()
    }
}

RedirectFromLiqPayToHomePage()

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
        },
        error: function (error) {
            console.error('Error deleting basket:', error);
        },
    });
}