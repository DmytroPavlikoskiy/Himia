

$(document).ready(function () {
    $('.img_slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
    });
});


// function ChangePhoto(img) {
//     let img_url = img.getAttribute("data-img_url");
//     let MainImgDiv = document.querySelector(".img_cont");
//     let imgEl = MainImgDiv.querySelector("img");
//     imgEl.setAttribute("src", img_url)
//
// }

function ChangePhoto(img) {
    // Знаходимо всі елементи з класом "product_imgs" і видаляємо бордер та стилізацію для всіх
    let allProductImgs = document.querySelectorAll('.product_imgs');
    allProductImgs.forEach(item => {
        item.style.border = 'none';
        item.style.borderRadius = '0';
    });

    // Задаємо бордер та стилізацію для вибраної картинки
    img.style.border = '2px solid #30d5c8';
    img.style.borderRadius = '5px';

    // Змінюємо головну картинку
    let img_url = img.getAttribute('data-img_url');
    let MainImgDiv = document.querySelector('.img_cont');
    let imgEl = MainImgDiv.querySelector('img');
    imgEl.setAttribute('src', img_url);
}
