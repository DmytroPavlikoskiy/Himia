let Search = document.getElementById("search");
let IconSearch = document.getElementById("icon_search");
let SearchControl = document.getElementById("div_search");
let InputSearch = document.getElementById("input_search");
let Button = document.getElementById("btn");
let CategoryBtn = document.querySelector(".category_btn");
let ArrowIcon = document.querySelector(".arrow_icon");
let SearchForm = document.querySelector(".search_form");
let CatMenuWrap = document.querySelector(".cat_menu_wrap");
let CatMenu = document.querySelector(".cat_menu");
let CatContent = document.querySelectorAll(".cat_content");
let DivCircle = document.querySelectorAll(".circle");
let CatImg = document.querySelectorAll(".cat_img");
let CatText = document.querySelectorAll(".cat_text");
let CatArrow = document.querySelectorAll(".cat_arrow");
let SubCutControl = document.querySelector(".sub_cut_control");
let SubCutContent = document.querySelectorAll(".sub_cut_content");
let SubCutName = document.querySelector(".name_cut");

const CatContentList = Array.from(CatContent);
const DivCircleList = Array.from(DivCircle);
const CatImgList = Array.from(CatImg);
const CatTextList = Array.from(CatText);
const CatArrowList = Array.from(CatArrow);
const SearchList = [InputSearch, Button, Search, IconSearch,
    CategoryBtn, ArrowIcon, SearchControl, SearchForm, CatMenu, CatMenuWrap, SubCutControl]
const SubCutContentList = Array.from(SubCutContent);


function OpenSearch() {
     Search.addEventListener("click", () => {
        SearchControl.classList.toggle("active");
    })
}
function CloseSearch() {

    document.addEventListener("click", (event) => {
        const ClickElement = event.target
        if (SearchList.includes(ClickElement) || CatContentList.includes(ClickElement)
            || DivCircleList.includes(ClickElement) || CatImgList.includes(ClickElement)
            || CatTextList.includes(ClickElement) || CatArrowList.includes(ClickElement)
            || SubCutContentList.includes(ClickElement))  {

            return
        } else {
            SearchControl.classList.remove("active");
            CatMenuWrap.classList.remove("open_cat");
            ArrowCat.classList.remove("rotate");
        }
    })
}
OpenSearch()
CloseSearch()


/*let CatBtn = document.getElementById("cat_btn");*/
let ArrowCat = document.getElementById("arrow_cat");
function OpenCat() {
    CatMenuWrap.classList.toggle("open_cat");
    ArrowCat.classList.toggle("rotate");
}

function ShowSubCut(){
    CatContentList.forEach((el) => {
        el.addEventListener("click", () => {
            const CutId = el.getAttribute("data-slug")
            const catTextElement = el.querySelector(".cat_text");
            const catName = catTextElement.getAttribute("data-cat_name");

            SubCutContent.forEach((elem) => {
                const SubId = elem.getAttribute("data-id")
                if(CutId === SubId){
                    const nameCut = document.querySelector(".name_cut");
                    nameCut.innerText = catName
                    elem.classList.add("visible")
                } else {
                    elem.classList.remove("visible")
                }
            })
        })
    })
}


ShowSubCut()


// function showProductInfo(cartDiv) {
//     var productInfo = cartDiv.querySelector('.product_info');
//     productInfo.style.display = 'block';
// }
//
// function hideProductInfo(cartDiv) {
//     var productInfo = cartDiv.querySelector('.product_info');
//     productInfo.style.display = 'none';
// }
function showProductInfo(cartDiv) {
    let productInfo = cartDiv.querySelectorAll('.product_info');
    productInfo.forEach((el)=>{
        el.classList.add("down")
    })
}

function hideProductInfo(cartDiv) {
    let productInfo = cartDiv.querySelectorAll('.product_info');
    productInfo.forEach((el)=>{
        el.classList.remove("down")
    })
}


// function CloseCat() {
//     CatContentList.forEach((el)=> {
//         el.addEventListener("click", () => {
//             CatMenuWrap.classList.remove("open_cat");
//             ArrowCat.classList.remove("rotate");
//         })
//     })
// }

// CloseCat()
