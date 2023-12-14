const profileBtn = document.getElementById('profile');
const subMenuWrap = document.getElementById('profile_modal_js');

function openProfileModal() {
    const profileBtn = document.getElementById('profile');
    const subMenuWrap = document.getElementById('profile_modal_js');

    if (!profileBtn) {
        return;
    }

    profileBtn.addEventListener('click', () => {
        subMenuWrap.classList.toggle('open_profile');
    });
}

function closeProfileModal() {
    document.addEventListener('click', (event) => {
        if (profileBtn && !profileBtn.contains(event.target)) {
            subMenuWrap.classList.remove('open_profile');
        }
    });
}

openProfileModal();
closeProfileModal();


// ====================================================================================
// MOBILE VERSION

const profileBtnMob = document.getElementById('profile_mob');
let subMenuWrapMob = document.querySelector('.sub_menu_wrap_mob');


function openProfileModalMob() {
    const profileBtnMob = document.getElementById('profile_mob');
    // let subMenuWrapMob = document.querySelector('.sub_menu_wrap_mob');
    // let MobSearchMenu = document.querySelector(".mob_search_menu");
    // let MobModalWindow = document.querySelector(".modal_mob_menu");

    if (!profileBtnMob) {
        return;
    }

    profileBtnMob.addEventListener('click', () => {
        subMenuWrapMob.classList.toggle('open_profile_mob');
        MobSearchMenu.classList.remove("open_mod_srch_mob");
        MobModalWindow.classList.remove("open_mob_menu");
    });
}

function closeProfileModalMob() {
    document.addEventListener('click', (event) => {
        if (profileBtnMob && !profileBtnMob.contains(event.target)) {
            subMenuWrapMob.classList.remove('open_profile_mob');
        }
    });
}

openProfileModalMob()
closeProfileModalMob()