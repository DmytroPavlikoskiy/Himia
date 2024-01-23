

const cart = document.querySelector(".cart_inner");
const redirectRegisterBtn = document.querySelector(".redirect_register_btn");
const redirectLoginBtn = document.querySelector('.redirect_login_btn');

function FlipRegisterCart(){
  redirectRegisterBtn.addEventListener("click", (el) => {
    cart.classList.toggle("is_flipped");
  })
}

function FlipLoginCart(){
  redirectLoginBtn.addEventListener("click", (el) => {
    cart.classList.remove("is_flipped");
  })
}

FlipRegisterCart()
FlipLoginCart()

let btnPass = document.querySelector(".btn_pass");
let inputPass = document.querySelector(".js-password-input");

let jsPasswordInput = document.querySelector(".js-password-input");
let divPasswordInputWrapper = document.querySelector(".password-input-wrapper");


function GetColorInputPass(){
  jsPasswordInput.addEventListener("click", () => {
    document.addEventListener("click", (event) => {
      const evenTarg = event.target
      if (evenTarg === jsPasswordInput || evenTarg === btnPass || evenTarg === divPasswordInputWrapper) {
        divPasswordInputWrapper.style.borderBottom = "2px solid #30d5c8";
      } else {
        divPasswordInputWrapper.style.borderBottom = "2px solid #1c948d";
      }
    })
  });
}

GetColorInputPass()

function VisibleUnvisiblePass(){
  btnPass.addEventListener("click", ()=>{
    if (inputPass.getAttribute("type") === "password"){
      inputPass.setAttribute("type", "text")
      btnPass.innerHTML = "visibility";
    } else {
      inputPass.setAttribute("type", "password")
      btnPass.innerHTML = "visibility_off";
    }
  })
}

VisibleUnvisiblePass()

let resLogModalBtn = document.getElementById("res_log_modal_btn");
let resLogModalBtnMob = document.getElementById("res_log_modal_btn_mob");
let blockLoginRegModal = document.querySelector(".block_login_reg_modal");
let closeBtnFront = document.querySelector(".open_close__front");
let closeBtnBack = document.querySelector(".open_close__back");

function openLogRegModal() {
  // Перевірка, чи існує елемент resLogModalBtn
  if (resLogModalBtn && resLogModalBtnMob) {
    resLogModalBtn.addEventListener("click", () => {
      blockLoginRegModal.style.display = "flex";
    });
    resLogModalBtnMob.addEventListener("click", () => {
      blockLoginRegModal.style.display = "flex";
    });
  } else {
    return
    // console.error("Елемент з id 'res_log_modal_btn' не знайдено.");
  }
}

function closeLogRegModal(){
  closeBtnFront.addEventListener("click", ()=>{
    blockLoginRegModal.style.display = "none";
  })
  closeBtnBack.addEventListener("click", ()=>{
    blockLoginRegModal.style.display = "none";
    cart.classList.remove("is_flipped");
  })
}

closeLogRegModal()
openLogRegModal()


const checkbox = document.querySelector(".js-input-checkbox");

checkbox.addEventListener("change", function() {
  const value = this.checked ? "True" : "";
  checkbox.value = value;
});


// ======================================================
// LOGIN

function validation_login(login_form) {
  let result = true;

  const email = login_form.querySelector('[name="email"]');
  const password = login_form.querySelector(".js-password-input");

  const status = "error";

  if (email.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть електронну пошту!");
    result = false;
  } else if (!isValidEmail(email.value)) {
    createMessage(status, "Будь ласка, введіть коректну електронну пошту!");
    result = false;
  } if (password.value === "") {
    createMessage(status, "Будь ласка, введіть пароль!");
    result = false;
  } else if (!isValidPassword(password.value)) {
    createMessage(status, "Пароль повинен містити принаймні одну велику букву, одну цифру і бути не коротше 8 символів!");
    result = false;
  }

  return result;
}

document.querySelector("#login_from").addEventListener("submit", function(event) {
  console.log("hello2")
  event.preventDefault();
  if (validation_login(this)) {
    console.log('hello3')
    // Збирання даних для відправки на сервер
    const formData = {
      email: this.email.value,
      password: this.password.value,
    };

    // Ваша логіка для відправки даних за допомогою fetch
    sendLoginDataToServer(formData);
    console.log('hello4')
  }
});

function sendLoginDataToServer(login_data){
  // const csrftoken = getCsrfToken();
  const csrf_token = getCsrfToken()
  console.log(csrf_token)
  console.log("hello5")

  fetch("/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf_token,
    },
    body: JSON.stringify(login_data)
  })
  .then(response => response.json())
  .then(login_data => {
    if (login_data.status === "success") {
      createMessage(login_data.status, login_data.message)
      setTimeout(()=>{
        window.location.href = login_data.redirect_url;
      }, 1500)
    } else if (login_data.status === "error") {
      createMessage(login_data.status, login_data.message)
      console.error(login_data.message);
    }
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });
}

// ===========================================================


document.querySelector(".js-form").addEventListener("submit", function(event) {
  console.log("hello")
  event.preventDefault();
  if (validation(this)) {
    const formData = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      phone_number: this.phone_number.value,
      password: this.password.value,
      checkbox: this.checkbox.value
    };
    sendDataToServer(formData);
  }
});


function validation(form) {
  let result = true;

  const firstName = form.querySelector('[name="first_name"]');
  const lastName = form.querySelector('[name="last_name"]');
  const email = form.querySelector('[name="email"]');
  const phoneNumber = form.querySelector('[name="phone_number"]');
  const password = form.querySelector('[name="password"]');
  const checkbox = form.querySelector('[name="checkbox"]');

  const status = "error";

  // Регулярний вираз для перевірки, що рядок містить тільки кирилицю
  const cyrillicRegex = /^[\u0400-\u04FF]+$/;

  if (firstName.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть ім'я!");
    result = false;
  } else if (!cyrillicRegex.test(firstName.value.trim())) {
    createMessage(status, "Ім'я повинно містити тільки кирилицю!");
    result = false;
  } else if (lastName.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть прізвище!");
    result = false;
  } else if (!cyrillicRegex.test(lastName.value.trim())) {
    createMessage(status, "Прізвище повинно містити тільки кирилицю!");
    result = false;
  } else if (email.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть електронну пошту!");
    result = false;
  } else if (!isValidEmail(email.value)) {
    createMessage(status, "Будь ласка, введіть коректну електронну пошту!");
    result = false;
  } else if (phoneNumber.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть номер телефону!");
    result = false;
  } else if (!isValidPhoneNumber(phoneNumber.value)) {
    createMessage(status, "Будь ласка, введіть коректний номер телефону!");
    result = false;
  } else if (password.value === "") {
    createMessage(status, "Будь ласка, введіть пароль!");
    result = false;
  } else if (!isValidPassword(password.value)) {
    createMessage(status, "Пароль повинен містити принаймні одну велику букву, одну цифру і бути не коротше 8 символів!");
    result = false;
  } else if (checkbox.value === "") {
    createMessage(status, "Для реєстрації потрібно прийняти умови та надати згоду на обробку даних!");
    result = false;
  }

  return result;
}

// function validation(form) {
//   let result = true;
//
//   const firstName = form.querySelector('[name="first_name"]');
//   const lastName = form.querySelector('[name="last_name"]');
//   const email = form.querySelector('[name="email"]');
//   const phoneNumber = form.querySelector('[name="phone_number"]');
//   const password = form.querySelector('[name="password"]');
//   const checkbox = form.querySelector('[name="checkbox"]');
//
//   const status = "error"
//
//   if (firstName.value.trim() === "") {
//     createMessage(status, "Будь ласка, введіть ім'я!");
//     result = false;
//   } else if (lastName.value.trim() === "") {
//     createMessage(status, "Будь ласка, введіть прізвище!");
//     result = false;
//   } else if (email.value.trim() === "") {
//     createMessage(status, "Будь ласка, введіть електронну пошту!");
//     result = false;
//   } else if (!isValidEmail(email.value)) {
//     createMessage(status, "Будь ласка, введіть коректну електронну пошту!");
//     result = false;
//   } else if (phoneNumber.value.trim() === "") {
//     createMessage(status, "Будь ласка, введіть номер телефону!");
//     result = false;
//   } else if (!isValidPhoneNumber(phoneNumber.value)) {
//     createMessage(status, "Будь ласка, введіть коректний номер телефону!");
//     result = false;
//   }if (password.value === "") {
//     createMessage(status, "Будь ласка, введіть пароль!");
//     result = false;
//   } else if (!isValidPassword(password.value)) {
//     createMessage(status, "Пароль повинен містити принаймні одну велику букву, одну цифру і бути не коротше 8 символів!");
//     result = false;
//   } else if (checkbox.value === "") {
//     createMessage(status, "Для реєстрації потрібно прийняти умови та надати згоду на обробку даних!");
//     result = false;
//   }
//
//   return result;
// }

function isValidEmail(email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Регулярний вираз для перевірки валідності пароля
  // Містить принаймні одну велику букву, одну цифру і має довжину не менше 8 символів
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

function isValidPhoneNumber(phoneNumber) {
  // Тут ви можете використовувати регулярний вираз для перевірки номера телефону
  // Наприклад: /^\d{10}$/ для перевірки 10 цифр
  return /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneNumber);
}

function sendDataToServer(data) {
  const csrftoken = getCsrfToken();

  fetch("/users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      createMessage(data.status, data.message)
      console.log(data.message);
      cart.classList.remove("is_flipped");
    } else if (data.status === "error") {
      createMessage(data.status, data.message)
      console.error(data.message);
    }
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });
}


