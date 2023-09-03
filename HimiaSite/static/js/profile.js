const profileBtn = document.getElementById('profile');
const subMenuWrap = document.getElementById('profile_modal_js');

function openProfileModal() {
    profileBtn.addEventListener('click', () => {
        subMenuWrap.classList.toggle('open_profile');
    });
}

function closeProfileModal() {
    document.addEventListener('click', (event) => {
        if (!subMenuWrap.contains(event.target) && !profileBtn.contains(event.target)) {
            subMenuWrap.classList.remove('open_profile');
        }
    });
}

openProfileModal();
closeProfileModal();