
function VisibleOrderProduct(el) {
    let order_id = el.getAttribute("data-order_id");
    let prof_product_img_cont = document.querySelectorAll(".prof_product_img_cont");
    prof_product_img_cont.forEach((elem, index)=>{
        let this_order_id = elem.getAttribute("data-order_id")
        setTimeout(()=>{
            if (order_id === this_order_id) {
                elem.classList.toggle("visible_prod");
            } else {
                elem.classList.remove("visible_prod");
            }
        }, index * 50); // Доданий затримка для кожного елемента

    });
}