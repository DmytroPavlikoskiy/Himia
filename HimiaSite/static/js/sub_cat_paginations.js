//
// function get_sub_cut() {
//     const subCut = document.querySelectorAll(".sub_cut_text");
//     const productsEl = document.querySelector(".cart_control");
//     const Cart = document.querySelectorAll(".cart");
//
//     subCut.forEach((subCutEl) => {
//         subCutEl.addEventListener("click", (el) => {
//             const thisEL = el.srcElement;
//             const dataSlug = thisEL.getAttribute("data-slug");
//
//             // Отримати токен CSRF з cookies
//             const csrftoken = getCookie('csrftoken');
//
//             // Створити об'єкт FormData та додати значення токена і dataSlug
//             const formData = new FormData();
//             formData.append('csrfmiddlewaretoken', csrftoken);
//             formData.append('dataSlug', dataSlug);
//
//             // Виконати POST-запит з використанням fetch
//             fetch("/sub_cut_product", {
//                 method: "POST",
//                 body: formData,
//                 headers: {
//                     // Правильні заголовки для обробки форми з роздільниками
//                     'X-CSRFToken': csrftoken
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 // Обробити відповідь від сервера
//                 data.products = JSON.parse(data.products);
//                 console.log(data)
//                 main(data)
//             });
//         });
//     });
// }
//
// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
//
// function main(postsData) {
//     // const postsData = get_sub_cut();
//     let currentPage = 1
//     let rows = 2;
//
//
//     function createProductCard(el) {
//         const productEl = document.createElement("div");
//         productEl.classList.add("cart");
//         productEl.setAttribute("onmouseenter", "showProductInfo(this)");
//         productEl.setAttribute("onmouseleave", "hideProductInfo(this)");
//
//         const imgEl = document.createElement("img");
//         imgEl.classList.add("product_img");
//         imgEl.src = "/media/" + el.image;
//
//         const brandEl = document.createElement("h2");
//         brandEl.innerHTML = el.brand;
//
//         const nameProdEl = document.createElement("div");
//         nameProdEl.classList.add("name_prod");
//         const pEl = document.createElement("p");
//         pEl.innerText = el.name;
//         nameProdEl.appendChild(pEl);
//
//         const priceEl = document.createElement("h3");
//         const spanCurrencyEl = document.createElement("span");
//         spanCurrencyEl.classList.add("symbol_price");
//         spanCurrencyEl.innerText = "грн";
//         priceEl.innerText = el.price;
//         priceEl.appendChild(spanCurrencyEl);
//
//         const prodBtnEl = document.createElement("a");
//         prodBtnEl.classList.add("prod_btn");
//         prodBtnEl.innerText = "До Кошика";
//
//         productEl.appendChild(imgEl);
//         productEl.appendChild(brandEl);
//         productEl.appendChild(nameProdEl);
//         productEl.appendChild(priceEl);
//         productEl.appendChild(prodBtnEl);
//
//         return productEl;
//     }
//
//     function displayList(arrData, rowPerPage, page) {
//         const productsEl = document.querySelector(".cart_control");
//
//         productsEl.innerHTML = ""
//         page--;
//
//         const start = rowPerPage * page;
//         const end = Number(start) + Number(rowPerPage);
//         const paginatedData = arrData.products.slice(start, end)
//
//         paginatedData.forEach((el) => {
//             const productCard = createProductCard(el.fields);
//             productsEl.appendChild(productCard);
//         })
//     }
//
//     function displayPagination(arrData, rowPerPage) {
//         const paginationEl = document.querySelector(".index_buttons");
//         const pagesCount = Math.ceil(arrData.products.length / rowPerPage)
//
//         for (let i = 0; i < pagesCount; i++) {
//             const page_btn = displayPaginationBtn(i + 1)
//             paginationEl.appendChild(page_btn)
//         }
//     }
//
//     function displayPaginationBtn(page) {
//         const aEl = document.createElement("a");
//             aEl.classList.add("page_btn");
//             aEl.innerText = page
//         if (currentPage === page) {aEl.classList.add("active_default")}
//         aEl.addEventListener("click", () => {
//             currentPage = page
//             let aElList = document.querySelector("a.active_default");
//             aElList.classList.remove("active_default");
//             displayList(postsData, rows, currentPage);
//             aEl.classList.add("active_default");
//         });
//         return aEl
//     }
//
//     displayList(postsData, rows, currentPage);
//     displayPagination(postsData, rows)
// }
//
// get_sub_cut()
//

async function GetData() {
    const response = await fetch("/sub_cut_product");
    const data = await response.json();

    // Parse the JSON strings for products and brands
    data.products = JSON.parse(data.products);
    return data;
}

async function main() {
    const postsData = await GetData();
    let currentPage = 1
    let rows = 5;


    function createProductCard(el) {
        const productEl = document.createElement("div");
        productEl.classList.add("cart");
        productEl.setAttribute("onmouseenter", "showProductInfo(this)");
        productEl.setAttribute("onmouseleave", "hideProductInfo(this)");

        const imgEl = document.createElement("img");
        imgEl.classList.add("product_img");
        imgEl.src = "/media/" + el.image;

        const brandEl = document.createElement("h2");
        brandEl.innerHTML = el.brand

        const nameProdEl = document.createElement("div");
        nameProdEl.classList.add("name_prod");
        const pEl = document.createElement("p");
        pEl.innerText = el.name;
        nameProdEl.appendChild(pEl);

        const priceEl = document.createElement("h3");
        const spanCurrencyEl = document.createElement("span");
        spanCurrencyEl.classList.add("symbol_price");
        spanCurrencyEl.innerText = "грн";
        priceEl.innerText = el.price;
        priceEl.appendChild(spanCurrencyEl);

        const prodBtnEl = document.createElement("a");
        prodBtnEl.classList.add("prod_btn");
        prodBtnEl.innerText = "До Кошика";

        productEl.appendChild(imgEl);
        productEl.appendChild(brandEl);
        productEl.appendChild(nameProdEl);
        productEl.appendChild(priceEl);
        productEl.appendChild(prodBtnEl);

        return productEl;
    }

    function displayList(arrData, rowPerPage, page) {
        const productsEl = document.querySelector(".cart_control");

        productsEl.innerHTML = ""
        page--;

        const start = rowPerPage * page;
        const end = Number(start) + Number(rowPerPage);
        const paginatedData = arrData.products.slice(start, end)

        paginatedData.forEach((el) => {
            const productCard = createProductCard(el.fields);
            productsEl.appendChild(productCard);
        })
    }

    function displayPagination(arrData, rowPerPage) {
        const paginationEl = document.querySelector(".index_buttons");
        const pagesCount = Math.ceil(arrData.products.length / rowPerPage)

        for (let i = 0; i < pagesCount; i++) {
            const page_btn = displayPaginationBtn(i + 1)
            paginationEl.appendChild(page_btn)
        }
    }

    function displayPaginationBtn(page) {
        const aEl = document.createElement("a");
            aEl.classList.add("page_btn");
            aEl.innerText = page
        if (currentPage === page) {aEl.classList.add("active_default")}
        aEl.addEventListener("click", () => {
            currentPage = page
            let aElList = document.querySelector("a.active_default");
            aElList.classList.remove("active_default");
            displayList(postsData, rows, currentPage);
            aEl.classList.add("active_default");
        });
        return aEl
    }


    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows)
}

main()