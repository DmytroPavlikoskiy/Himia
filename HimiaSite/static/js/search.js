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


// ==================================================================================
// ==================================================================================
// ==================================================================================



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


// CATEGORY

function ShowChildrenCategories(cat) {
    let cat_id = cat.getAttribute("data-cat_id");
    let sub_category_list_cont = document.querySelectorAll(".sub_category_list_cont");
    sub_category_list_cont.forEach((el)=>{
        let sub_cat_cat_id = el.getAttribute("data-cat_id");
        if (cat_id !== sub_cat_cat_id) {
            el.classList.remove("visible");
            console.log("1")
        }else {
            el.classList.add("visible");
        }
    })
}

function OpenCat(){
    let category_menu_control = document.querySelector(".category_menu_control");
    let cat_cont_control = document.querySelector(".cat_cont_control");
    category_menu_control.classList.toggle("down")
    cat_cont_control.classList.toggle("show")

    document.addEventListener('click', handleClickOutside);
}

function handleClickOutside(event) {
    let category_btn = document.getElementById('cat_btn');
    let category_menu_control = document.querySelector(".category_menu_control");
    let cat_cont_control = document.querySelector(".cat_cont_control");

    // Перевірте, чи клік був поза діапазоном .category_menu_control
    if (!category_menu_control.contains(event.target) && event.target !== category_btn) {
        category_menu_control.classList.remove("down");
        cat_cont_control.classList.remove("show");
        // Видаліть обробник подій після закриття меню
        document.removeEventListener('click', handleClickOutside);
    }
}

// ====================================================================================================




function OpenMobSearch() {
    let mobile_search_block = document.querySelector(".mobile_search_block");
    let mobile_category_control = document.querySelector(".mobile_category_control");
    mobile_search_block.classList.toggle("open");
    mobile_category_control.classList.remove("out");
}

function OpenMobCut(){
    let mobile_category_control = document.querySelector(".mobile_category_control");
    let mobile_search_block = document.querySelector(".mobile_search_block");
    mobile_category_control.classList.toggle("out");
    mobile_search_block.classList.remove("open");
}

function CloseMobCut(){
    let mobile_category_control = document.querySelector(".mobile_category_control");
    let mobile_category = document.querySelector(".mobile_category");
    let mobile_subcategory = document.querySelector(".mobile_subcategory");
    let mobile_sub_subcategory = document.querySelector(".mobile_sub_subcategory");
    let mob_sub_sub_content = document.querySelectorAll(".mob_sub_sub_content");
    let mob_sub_content = document.querySelectorAll(".mob_sub_content");
    let all_catalog = document.querySelector(".all_catalog");

    mobile_category_control.classList.remove("out");
    mobile_subcategory.classList.remove("sub_out");
    mobile_subcategory.classList.remove("in");
    mobile_category.classList.remove("in")
    mobile_sub_subcategory.classList.remove("sub_sub_out");

    mob_sub_sub_content.forEach((el) => {
        el.classList.remove("visible");
    });

    mob_sub_content.forEach((elem) => {
        elem.classList.remove("visible");
    });
    let step_title = document.querySelector(".step_title");
    step_title.innerHTML = "Каталог";
    all_catalog.innerHTML = "";
}


function AllCatalogBtnCreate(slug){
    let TagA = document.querySelector(".all_catalog");
    TagA.setAttribute("href", "/catalog/" + slug);
    TagA.innerHTML = "Весь каталог";
    TagA.style.opacity = 1;
}

let navigationStack = [];

function
ChoiceCat(cat){
    const DivCategory = cat.parentElement
    let CatName = cat.getAttribute("data-cat_name");
    let mobile_subcategory = document.querySelector(".mobile_subcategory");
    let cut_id = cat.getAttribute("data-mob_cat_id");
    let mob_sub_content = document.querySelectorAll(".mob_sub_content");
    let step_title = document.querySelector(".step_title");
    mob_sub_content.forEach((sub_cut)=>{
        let sub_cut_id = sub_cut.getAttribute("data-category_id");
        if (sub_cut_id === cut_id) {
            sub_cut.classList.add("visible");
            mobile_subcategory.classList.add("sub_out");
            DivCategory.classList.add("in");
        } else {
            sub_cut.classList.remove("visible");
        }
    })
    step_title.innerHTML = `<i class="arr_icon_back fa-solid fa-arrow-left"></i> ${CatName}`
    let slug = cat.getAttribute("data-slug")
    console.log(slug, "ChoiceCat")
    AllCatalogBtnCreate(slug)
    navigationStack.push({
        type: "category",
        id: cut_id,
        name: "Каталог",
        DivCategory:DivCategory
    });
}

function ChoiceSubCut(sub_cut){
    const DivSubCategory = sub_cut.parentElement
    let mobile_sub_subcategory = document.querySelector(".mobile_sub_subcategory");
    let SubCatName = sub_cut.getAttribute("data-sub_cat_name");
    let CategoryName = sub_cut.getAttribute("data-category_name");
    let sub_cut_id = sub_cut.getAttribute("data-sub_cut_id");
    let mob_sub_sub_content = document.querySelectorAll(".mob_sub_sub_content");
    let step_title = document.querySelector(".step_title");
    mob_sub_sub_content.forEach((sub_sub_cut)=>{
        let subcategory_id = sub_sub_cut.getAttribute("data-subcategory_id");
        if (sub_cut_id === subcategory_id){
            sub_sub_cut.classList.add("visible");
            mobile_sub_subcategory.classList.add("sub_sub_out");
            DivSubCategory.classList.add("in");
        } else {
            sub_sub_cut.classList.remove("visible");
        }
    })
    if (SubCatName) {
        step_title.innerHTML = `<i class="arr_icon_back fa-solid fa-arrow-left"></i> ${SubCatName}`
    } else {
        step_title.innerHTML = `Каталог`
    }
    let slug = sub_cut.getAttribute("data-slug")
    console.log(slug, "ChoiceSubCut")
    AllCatalogBtnCreate(slug)
    navigationStack.push({
        type: "subcategory",
        id: sub_cut_id,
        category_name:CategoryName,
        name: SubCatName,
        DivSubCategory: DivSubCategory
    });

}

function BackPrevCat() {
    let step_title = document.querySelector(".step_title");
    let all_catalog = document.querySelector(".all_catalog");
    let mobile_sub_subcategory = document.querySelector(".mobile_sub_subcategory");
    let mobile_subcategory = document.querySelector(".mobile_subcategory");
    let lastItem = navigationStack.pop();

    if (lastItem) {
        if (lastItem.type === "category") {
            mobile_subcategory.classList.remove("sub_out");
            lastItem.DivCategory.classList.remove("in");
            AllCatalogBtnCreate(lastItem.id);
        } else if (lastItem.type === "subcategory") {
            mobile_sub_subcategory.classList.remove("sub_sub_out");
            lastItem.DivSubCategory.classList.remove("in");
            AllCatalogBtnCreate(lastItem.id);
        }

        if (lastItem.category_name) {
            step_title.innerHTML = step_title.innerHTML = `<i class="arr_icon_back fa-solid fa-arrow-left"></i> ${lastItem.category_name}`
            AllCatalogBtnCreate(lastItem.id);
        } else {
            step_title.innerHTML = step_title.innerHTML = `Каталог`
            all_catalog.innerHTML = ""
        }
    }
}






