

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
        divPasswordInputWrapper.style.borderBottom = "2px solid #00ff00";
      } else {
        divPasswordInputWrapper.style.borderBottom = "2px solid #ff5900";
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
let blockLoginRegModal = document.querySelector(".block_login_reg_modal");
let closeBtnFront = document.querySelector(".open_close__front");
let closeBtnBack = document.querySelector(".open_close__back");
function openLogRegModal(){
  resLogModalBtn.addEventListener("click", ()=>{
    blockLoginRegModal.style.display = "flex";
  })
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
    // Збирання даних для відправки на сервер
    const formData = {
      email: this.email.value,
      password: this.password.value,
    };

    // Ваша логіка для відправки даних за допомогою fetch
    sendLoginDataToServer(formData);
  }
});

function sendLoginDataToServer(login_data){
  const csrftoken = getCookie('csrftoken');

  fetch("login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
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
    // Збирання даних для відправки на сервер
    const formData = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      phone_number: this.phone_number.value,
      password: this.password.value,
      checkbox: this.checkbox.value
    };

    // Ваша логіка для відправки даних за допомогою fetch
    sendDataToServer(formData);
  }
});

function MessageClose(){
  let closeMessageIcon = document.getElementById("message_close_btn");
  let divMessages = document.querySelector(".err-suc_message");
  closeMessageIcon.addEventListener("click", () => {
    console.log("helloo")
    divMessages.style.transform = "translateX(100%)";
  });
}
MessageClose()

function createMessage(status, message) {
  const divMessages = document.querySelector(".err-suc_message");
  const textMessages = document.getElementById("error-success_text");

  if (status === "error") {
    textMessages.innerText = message;
    textMessages.style.color = "#ffffff"; // Зміна кольору тексту
    divMessages.style.border = "2px solid red";
    divMessages.style.backgroundColor = "red";
    divMessages.style.transform = "translateX(-5%)";
    setTimeout(function () {
      divMessages.style.transform = "translateX(110%)";
    }, 3000);
  }

  if (status === "success") {
    textMessages.innerText = message;
    textMessages.style.color = "#3a3a3a"; // Зміна кольору тексту
    divMessages.style.border = "2px solid #00ff00";
    divMessages.style.backgroundColor = "#00ff00";
    divMessages.style.transform = "translateX(-5%)";
    setTimeout(function () {
      divMessages.style.transform = "translateX(100%)";
    }, 3000);
  }
}

function validation(form) {
  let result = true;

  const firstName = form.querySelector('[name="first_name"]');
  const lastName = form.querySelector('[name="last_name"]');
  const email = form.querySelector('[name="email"]');
  const phoneNumber = form.querySelector('[name="phone_number"]');
  const password = form.querySelector('[name="password"]');
  const checkbox = form.querySelector('[name="checkbox"]');

  const status = "error"

  if (firstName.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть ім'я!");
    result = false;
  } else if (lastName.value.trim() === "") {
    createMessage(status, "Будь ласка, введіть прізвище!");
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
  }if (password.value === "") {
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
  const csrftoken = getCookie('csrftoken');

  fetch("register/", {
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

// Функція для отримання значення cookie за іменем
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
































