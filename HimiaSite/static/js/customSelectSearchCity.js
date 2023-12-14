
// const wrapper = document.querySelector(".wrapper"),
// selectBtn = wrapper.querySelector(".select-btn"),
// searchInp = wrapper.querySelector(".inp_selector_search"),
// options = wrapper.querySelector(".options");
// let CheckboxCourier = document.querySelector('.Courier');
// let deliveryInf = document.querySelector('.Street');
// // let countries = ["Львів", "Київ", "Одесса", "Харків", "Дніпро", "Тернопіль", "Івано-Франківськ"];
// function addCountry(selectedCountry) {
//     options.innerHTML = "";
//     countries.forEach(country => {
//         let isSelected = country == selectedCountry ? "selected" : "";
//
//         let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
//         options.insertAdjacentHTML("beforeend", li);
//     });
// }
// addCountry();
// function updateName(selectedLi) {
//     searchInp.value = "";
//     addCountry(selectedLi.innerText);
//     wrapper.classList.remove("active");
//     selectBtn.firstElementChild.innerText = selectedLi.innerText;
//     selectBtn.setAttribute('data-city', selectedLi.innerText)
//     checkedCityDeliveryPermission()
// }
//
// searchInp.addEventListener("keyup", () => {
//     let arr = [];
//     let searchWord = searchInp.value.toLowerCase();
//     arr = countries.filter(data => {
//         return data.toLowerCase().startsWith(searchWord);
//     }).map(data => {
//         let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
//         return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
//     }).join("");
//     let styleP = "margin-top: 10px; font-family: 'blogger_sansbold', sans-serif; font-size: 15px; font-weight: 500;color: #363535;"
//     options.innerHTML = arr ? arr : `<p style="${styleP}">Місто не знайдено</p>`;
// });
// selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
//
//
// function checkedCityDeliveryPermission(){
//     let dataCity = selectBtn.getAttribute('data-city')
//
//     if (dataCity === "Львів"){
//         CheckboxCourier.style.display = "flex";
//         CheckboxCourier.style.height = "fit-content";
//         // deliveryInf.style.display = "flex";
//         // deliveryInf.style.height = "fit-content";
//     } else {
//         CheckboxCourier.style.display = "none";
//         CheckboxCourier.style.height = 0;
//         // deliveryInf.style.display = "none";
//         // deliveryInf.style.height = 0;
//     }
// }
//
// checkedCityDeliveryPermission()

// const wrapper = document.querySelector(".wrapper"),
//     searchInp = wrapper.querySelector(".inp_selector_search_city");
// let CheckboxCourier = document.querySelector('.Courier');
// let timeoutId;
//
// function getCities(CityValue) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(function () {
//         let CValue = CityValue.value;
//         sendValueToServer(CValue)
//     }, 800);
// }
//
// function sendValueToServer(CValue) {
//     let csrfToken = getCsrfToken();
//
//     let data = {
//         csrfmiddlewaretoken: csrfToken,
//         search_city: CValue
//     };
//
//     // Показати лоадер перед відправкою запиту
//     $(".loader").show();
//
//     $.ajax({
//         type: "POST",
//         url: "/np/get_cities/",
//         data: data,
//         success: function (response) {
//             console.log(response);
//             if (Array.isArray(response.data)) {
//                 let optionsList = $(".options");
//                 optionsList.empty();
//
//                 response.data.forEach(function (city) {
//                     let listItem = document.createElement("li");
//                     listItem.textContent = city.Present;
//                     listItem.setAttribute("data-ref", city.Ref);
//                     listItem.setAttribute("data-fullname", city.Present)
//                     listItem.setAttribute("data-short-name", city.MainDescription)
//                     listItem.onclick = function () {
//                         updateName(this);
//                     };
//                     optionsList.append(listItem);
//                     wrapper.classList.add("active");
//                 });
//             } else {
//                 console.error("Не обтриманно ніяких данних");
//             }
//
//             // Приховати лоадер після отримання відповіді
//             $(".loader").hide();
//         },
//     });
// }
//
// function updateName(selectedLi) {
//     const dataRef = selectedLi.getAttribute("data-ref");
//     const CityFullName = selectedLi.getAttribute("data-fullname");
//     const selectedShortValue = selectedLi.getAttribute("data-short-name");
//
//     searchInp.value = selectedShortValue;
//
//     searchInp.setAttribute("data-city", selectedShortValue);
//     searchInp.setAttribute("data-ref", dataRef);
//     searchInp.setAttribute("data-fullname", CityFullName);
//
//     localStorage.setItem("selectedCity", selectedShortValue);
//     localStorage.setItem("selectedCityRef", dataRef);
//     localStorage.setItem("CityFullName", CityFullName);
//
//     wrapper.classList.remove("active");
//
//     checkedCityDeliveryPermission(selectedShortValue);
// }
//
// function checkedCityDeliveryPermission(selectedValue){
//     const selectedCity = localStorage.getItem("selectedCity");
//     // let dataCity = searchInp.getAttribute('data-city')
//     if (selectedValue === "Львів" || selectedCity === "Львів"){
//         CheckboxCourier.style.display = "flex";
//         CheckboxCourier.style.height = "fit-content";
//         // deliveryInf.style.display = "flex";
//         // deliveryInf.style.height = "fit-content";
//     } else {
//         CheckboxCourier.style.display = "none";
//         CheckboxCourier.style.height = 0;
//         // deliveryInf.style.display = "none";
//         // deliveryInf.style.height = 0;
//     }
// }
//
// checkedCityDeliveryPermission()
//
//
// // function clearInput(element) {
// //     const inputElement = element.parentElement.querySelector(".inp_selector_search_city");
// //     if (inputElement) {
// //         inputElement.value = "";
// //     }
// // }
//
// function initializePageFromLocalStorage() {
//     const selectedCity = localStorage.getItem("selectedCity");
//     const selectedCityRef = localStorage.getItem("selectedCityRef");
//
//     // Отримайте елемент <input> та встановіть значення
//     const searchInp = document.querySelector(".inp_selector_search_city"); // Оновлено селектор
//     searchInp.value = selectedCity;
//     searchInp.setAttribute("data-city", selectedCity);
//
//     // Отримайте список варіантів та додайте клас "active"
//     const optionsList = document.querySelector(".options");
//     if (selectedCity) {
//         optionsList.classList.add("active"); // Оновлено селектор
//     }
// }
//
// // Викличте цю функцію для ініціалізації сторінки зі значеннями з LocalStorage
// initializePageFromLocalStorage();
//
// // ===================================================
// function getCsrfToken() {
//     var csrfCookieName = 'csrftoken'; // Ім'я cookies для csrftoken
//     var cookies = document.cookie.split(';');
//
//     for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i].trim();
//
//         if (cookie.indexOf(csrfCookieName + '=') === 0) {
//             return cookie.substring(csrfCookieName.length + 1, cookie.length);
//         }
//     }
//
//     return null;
// }
//
// function encryptData(data, password) {
//     const encryptedData = CryptoJS.AES.encrypt(data, password).toString();
//     return encryptedData;
// }
//
// // Функція для розшифрування даних
// function decryptData(encryptedData, password) {
//     const bytes = CryptoJS.AES.decrypt(encryptedData, password);
//     const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//     return decryptedData;
// }
//
// // const dataToEncrypt = "Секретна інформація";
// // const password = "Сильний пароль";
// //
// // const encryptedData = encryptData(dataToEncrypt, password);
// // console.log("Зашифровані дані:", encryptedData);
// //
// // const decryptedData = decryptData(encryptedData, password);
// // console.log("Розшифровані дані:", decryptedData);
//
// // ===================================================
