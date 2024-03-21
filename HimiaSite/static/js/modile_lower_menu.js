

const Width = window.innerWidth;
const widthOneBlockMenu = Width / 4;

function InitializationMobMenuPage() {
    let MobMenuList = document.querySelectorAll(".list");
    let indicator = document.querySelector(".indicator");

    MobMenuList.forEach((itemMenu) => {
        let thisPage = itemMenu.getAttribute("data-page");
        if (page === thisPage) {
            itemMenu.classList.add("active");

        } else {
            itemMenu.classList.remove("active");
        }
    });
}

InitializationMobMenuPage()
