
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

let user_prof_info = document.querySelector(".user_prof_info");

function OpenProfInfo(el){
    let title = el.querySelector("h2");
    let title_icon = el.querySelector("i");
    let dataClick = el.getAttribute("data-click");
    let Orders = document.querySelectorAll(".user_order_control");
    let Settings = document.getElementById("settings");
    let NoOrder = document.querySelector(".order_none_block");
    let title_user_info = document.getElementById("title_user_info");

    let allProfileMenus = document.querySelectorAll(".profile_menu");
    allProfileMenus.forEach((menu) => {
        if (menu !== el) {
            let menuTitle = menu.querySelector("h2");
            let menuIcon = menu.querySelector("i");
            menuTitle.style.color = "#3a3a3a";
            menuIcon.style.color = "#3a3a3a";
        }
    });

    title.style.color = "#49bfc4"
    title_icon.style.color = "#49bfc4"
    if (dataClick === "settings") {
        Settings.classList.remove("close_settings");
        if (Orders) {
            Orders.forEach((order)=>{
                order.classList.remove("open_orders");
            })
        }
        if (NoOrder) {
            NoOrder.classList.remove("open_no_orders");
        }
        setTimeout(()=>{
            title_user_info.innerText = "Мої налаштування";
        }, 180)
        localStorage.setItem("ClientChoice", dataClick)
        user_prof_info.classList.remove("overflow_hidden");
    }
    if (dataClick === "orders") {
        Settings.classList.add("close_settings");
        if (Orders) {
            Orders.forEach((order)=>{
                order.classList.add("open_orders");
            })
        }
        if (NoOrder) {
            NoOrder.classList.add("open_no_orders");
        }
        setTimeout(()=>{
            title_user_info.innerText = "Мої замовлення";
        }, 180)
        localStorage.setItem("ClientChoice", dataClick)
        user_prof_info.classList.add("overflow_hidden");
    }
}

function InitializationsProfile(){
    let ClientChoice = localStorage.getItem("ClientChoice");
    let Orders = document.querySelectorAll(".user_order_control");
    let Settings = document.getElementById("settings");
    let NoOrder = document.querySelector(".order_none_block");
    let title_user_info = document.getElementById("title_user_info");
    let profile_menu = document.querySelectorAll(".profile_menu");

    profile_menu.forEach((menu)=>{
        let dataClick = menu.getAttribute("data-click");
        let title = menu.querySelector("h2");
        let title_icon = menu.querySelector("i");
        if (dataClick === ClientChoice){
            if (title && title_icon) {
                title.style.color = "#49bfc4";
                title_icon.style.color = "#49bfc4";
            }
        } else {
            if (title && title_icon) {
                title.style.color = "#3a3a3a";
                title_icon.style.color = "#3a3a3a";
            }
        }
    })

    if (ClientChoice === "settings" && Settings) {
        Settings.classList.remove("close_settings");
        if (Orders) {
            Orders.forEach((order)=>{
                order.classList.remove("open_orders");
            });
        }
        if (NoOrder) {
            NoOrder.classList.remove("open_no_orders");
        }
        setTimeout(()=>{
            title_user_info.innerText = "Мої налаштування";
        }, 180);
        user_prof_info.classList.remove("overflow_hidden");
    }

    if (ClientChoice === "orders" && Orders) {
        Orders.forEach((order)=>{
            order.classList.add("open_orders");
        });
        if (NoOrder) {
            NoOrder.classList.add("open_no_orders");
        }
        if (Settings) {
            Settings.classList.add("close_settings");
        }
        setTimeout(()=>{
            title_user_info.innerText = "Мої замовлення";
        }, 180);
        user_prof_info.classList.add("overflow_hidden");
    }
}

InitializationsProfile();

let OrderDetailModal = document.querySelector(".modal_order_detail_control");

function OpenOrderDetail(order){
    let order_id = order.getAttribute("data-order_id");
    const CsrfToken = getCsrfToken();
    const URL = "/users/get_order_detail/";

    let data = {"order_id": order_id,}

    $.ajax({
        type: "POST",
        url: URL,
        headers: {
            "X-CSRFToken": CsrfToken,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.status === "success") {
                console.log(response.data)
                let orderData = response.data.order_del_inf;
                let orderItems = response.data.order_items;
                let orderStatusData = response.data.data_order_status;

                document.querySelector(".title_order_detail span").innerText = orderData.order_number;
                document.getElementById("date").innerText = orderData.date_added;
                document.getElementById("total_price").innerText = orderData.total_price.toFixed(2) + " ₴";
                document.querySelector(".order_info #straight_to").innerText = orderData.department_full_name;
                document.querySelector(".order_info #city").innerText = orderData.recipient_city;
                document.querySelector(".order_info #name").innerText = orderData.recipient_name;
                document.querySelector(".order_info #phone").innerText = orderData.recipient_phone;
                document.querySelector(".order_info #email").innerText = orderData.recipient_email;
                document.querySelector(".order_info #method_pay").innerText = orderData.payment_method;

                let orderProductsControl = document.querySelector(".order_products_control");
                orderProductsControl.innerHTML = '';

                orderItems.forEach(item => {
                    let productHTML = `
                        <div class="order_product_detail">
                            <div class="order_product__img_name_cont">
                                <div class="product_img_cont"><img src="${item.product.image}"></div>
                                <div class="product_name_cont">
                                    <h2>${item.product.name}</h2>
                                </div>
                                <div class="p_order_quantity" data-quantity="${item.quantity}">
                                    <h2 class="p_quant">${item.quantity}</h2>
                                    <h3 class="p_quant_text">X</h3>
                                </div>
                            </div>
                            <div class="order_product__price">
                                <div class="order_prod_p_d_cont">
                                    <span class="order_prod_old_price">${item.product.price}</span>
                                    <div class="order_prod_discount">
                                        <h2>${item.product.discount}%</h2>
                                    </div>
                                </div>
                                <h2 class="price">${item.product.discount_price}<span>₴</span></h2>
                            </div>
                        </div>
                    `;
                    orderProductsControl.insertAdjacentHTML('beforeend', productHTML);
                });

                document.getElementById("order_status").innerText = orderStatusData.text;
                let videoElement = document.querySelector(".status_video_control video");
                videoElement.src = orderStatusData.video_path;

                OrderDetailModal.classList.add("open_order_detail");
            }
        },
        error: function (response) {
            if (response.status === "error") {
                createMessage(response.error, response.message);
            }
        },
    });
}

function CloseOrderDetailModal(){
    OrderDetailModal.classList.remove("open_order_detail");
}

function UpdateSettingsProfile(btn) {
    let user_id = btn.getAttribute("data-user_id");
    let firstNameInput = document.getElementById("first_name").value.trim();
    let lastNameInput = document.getElementById("last_name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let phoneInput = document.getElementById("phone_number").value.trim();

    let status = ""
    let message = ""

    let namePattern = /^[\u0400-\u04FF]+$/;
    if (!namePattern.test(firstNameInput) || !namePattern.test(lastNameInput)) {
        status = "error";
        message = "Ім'я та прізвище мають бути тільки на кирилиці";
        createMessage(status, message)
        return;
    }

    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(emailInput)) {
        status = "error";
        message = "Введіть коректну електронну адресу";
        createMessage(status, message)
        return;
    }


    // Ось тут можна викликати функцію для збереження змін, якщо всі перевірки пройшли успішно
    saveChanges(firstNameInput, lastNameInput, emailInput, phoneInput, user_id);
}

function saveChanges(firstName, lastName, email, phone, user_id) {
    let user_first_name = document.querySelector(".user_first_name");
    let user_last_name = document.querySelector(".user_last_name");
    let firstNameInput = document.getElementById("first_name")
    let lastNameInput = document.getElementById("last_name")
    let emailInput = document.getElementById("email")
    let phoneInput = document.getElementById("phone_number")

    const URL = "/users/update_user_profile/"
    const CsrfToken = getCsrfToken()
    $.ajax({
        url: URL,
        headers: {
            'X-CSRFToken': CsrfToken
        },
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: user_id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone
        }),
        success: function (response) {
            if (response.status === "success") {
                createMessage(response.status, response.message)
                setTimeout(() => {
                    if (response.status_email_error === "error" && response.message_email_error != "") {
                        createMessage(response.status_email_error, response.message_email_error)
                        let emailInput = document.getElementById("email")
                        emailInput.value = response.email
                    }
                }, 4500)
                user_first_name.innerText = firstName
                firstNameInput.value = firstName
                firstNameInput.placeholder = firstName
                user_last_name.innerText = lastName
                lastNameInput.value = lastName
                lastNameInput.placeholder = lastName
                emailInput.value = email
                emailInput.placeholder = email
                phoneInput.value = phone
                phoneInput.placeholder = phone
            }
        },
        error: function(response) {
            if (response.status === "error") {
                createMessage(response.status, response.message);
            }

        }
    });
}

function ChangePassword(btn) {
    const URL = "/users/check_old_password/"
    const CsrfToken = getCsrfToken()

    let user_id = btn.getAttribute("data-user_id");
    let inputOldPassword = document.getElementById("old_password").value;

    let update_old_pass_cont = document.querySelector(".update_old_pass_cont");
    let update_pass_cont = document.querySelector(".update_pass_cont");

    $.ajax({
        url: URL,
        headers: {
            'X-CSRFToken': CsrfToken
        },
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: user_id,
            old_password: inputOldPassword,
        }),
        success: function (response) {
            if (response.status === "success") {
                createMessage(response.status, response.message);
                update_old_pass_cont.classList.add("close_update_old_pass_cont");
                update_pass_cont.classList.add("open_update_pass_cont");

            } else {
                createMessage("error", response.message);
            }
        },
        error: function(response) {
            if (response.status === "error") {
                createMessage(response.status, response.message);
            }
        }
    });
}

function UpdatePassword(btn) {
    const URL = "/users/update_password/"
    const CsrfToken = getCsrfToken()

    let user_id = btn.getAttribute("data-user_id");
    let inputNewPassword = document.getElementById("password").value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let update_old_pass_cont = document.querySelector(".update_old_pass_cont");
    let update_pass_cont = document.querySelector(".update_pass_cont");

    if (!passwordRegex.test(inputNewPassword)) {
        let status = "error";
        let message = "Пароль повинен містити принаймні одну велику букву, одну цифру і бути не коротше 8 символів!";
        createMessage(status, message)
        return;
    } else {
        $.ajax({
            url: URL,
            headers: {
                'X-CSRFToken': CsrfToken
            },
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                user_id: user_id,
                old_password: inputNewPassword,
            }),
            success: function (response) {
                if (response.status === "success") {
                    createMessage(response.status, response.message);
                    update_old_pass_cont.classList.remove("close_update_old_pass_cont");
                    update_pass_cont.classList.remove("open_update_pass_cont");
                    // ReLogin(user_id)

                } else {
                    createMessage("error", response.message);
                }
            },
            error: function (response) {
                if (response.status === "error") {
                    createMessage(response.status, response.message);
                }
            }
        });
    }
}
