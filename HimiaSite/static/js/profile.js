
const profileBtn = document.getElementById('profile');
const subMenuWrap = document.getElementById('profile_modal_js');

function openProfileModal() {
    if (!profileBtn) {
        return;
    }

    profileBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        subMenuWrap.classList.toggle('open_profile');
    });
}

function closeProfileModal() {
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        // Перевірка, чи клікнуто поза межами subMenuWrap та чи не клікнуто на посилання (<a> тег)
        if (profileBtn && !profileBtn.contains(clickedElement) && !subMenuWrap.contains(clickedElement)
            && clickedElement.tagName.toLowerCase() !== 'a') {
            subMenuWrap.classList.remove('open_profile');
        }
    });
}

openProfileModal();
closeProfileModal();


// ====================================================================================
// MOBILE VERSION

const mobProfileBtn = document.getElementById('mob_profile');
const mobSubMenuWrap = document.getElementById('mob_profile_modal_js');

function openMobProfileModal() {
    if (!mobProfileBtn) {
        return;
    }

    mobProfileBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        mobSubMenuWrap.classList.toggle('open_profile_mob');
    });
}

function closeMobProfileModal() {
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        // Перевірка, чи клікнуто поза межами mobSubMenuWrap та чи не клікнуто на посилання (<a> тег)
        if (mobProfileBtn && !mobProfileBtn.contains(clickedElement) && !mobSubMenuWrap.contains(clickedElement)
            && clickedElement.tagName.toLowerCase() !== 'a') {
            mobSubMenuWrap.classList.remove('open_profile_mob');
        }
    });
}

openMobProfileModal();
closeMobProfileModal();
