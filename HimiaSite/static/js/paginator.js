// const IndexButtons = document.querySelector(".index_buttons");
//
// let count_product = Number(IndexButtons.getAttribute("data-count_products"))
// const Cart = document.querySelectorAll(".cart");
//
//
// const ListOnePage = 3
// const count_page = count_product / ListOnePage
// let currentPage = 1
//
//
// function CreateListBtn() {
//     let product_list = []
//
//     for (let el = 1; el <= count_page; el++) {
//         product_list.push(el);
//     }
//     for (let number_page of product_list) {
//         let page_btn = document.createElement('a');
//         page_btn.className = 'page_btn';
//         page_btn.setAttribute("data-count_page", number_page)
//         page_btn.textContent = number_page;
//         IndexButtons.appendChild(page_btn);
//     }
//
// }
// function getCountPage() {
//     let PageBtn = document.querySelectorAll(".page_btn");
//     PageBtn.forEach((el) => {
//         let data_count_page = el.getAttribute("data-count_page");
//         if (data_count_page === "1") {
//                 // If the clicked element has data-count_page="1", keep its classes unchanged
//                 el.classList.add("active_default");
//             }
//         el.addEventListener("click", () => {
//             PageBtn.forEach((e)=>{
//                 e.classList.remove("active_default")
//             })
//             el.classList.add("active_default");
//             displayList(Cart, currentPage, ListOnePage, data_count_page)
//         });
//     });
// }
//
// CreateListBtn()

//
// function displayList(Cart, currentPage, ListOnePage, data_count_page) {
//     const start = ListOnePage * currentPage;
//     const end = start + ListOnePage;
//     let page = data_count_page
//     Cart.forEach((el) => {
//         el.getAttribute("data-prod_id")
//
//     })
// }


// fetch("/products")
//     .then(function (response) {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(function (data) {
//         console.log("Products received:", data.products);
//
//     })
//     .catch(function (error) {
//         console.error("Fetch error:", error);
//     });

async function GetData() {
    const response = await fetch("/products");
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
