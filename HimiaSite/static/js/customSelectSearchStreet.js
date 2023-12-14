
// const wrapperSelectStreet = document.querySelector(".wrapper_select_street"),
// selectBtnStreet = wrapperSelectStreet.querySelector(".select-btn_street"),
// searchInpStreet = wrapperSelectStreet.querySelector(".inp_selector_search_street"),
// optionsStreet = wrapperSelectStreet.querySelector(".options_street");
//
// // let countries = ["Львів", "Київ", "Одесса", "Харків", "Дніпро", "Тернопіль", "Івано-Франківськ"];
// function addCountry(selectedStreet) {
//     optionsStreet.innerHTML = "";
//     streetsLviv.forEach(streets => {
//         let isSelected = streets == selectedStreet ? "selected" : "";
//
//         let li = `<li onclick="updateNameStreet(this)" class="${isSelected}">${streets}</li>`;
//         optionsStreet.insertAdjacentHTML("beforeend", li);
//     });
// }
// addCountry();
// function updateNameStreet(selectedLi) {
//     searchInpStreet.value = "";
//     addCountry(selectedLi.innerText);
//     wrapperSelectStreet.classList.remove("active");
//     selectBtnStreet.firstElementChild.innerText = selectedLi.innerText;
//     selectBtnStreet.setAttribute('data-street', selectedLi.innerText)
// }
//
// searchInpStreet.addEventListener("keyup", () => {
//     let arr = [];
//     let searchWord = searchInpStreet.value.toLowerCase();
//     arr = streetsLviv.filter(data => {
//         return data.toLowerCase().startsWith(searchWord);
//     }).map(data => {
//         let isSelected = data == selectBtnStreet.firstElementChild.innerText ? "selected" : "";
//         return `<li onclick="updateNameStreet(this)" class="${isSelected}">${data}</li>`;
//     }).join("");
//     let styleP = "margin-top: 10px; font-family: 'blogger_sansbold', sans-serif; font-size: 15px; font-weight: 500;color: #363535;"
//     optionsStreet.innerHTML = arr ? arr : `<p style="${styleP}">Вулиці не знайдено</p>`;
// });
// selectBtnStreet.addEventListener("click", () => wrapperSelectStreet.classList.toggle("active"));

// function changeCheckBox(checkbox) {
//
//   const checkboxes = document.querySelectorAll('.checkout_input_checkbox');
//   checkboxes.forEach((otherCheckbox) => {
//     if (otherCheckbox !== checkbox) {
//       otherCheckbox.checked = false;
//     }
//   });
//   let valueCheckbox = checkbox.getAttribute('data-delivery');
//     console.log(valueCheckbox)
// }

