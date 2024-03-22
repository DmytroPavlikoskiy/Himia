

function BasketAddHomePage(element) {
    let homeItem = document.querySelectorAll('.number_goods');
    let productId = element.getAttribute('data-product');
    let URL = '/basket/basket_add_home_page/';
    const csrftoken = getCsrfToken();

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"productId": productId})
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        let productItem = data.productItem;
        if (productItem !== undefined && productItem !== null) {
            homeItem.forEach((el) => {
                el.innerText = productItem;
            });
        }
        createMessage(data.status, data.message);
    });
}