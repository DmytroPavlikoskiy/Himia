let OrderOrBackBtn = document.getElementById('ord_back_btn');
let backToShopBtn = document.getElementById('back_to_shop_btn');

if (cartItem === "" || totalPrice === "" || cartItem === "0" || totalPrice === "0"){
    OrderOrBackBtn.innerText = "В Магазин";
    OrderOrBackBtn.setAttribute('href', "/");
    backToShopBtn.style.display = "none";
} else{
    OrderOrBackBtn.innerText = "Оформити замовлення";
    OrderOrBackBtn.setAttribute('href', '/basket/checkout');
}