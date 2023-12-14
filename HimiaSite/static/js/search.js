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

// let subMenuWrapMob = document.querySelector('.sub_menu_wrap_mob');



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


let MobSearch = document.querySelector(".mobile_Search");
let MobSearchMenu = document.querySelector(".mob_search_menu");
let MobSearchIcon = document.querySelector(".mob_search_icon");
let InputSearchMob = document.getElementById("input_search_mob");
let ButtonMob = document.getElementById("btn_mob");
let CatMenuMob = document.querySelector(".cat_menu_mob");
let SliderCat = document.querySelector(".slider_cat");

let CatContentMob = document.querySelectorAll(".cat_content_mob");
let CircleMob = document.querySelectorAll(".circle_mob");
let CatImgMob = document.querySelectorAll(".cat_img_mob");
let CatTextMob = document.querySelectorAll(".cat_text_mob");

let SubCutControlMob = document.querySelector(".sub_cut_control_mob");
let NameCutMob = document.querySelector(".name_cut_mob");
let SubCutContentMob = document.querySelectorAll(".sub_cut_content_mob");
let SubCutTextMob = document.querySelectorAll(".sub_cut_text_mob");

let MobMenuControl = document.querySelector(".mob_menu_cont");
let MobModalWindow = document.querySelector(".modal_mob_menu");


let SpanMenu = document.querySelectorAll(".span_menu");

const CatContentMobList = Array.from(CatContentMob)
const CircleMobList = Array.from(CircleMob)
const CatImgMobList = Array.from(CatImgMob)
const CatTextMobList = Array.from(CatTextMob)
const SubCutContentMobList = Array.from(SubCutContentMob)
const SubCutTextMobList = Array.from(SubCutTextMob)


function OpenClosedMobSearchMenu() {

    if (MobSearchIcon) {
        MobSearchIcon.addEventListener("click", (event) => {
            MobSearchMenu.classList.toggle("open_mod_srch_mob");
            MobModalWindow.classList.remove("open_mob_menu");
            SpanMenu[0].classList.remove("span_rotate_first")
            SpanMenu[1].classList.remove("span_hide")
            SpanMenu[2].classList.remove("span_rotate_three")
            subMenuWrapMob.classList.remove('open_profile_mob');
            event.stopPropagation(); // Зупиняє подальше розповсюдження події, щоб не викликати обробник для документа
        });

        document.addEventListener("click", (event) => {
            // Перевіряємо, чи клік був здійснений поза .mob_search_menu
            if (!MobSearchMenu.contains(event.target) && !MobSearchIcon.contains(event.target)) {
                MobSearchMenu.classList.remove("open_mod_srch_mob");
            }
        });
    }
}

OpenClosedMobSearchMenu();


function ShowSubCutMob() {
    CatContentMob.forEach((element)=>{
        element.addEventListener("click", ()=>{
            const CutId = element.getAttribute("data-slug")
            const catTextElement = element.querySelector(".cat_text_mob");
            console.log(catTextElement)
            const catName = catTextElement.getAttribute("data-cat_name");
            SubCutContentMobList.forEach((el)=>{
                let SubId = el.getAttribute("data-id")
                if(CutId === SubId){
                    const nameCut = document.querySelector(".name_cut_mob");
                    console.log(nameCut)
                    nameCut.innerText = catName
                    el.classList.add("visible")
                } else {
                    el.classList.remove("visible")
                }
            })
        })
    })
}
ShowSubCutMob()


function OpenMobMenu() {
    if (MobMenuControl) {
        MobMenuControl.addEventListener("click", (event) => {
            MobModalWindow.classList.toggle("open_mob_menu");
            SpanMenu[0].classList.toggle("span_rotate_first")
            SpanMenu[1].classList.toggle("span_hide")
            SpanMenu[2].classList.toggle("span_rotate_three")
            MobSearchMenu.classList.remove("open_mod_srch_mob");
            subMenuWrapMob.classList.remove('open_profile_mob');
            event.stopPropagation(); // Зупиняє подальше розповсюдження події, щоб не викликати обробник для документа
        });

        document.addEventListener("click", (event) => {
            // Перевіряємо, чи клік був здійснений поза .modal_mob_menu та .mob_menu_cont
            if (!MobModalWindow.contains(event.target) && !MobMenuControl.contains(event.target)) {
                MobModalWindow.classList.remove("open_mob_menu");
                SpanMenu[0].classList.remove("span_rotate_first")
                SpanMenu[1].classList.remove("span_hide")
                SpanMenu[2].classList.remove("span_rotate_three")
            }
        });
    }
}

OpenMobMenu();
