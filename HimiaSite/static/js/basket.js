
let homeItem = document.querySelectorAll('.number_goods');
// ===================================================
// BASKET ADD
function BasketAddProduct(element) {
    let basketTotalPrice = document.querySelector('.total_price');
    let basketTotalItems = document.querySelector('.total_items');
    let productId = element.getAttribute('data-product');
    const inputProduct = document.getElementById(productId);
    let Available = Number(inputProduct.getAttribute('max'))
    let inputQuantity = Number(inputProduct.value) + 1
    inputProduct.value = inputQuantity;
    // console.log(Available)
    // console.log(typeof inputProduct.value)
    if (inputProduct.value > Available) {
        inputProduct.value = Number(inputQuantity) - 1;
    }
    if (inputProduct.value <= Available) {
        let URL = '/basket/basket_add_product/';
        const csrftoken = getCsrfToken();
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({"productId": productId, 'inputValue': inputProduct.value})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data);
            let productId = data.productId;
            let productItem = data.productItem;
            let productTotal = data.productTotal;
            let available = data.available;

            let all_price = 'all_price' + String(productId);
            let allPrice = document.querySelector(`.${all_price}`);

            let old_price = 'old_price' + String(productId);
            let oldPrice = document.querySelector(`.${old_price}`);
            if (productItem !== undefined && productItem !== null) {
                homeItem.forEach((el) => {
                    el.innerText = productItem;
                });
                basketTotalItems.innerText = productItem;
            }
            inputProduct.setAttribute('max', available)
            basketTotalPrice.innerHTML = productTotal.toFixed(2) + ' ' + `<span>₴</span>`;
            // basketTotalItems.innerText = productItem;
            inputProduct.setAttribute('value', String(inputQuantity))
            if (allPrice !== null) {
                let fixed_total = data.total.toFixed(2)
                allPrice.innerHTML = fixed_total + ' ' + `<span>₴</span>`;
            }
            if (oldPrice !== null) {
                let fixed_old_price = data.total.toFixed(2)
                oldPrice.innerHTML = fixed_old_price + ' ' + `<span>₴</span>`;
            }
        })
    }
}



// ===================================================
// REMOVE PRODUCT FROM BASKET

function BasketRemoveProduct(element) {
    let basketTotalPrice = document.querySelector('.total_price');
    let basketTotalItems = document.querySelector('.total_items');
    let productId = element.getAttribute('data-product');
    const inputProduct = document.getElementById(productId);
    let Available = Number(inputProduct.getAttribute('max'))
    let inputQuantity = Number(inputProduct.value) - 1
    console.log(inputQuantity)
    console.log(Available)
    console.log(inputProduct.value)
    if (inputQuantity < 0) {
        return;
    }
    let URL = '/basket/basket_remove_product/';
    const csrftoken = getCsrfToken();
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"productId": productId, 'inputValue': inputQuantity})
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        let productId = data.productId;
        let productItem = data.productItem;
        let productTotal = data.productTotal;
        let available = data.available;

        let all_price = 'all_price' + String(productId);
        let allPrice = document.querySelector(`.${all_price}`);

        let old_price = 'old_price' + String(productId);
        let oldPrice = document.querySelector(`.${old_price}`);
        console.log(allPrice)
        inputProduct.value = inputQuantity;
        if (productItem !== undefined && productItem !== null) {
            homeItem.forEach((el) => {
                el.innerText = productItem;
            });
            basketTotalItems.innerText = productItem;
        }
        inputProduct.setAttribute('max', available)
        basketTotalPrice.innerHTML = productTotal.toFixed(2) + ' ' + `<span>₴</span>`;
        inputProduct.setAttribute('value', String(inputQuantity))
        if (allPrice !== null) {
            let fixed_total = data.total.toFixed(2)
            allPrice.innerHTML = fixed_total + ' ' + `<span>₴</span>`;
        }
        if (oldPrice !== null) {
            let fixed_old_price = data.total.toFixed(2)
            oldPrice.innerHTML = fixed_old_price + ' ' + `<span>₴</span>`;
        }
        if (inputProduct.value === 0 || inputProduct.value === "0") {
            createMessage(data.status, data.message)
            setTimeout(() => {
                location.reload()
            }, 1000)
        }
    })
}

// ===================================================
// EVENT INPUT PLUSE MINUS

let timeout;

function debounce(func, wait) {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
}

function InputPlusMinusProduct(thisInput) {
    const csrftoken = getCsrfToken();
    let basketTotalPrice = document.querySelector('.total_price');
    let basketTotalItems = document.querySelector('.total_items');
    let URL = '/basket/basket_input_value_product/';
    let Available = Number(thisInput.getAttribute('max'));
    let ProductId = thisInput.getAttribute("id");

    if (thisInput.value > Available) {
        thisInput.value = Available;
    }

    if (thisInput.value < 0) {
        thisInput.value = 0;
    }

    if (thisInput.value <= Available) {
        debounce(() => {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({"ProductId": ProductId, "inputValue": thisInput.value})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
                let productId = data.productId;
                let productItem = data.productItem;
                let productTotal = data.productTotal;
                let available = data.available;
                let quantity = data.quantity

                let all_price = 'all_price' + String(productId);
                let allPrice = document.querySelector(`.${all_price}`);

                let old_price = 'old_price' + String(productId);
                let oldPrice = document.querySelector(`.${old_price}`);
                if (productItem !== undefined && productItem !== null) {
                    homeItem.forEach((el) => {
                        el.innerText = productItem;
                    });
                    basketTotalItems.innerText = productItem;
                }
                thisInput.setAttribute('max', available)
                basketTotalPrice.innerHTML = productTotal.toFixed(2) + ' ' + `<span>₴</span>`;
                thisInput.setAttribute('value', String(quantity))
                if (allPrice !== null) {
                    let fixed_total = data.total.toFixed(2)
                    allPrice.innerHTML = fixed_total + ' ' + `<span>₴</span>`;
                }
                if (oldPrice !== null) {
                    let fixed_old_price = data.total.toFixed(2)
                    oldPrice.innerHTML = fixed_old_price + ' ' + `<span>₴</span>`;
                }
            });
        }, 2000);
    }
}

// ===================================================
// REMOVE PRODUCT
function RemoveProduct(prod) {
    // let RemoveProduct = document.querySelectorAll('.close_basket_product');
    let productId = prod.getAttribute('data-product')
    console.log(productId)
    let valueInput = document.getElementById(productId)
    const csrftoken = getCsrfToken()
    let URL = '/basket/remove_product/';
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"productId": productId, "valueInput": valueInput.value})
    }).then((response) => {
        return response.json()
    }).then((data) => {
        createMessage(data.status, data.message)
        setTimeout(()=>{
            location.reload()
        }, 1000)
    })

}

function RemoveAllBasket() {
    let RemoveAllProduct = document.querySelector('.close_div');
    let session_or_user_id = RemoveAllProduct.getAttribute('data-session_user_id');
    let order_id = RemoveAllProduct.getAttribute("data-order_id");
    session_or_user_id = session_or_user_id.replace(/\s/g, '');
    const csrftoken = getCsrfToken();
    let URL = '/basket/delete_basket/';

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({"session_or_user_id": session_or_user_id, "order_id": order_id})
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status === "success") {
            createMessage(data.status, data.message);
            setTimeout(()=>{
                location.reload()
            }, 1000)
        } else {
            createMessage(data.status, data.message);
        }
    });
}

function getCsrfToken() {
    var csrfCookieName = 'csrftoken'; // Ім'я cookies для csrftoken
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(csrfCookieName + '=') === 0) {
            return cookie.substring(csrfCookieName.length + 1, cookie.length);
        }
    }

    return null;
}