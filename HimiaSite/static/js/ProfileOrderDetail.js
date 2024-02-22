
function VisibleOrderProduct() {
    let prof_product_img_cont = document.querySelectorAll(".prof_product_img_cont");
    prof_product_img_cont.forEach((elem, index)=>{
        setTimeout(()=>{
            elem.classList.toggle("visible_prod");
        }, index * 50); // Доданий затримка для кожного елемента

    });
}