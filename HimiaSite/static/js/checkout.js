let startTruckStepTwo = document.querySelector('.truck_step_two');
let startTruckStepThree = document.querySelector('.truck_step_three');

let truck = document.getElementById('truck');
const wrapper = document.querySelector(".wrapper"),
    searchInp = wrapper.querySelector(".inp_selector_search_city");
let timeoutId;
const wrapperStreet = document.querySelector(".wrapper_street"),
    searchInpStreet = wrapperStreet.querySelector(".inp_selector_search_street");
let CheckboxCourier = document.querySelector('.Courier');
const wrapperDepartment = document.querySelector(".wrapper_department"),
    InpDep = wrapperDepartment.querySelector(".inp_selector_search_department");
const wrapperPM = document.querySelector(".wrapper_pm"),
    InpPM = wrapperPM.querySelector(".inp_selector_search_pm");

let DelInfo = document.querySelector(".delivery_info");
let ContInfo = document.querySelector(".cont_info");
let PaymentInfo = document.querySelector(".payment_info");

let Payment = document.querySelector(".payment");
let Delivery = document.querySelector(".delivery");

let Step = localStorage.getItem("Step");



function startStepTwo(){
    let status = ""
    startTruckStepTwo.disabled = false;
    startTruckStepTwo.addEventListener("click", (event) => {
        let nameInput = document.querySelector('.checkout_input[name="first_name"]');
        let surnameInput = document.querySelector('.checkout_input[name="last_name"]');
        let emailInput = document.querySelector('.checkout_input[name="email"]');
        let phoneInput = document.querySelector('.checkout_input[name="phone_number"]');

        // Проста перевірка на пусте поле для імені та прізвища
        var cyrillicRegex = /^[А-ЯЁёа-яІіЇїЄєҐґ\s]+$/;
        console.log(!cyrillicRegex.test(nameInput.value))
        console.log(!cyrillicRegex.test(surnameInput.value))
        if (!cyrillicRegex.test(nameInput.value) || !cyrillicRegex.test(surnameInput.value)) {
            status = "error";
            message = 'Будь ласка, введіть коректне ім\'я та прізвище';
            createMessage(status, message);
            event.preventDefault();
            return;
        }

        // Валідація електронної пошти
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            status = "error"
            message = 'Будь ласка, введіть правильну електронну пошту.'
            createMessage(status, message)
            event.preventDefault()
            startTruckStepTwo.disabled = false;
            return;
        }

        // Валідація номеру телефону
        var phoneRegex = /^\+\d{2}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            status = "error"
            message = 'Будь ласка, введіть правильний номер телефону у форматі +38 (098) 465-99-43.'
            createMessage(status, message)
            event.preventDefault();
            startTruckStepTwo.disabled = false;
            return;
        }
        else {
            localStorage.setItem("name", nameInput.value);
            localStorage.setItem("surname", surnameInput.value);
            localStorage.setItem("email", emailInput.value);
            localStorage.setItem("phone", phoneInput.value);

            startTruckStepTwo.disabled = true;
            truck.classList.add("truck_step_two")
            ContInfo.classList.add("close_step_first")
            DelInfo.classList.add("open_step_two")

            Delivery.classList.remove("delivery_hide")
            Delivery.classList.add("delivery_visible")

            ContInfo.classList.remove("cont_info_visible")
            ContInfo.classList.add("cont_info_hide")

            Payment.classList.remove("payment_visible")
            Payment.classList.add("payment_hide")

            localStorage.setItem("Step", "Delivery");
        }
    });
}

startStepTwo()

function startStepThree() {
    startTruckStepThree.addEventListener("click", () => {
        console.log("startTruckStepThree");
        let statValidForm = validateForm()
        console.log(statValidForm)
        if (statValidForm) {
            localStorage.setItem("step_three", "true")
            truck.classList.remove("start_three_step_two")
            truck.classList.add("truck_step_three")
            PaymentInfo.classList.add("open_step_three")

            Delivery.classList.add("delivery_hide")
            Delivery.classList.remove("delivery_visible")

            ContInfo.classList.remove("cont_info_visible")
            ContInfo.classList.add("cont_info_hide")

            Payment.classList.remove("payment_hide")
            Payment.classList.add("payment_visible")

            DelInfo.classList.remove("open_step_two")
            DelInfo.classList.add("close_step_two")
            let selectedPaymentMethod = localStorage.getItem("selectedPaymentMethod")
            let checkboxTrue = document.querySelector(`.checkout_input_checkbox_payment[data-payment='${selectedPaymentMethod}']`);
            console.log(selectedPaymentMethod)
            if (selectedPaymentMethod === null) {
                localStorage.setItem("selectedPaymentMethod", 'Card_on_website')
                let selectedPaymentMethod = localStorage.getItem("selectedPaymentMethod")
                let checkboxTrue = document.querySelector(`.checkout_input_checkbox_payment[data-payment='${selectedPaymentMethod}']`);
                console.log(selectedPaymentMethod)
                updatePaymentButtons(checkboxTrue)
            } else  {
                localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod)
                updatePaymentButtons(checkboxTrue)
            }
            localStorage.setItem("Step", "Payment");
        }
    });
}
startStepThree()


function validateForm() {
    // Перевірка, чи вибрано хоча б один checkbox
    let courierCheckbox = document.querySelector('input[name="Courier"]');
    let npBranchCheckbox = document.querySelector('input[name="NP-Branch"]');
    let npPostalMachineCheckbox = document.querySelector('input[name="NP-Postal-Machine"]');
    let homeInput = document.querySelector('input[name="home"]');

    if (!(courierCheckbox.checked || npBranchCheckbox.checked || npPostalMachineCheckbox.checked)) {
        createMessage("error", "Будь ласка, оберіть один з варіантів доставки");
        return false;
    }

    // Перевірка конкретних умов на основі обраного checkbox
    if (courierCheckbox.checked) {
        let streetInput = document.querySelector('input[name="search_street"]');
        let homeInput = document.querySelector('input[name="home"]');

        if (!streetInput.value.trim() || !homeInput.value.trim()) {
            createMessage("error", "Будь ласка, введіть вулицю та номер будинку для доставки кур'єром");
            return false;
        }
    }

    if (npBranchCheckbox.checked) {
        let npBranchInput = document.querySelector('input[name="search_department"]');

        if (!npBranchInput.value.trim()) {
            createMessage("error", "Будь ласка, оберіть відділення для доставки Новою Поштою");
            return false;
        }
    }

    if (npPostalMachineCheckbox.checked) {
        let npPostalMachineInput = document.querySelector('input[name="search_pm"]');

        if (!npPostalMachineInput.value.trim()) {
            createMessage("error", "Будь ласка, оберіть поштомат для доставки Новою Поштою");
            return false;
        }
    }

    // Якщо всі перевірки пройдено, дозволяємо формі продовжити
    let homeInfo = homeInput.value
    let apartmentValue = document.querySelector('input[name="apartment"]').value;
    localStorage.setItem("homeInfo", homeInfo)
    localStorage.setItem("apartment", apartmentValue)
    return true;
}

// ====================================================================

function getCities(CityValue) {
    if (CityValue === ""){
        wrapper.classList.remove("active");
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        let CValue = CityValue.value;
        console.log(CityValue.value)
        sendValueToServer(CValue)
    }, 800);
}

function openDepartment(){
    let arrowClick = document.querySelector(".arrow_dep");
    arrowClick.addEventListener("click", ()=>{
        wrapperDepartment.classList.toggle("active")
    })
}

openDepartment()

function openPM(){
    let arrowClick = document.querySelector(".arrow_pm");
    arrowClick.addEventListener("click", ()=>{
        wrapperPM.classList.toggle("active")
    })
}

openPM()

function searchPM() {
    let PMInput = document.querySelector(".inp_selector_search_pm");
    PMInput.addEventListener("input", () => {
        let searchText = PMInput.value.toLowerCase(); // Текст для пошуку, перетворений на нижній регістр
        let PMLi = document.querySelectorAll(".li_pm");

        PMLi.forEach((elem) => {
            const liText = elem.textContent.toLowerCase();
            if (liText.includes(searchText)) {
                elem.classList.remove("not_search"); // Якщо текст містить введений текст, видаляємо клас "not_search"
            } else {
                elem.classList.add("not_search"); // Якщо текст не містить введений текст, додаємо клас "not_search"
            }
        });

        if (searchText.length > 0) {
            wrapperPM.classList.add("active");
        } else {
            wrapperPM.classList.remove("active");
        }
    });
}

searchPM();

function searchDepartment() {
    let DepInput = document.querySelector(".inp_selector_search_department");
    DepInput.addEventListener("input", () => {
        let searchText = DepInput.value.toLowerCase();
        let DepLi = document.querySelectorAll(".li_dep");

        DepLi.forEach((elem) => {
            const liText = elem.textContent.toLowerCase();
            if (liText.includes(searchText)) {
                elem.classList.remove("not_search");
            } else {
                elem.classList.add("not_search");
            }
        });

        if (searchText.length > 0) {
            wrapperDepartment.classList.add("active");
        } else {
            wrapperDepartment.classList.remove("active");
        }
    });
}

searchDepartment();

// function sendValueToServerPostalMachine(DValue){
//     let csrfToken = getCsrfToken();
//     let optionsList = $(".options_postal_machine"); // Ось тут створили окремий optionsList для цієї функції
//
//     let data = {
//         csrfmiddlewaretoken: csrfToken,
//         search_: CValue
//     };
// }

function sendValueToServerDepartment(DValue){
    let csrfToken = getCsrfToken();
    let optionsList = $(".options_department"); // Ось тут створили окремий optionsList для цієї функції

    let data = {
        csrfmiddlewaretoken: csrfToken,
        search_dep: DValue,
        total_order_weight: total_order_weight,
    };

    $.ajax({
        type: "POST",
        url: "/np/get_departments/",
        data: data,
        success: function (response) {
            console.log(response);
            optionsList.empty();

            if (Array.isArray(response.data) && response.data.length > 0) {
                console.log(response.data)
                // Результати отримано, очищуємо і відображаємо їх
                response.data.forEach(function (department) {
                    let listDepartmentItem = document.createElement("li");
                    listDepartmentItem.classList.add("li_dep")
                    listDepartmentItem.textContent = department.Description;
                    listDepartmentItem.setAttribute("data-description", department.Description)
                    listDepartmentItem.setAttribute("data-short_address", department.ShortAddress)
                    listDepartmentItem.setAttribute("data-recipient_depart_ref", department.RecipientDepartRef)
                    listDepartmentItem.setAttribute("data-recipient_index", department.RecipientWarehouseIndex)
                    listDepartmentItem.onclick = function () {
                        updateNameDepartments(this);
                    };
                    optionsList.append(listDepartmentItem);
                });

            } else {
                console.error("Не отримано жодних даних");
                let liDep = document.querySelector('.li_dep');
                if (liDep) {
                    liDep.innerHTML = ""
                    liDep.style.display = "none";
                } else {
                    console.log(optionsList)
                    let listDepartmentItem = document.createElement("li");
                    listDepartmentItem.classList.add("li_dep")
                    let errorText = "Нічого не знайдено ¯\\_(ツ)_/¯"
                    listDepartmentItem.innerHTML = errorText;
                    optionsList.append(listDepartmentItem);
                    wrapperDepartment.classList.add("active");
                }
            }
        },
    });
}


function sendValueToServerPM(PMValue){
    let csrfToken = getCsrfToken();
    let optionsList = $(".options_pm"); // Ось тут створили окремий optionsList для цієї функції

    let data = {
        csrfmiddlewaretoken: csrfToken,
        search_pm: PMValue,
        total_order_weight: total_order_weight,
    };

    $.ajax({
        type: "POST",
        url: "/np/get_postal_machine/",
        data: data,
        success: function (response) {
            console.log(response);
            optionsList.empty();

            if (Array.isArray(response.data) && response.data.length > 0) {
                console.log(response.data)
                // Результати отримано, очищуємо і відображаємо їх
                response.data.forEach(function (pm) {
                    let listPMItem = document.createElement("li");
                    listPMItem.classList.add("li_pm")
                    listPMItem.textContent = pm.Description;
                    listPMItem.setAttribute("data-description_pm", pm.Description)
                    listPMItem.setAttribute("data-short_address_pm", pm.ShortAddress)
                    listPMItem.setAttribute("data-recipient_depart_ref", pm.RecipientDepartRef)
                    listPMItem.setAttribute("data-recipient_index", pm.RecipientWarehouseIndex)
                    listPMItem.onclick = function () {
                        updateNamePM(this);
                    };
                    optionsList.append(listPMItem);
                });

            } else {
                console.error("Не отримано жодних даних");
                let liPM = document.querySelector('.li_pm');
                if (liPM) {
                    liPM.innerHTML = ""
                    liPM.style.display = "none";
                } else {
                    console.log(optionsList)
                    let listPMItem = document.createElement("li");
                    listPMItem.classList.add("li_dep")
                    let errorText = "Нічого не знайдено ¯\\_(ツ)_/¯"
                    listPMItem.innerHTML = errorText;
                    optionsList.append(listPMItem);
                    wrapperPM.classList.add("active");
                }
            }
        },
    });
}


function sendValueToServer(CValue) {
    let csrfToken = getCsrfToken();
    let optionsList = $(".options"); // Ось тут створили окремий optionsList для цієї функції

    let data = {
        csrfmiddlewaretoken: csrfToken,
        search_city: CValue
    };

    // Показати лоадер перед відправкою запиту
    $(".loader").show();
    $.ajax({
        type: "POST",
        url: "/np/get_cities/",
        data: data,
        success: function (response) {
            console.log(response);
            optionsList.empty();

            if (Array.isArray(response.data) && response.data.length > 0) {
                // Результати отримано, очищуємо і відображаємо їх
                response.data.forEach(function (city) {
                    let listCityItem = document.createElement("li");
                    listCityItem.textContent = city.Present;
                    listCityItem.setAttribute("data-ref", city.Ref);
                    listCityItem.setAttribute("data-fullname", city.Present)
                    listCityItem.setAttribute("data-short-name", city.MainDescription)
                    listCityItem.onclick = function () {
                        updateName(this);
                    };
                    optionsList.append(listCityItem);
                    wrapper.classList.add("active");
                });
            } else {
                console.error("Не отримано жодних даних");
                let liCity = document.querySelector('.li_city');
                if (liCity) {
                    liCity.innerHTML = ""
                    liCity.style.display = "none";
                } else {
                    console.log(optionsList)
                    let listCityItem = document.createElement("li");
                    listCityItem.classList.add("li_city")
                    let errorText = "Нічого не знайдено ¯\\_(ツ)_/¯"
                    listCityItem.innerHTML = errorText;
                    optionsList.append(listCityItem);
                    wrapper.classList.add("active");
                }
            }
            // Приховати лоадер після отримання відповіді
            $(".loader").hide();
        },
    });
}

function getStreets(StreetsValue) {
    if (StreetsValue === ""){
        wrapperStreet.classList.remove("active");
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        let SValue = StreetsValue.value;
        sendValueToServerStreet(SValue)
    }, 800);
}

function sendValueToServerStreet(SValue){
    let csrfToken = getCsrfToken();
    // const selectedCityRef = localStorage.getItem("selectedCityRef");
    let dataRef = searchInp.getAttribute('data-ref');
    let dataCityRef = localStorage.getItem("selectedCityRef");
    console.log(dataRef)
    console.log(SValue)
    console.log(dataCityRef)
    let optionsListStreet = $(".options_street"); // Ось тут створили окремий optionsList для цієї функції

    let data = {
        csrfmiddlewaretoken: csrfToken,
        // selectedCityRef: selectedCityRef,
        dataRef: dataRef,
        selectedStreet: SValue,
        dataCityRef: dataCityRef
    };
    $(".loader_street").show();
    $.ajax({
        type: "POST",
        url: "/np/get_streets/",
        data: data,
        success: function (response) {
            // console.log(response);
            optionsListStreet.empty(); // Використовуємо окремий optionsList

            if (Array.isArray(response.data) && response.data.length > 0) {
                console.log("HEELLO IM HEEERE")
                console.log(response.data)
                response.data.forEach(function (street) {
                    let listStreetItem = document.createElement("li");
                    listStreetItem.classList.add("li_street")
                    listStreetItem.textContent = street.Present;
                    listStreetItem.setAttribute("data-fullname", street.Present)
                    listStreetItem.onclick = function () {
                        updateNameStreet(this);
                    };
                    optionsListStreet.append(listStreetItem);
                    wrapperStreet.classList.add("active");
                });
            } else {
                console.error("Не отримано жодних даних");
                let liStreet = document.querySelector('.li_street');
                if (liStreet) {
                    liStreet.innerHTML = ""
                    liStreet.style.display = "none";
                } else {
                    console.log(optionsListStreet)
                    let listStreetItem = document.createElement("li");
                    listStreetItem.classList.add("li_street")
                    let errorText = "Нічого не знайдено ¯\\_(ツ)_/¯";
                    listStreetItem.innerHTML = errorText;
                    optionsListStreet.append(listStreetItem);
                    wrapperStreet.classList.add("active");
                }
            }
            // Приховати лоадер після отримання відповіді
            $(".loader_street").hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("HELLO ERROR")
            try {
                const errorResponse = JSON.parse(xhr.responseText);
                if (errorResponse.status === "error" && errorResponse.message) {
                    createMessage("error", errorResponse.message);
                } else {
                    let liStreet = document.querySelector('.li_street');
                    if (liStreet) {
                        liStreet.innerHTML = ""
                        liStreet.style.display = "none";
                    } else {
                        console.log(optionsListStreet)
                        let listStreetItem = document.createElement("li");
                        listStreetItem.classList.add("li_street")
                        let errorText = "Нічого не знайдено ¯\\_(ツ)_/¯";
                        listStreetItem.innerHTML = errorText;
                        optionsListStreet.append(listStreetItem);
                        wrapperStreet.classList.add("active");
                        $(".loader_street").hide();
                    }
                }
            } catch (e) {
                createMessage("error", "Будь ласка, оберіть вулицю");
            }
        }
    });
}

function getCostDelivery() {
    console.log("COST DELIVERY")
    let csrftoken = getCsrfToken();
    const URL = "/np/calc_cost_of_delivery/"
    let selectedCityRef = localStorage.getItem("selectedCityRef");
    let data = {
        "selectedCityRef": selectedCityRef,
        "total_order_weight": total_order_weight,
        "order_price": order_price,
    }
    console.log(data)
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        let price = Number(data.Cost) + Number(data.AssessedCost)
        let delivery_cost = document.querySelector(".delivery_cost");
        let full_amount = document.querySelector(".full_amount");
        let del_price = document.querySelectorAll(".del_price");
        delivery_cost.innerHTML = data.Cost.toFixed(2) + ' <span>₴</span>';
        full_amount.innerHTML = price.toFixed(2) + ' <span>₴</span>';
        del_price[1].innerHTML = data.Cost.toFixed(2) + ' <span>₴</span>';
        del_price[1].style.color = "#414141";
        del_price[2].innerHTML = data.Cost.toFixed(2) + ' <span>₴</span>';
        del_price[2].style.color = "#414141";
        localStorage.setItem("total_price", price.toFixed(2))
        localStorage.setItem("delivery_cost", data.Cost.toFixed(2))
    });
}


// ======================================================================

function updateName(selectedLi) {
    const CityRef = selectedLi.getAttribute("data-ref");
    const CityFullName = selectedLi.getAttribute("data-fullname");
    const CityShortName = selectedLi.getAttribute("data-short-name");

    searchInp.value = CityShortName;
    searchInpStreet.value = ""
    InpDep.value = ""
    InpPM.value = ""

    localStorage.removeItem("PMFullName")
    localStorage.removeItem("DepartmentFullName")
    localStorage.removeItem("DepShortAddress")
    localStorage.removeItem("RecipientDepartRef")
    localStorage.removeItem("StreetFullName")
    localStorage.removeItem("dataDel")
    localStorage.removeItem("RecipientIndex");

    searchInp.setAttribute("data-city", CityShortName);
    searchInp.setAttribute("data-ref", CityRef);
    searchInp.setAttribute("data-fullname", CityFullName);

    localStorage.setItem("selectedCity", CityShortName);
    localStorage.setItem("selectedCityRef", CityRef);
    localStorage.setItem("CityFullName", CityFullName);

    wrapper.classList.remove("active");

    checkedCityDeliveryPermission();
    sendValueToServerDepartment(CityShortName)
    sendValueToServerPM(CityShortName)
    getCostDelivery()
}

function updateNameStreet(selectedLi) {
    console.log("hello")
    console.log(selectedLi)
    // const StreetRef = selectedLi.getAttribute("data-ref");
    const StreetFullName = selectedLi.getAttribute("data-fullname");
    // const streetShortName = selectedLi.getAttribute("data-short-name");
    console.log(searchInpStreet)
    searchInpStreet.value = StreetFullName;
    InpDep.value = ""
    InpPM.value = ""
    localStorage.removeItem("PMFullName")
    localStorage.removeItem("PMShortAddress")
    localStorage.removeItem("DepartmentFullName")
    localStorage.removeItem("DepShortAddress")
    localStorage.removeItem("RecipientDepartRef");
    localStorage.removeItem("RecipientIndex");
    // searchInpStreet.setAttribute("data-street", streetShortName);
    // searchInpStreet.setAttribute("data-ref", StreetRef);
    searchInpStreet.setAttribute("data-fullname", StreetFullName);

    // localStorage.setItem("streetShortName", streetShortName);
    // localStorage.setItem("StreetRef", StreetRef);
    localStorage.setItem("StreetFullName", StreetFullName);

    wrapperStreet.classList.remove("active");

    checkedCityDeliveryPermission(selectedShortValue);
}

function updateNameDepartments(selectedLi) {
    console.log(selectedLi)
    // const StreetRef = selectedLi.getAttribute("data-ref");
    const DepShortAddress = selectedLi.getAttribute("data-short_address");
    const DepFullName = selectedLi.getAttribute("data-description");
    const RecipientDepartRef = selectedLi.getAttribute("data-recipient_depart_ref");
    const RecipientIndex = selectedLi.getAttribute("data-recipient_index");
    // const streetShortName = selectedLi.getAttribute("data-short-name");
    InpDep.value = DepShortAddress;
    InpPM.value = ""
    searchInpStreet.value = ""
    localStorage.removeItem("PMFullName")
    localStorage.removeItem("PMShortAddress")
    localStorage.removeItem("RecipientDepartRef")
    localStorage.removeItem("StreetFullName")
    // searchInpStreet.setAttribute("data-street", streetShortName);
    // searchInpStreet.setAttribute("data-ref", StreetRef);
    InpDep.setAttribute("data-dep_fullname", DepFullName);

    // localStorage.setItem("streetShortName", streetShortName);
    // localStorage.setItem("StreetRef", StreetRef);
    localStorage.setItem("DepartmentFullName", DepFullName);
    localStorage.setItem("DepShortAddress", DepShortAddress);
    localStorage.setItem("RecipientDepartRef", RecipientDepartRef);
    localStorage.setItem("RecipientIndex", RecipientIndex);

    wrapperDepartment.classList.remove("active");
}

function updateNamePM(selectedLi) {
    console.log(selectedLi)
    // const StreetRef = selectedLi.getAttribute("data-ref");
    const PMShortAddress = selectedLi.getAttribute("data-short_address_pm");
    const PMFullName = selectedLi.getAttribute("data-description_pm");
    const RecipientDepartRef = selectedLi.getAttribute("data-recipient_depart_ref");
    const RecipientIndex = selectedLi.getAttribute("data-recipient_index");
    // const streetShortName = selectedLi.getAttribute("data-short-name");
    let modifiedText = PMShortAddress.replace(/\s*\([^)]*\)/, '');
    InpPM.value = modifiedText;
    InpDep.value = ""
    searchInpStreet.value = ""
    localStorage.removeItem("DepartmentFullName")
    localStorage.removeItem("DepShortAddress")
    localStorage.removeItem("RecipientDepartRef")
    localStorage.removeItem("StreetFullName")
    // searchInpStreet.setAttribute("data-street", streetShortName);
    // searchInpStreet.setAttribute("data-ref", StreetRef);
    InpPM.setAttribute("data-pm_fullname", PMFullName);

    // localStorage.setItem("streetShortName", streetShortName);
    // localStorage.setItem("StreetRef", StreetRef);
    localStorage.setItem("PMFullName", PMFullName);
    localStorage.setItem("PMShortAddress", modifiedText)
    localStorage.setItem("RecipientDepartRef", RecipientDepartRef)
    localStorage.setItem("RecipientIndex", RecipientIndex);

    wrapperPM.classList.remove("active");
}

function checkedCityDeliveryPermission(){
    const selectedCity = localStorage.getItem("selectedCity");
    let deliveryInf = document.querySelector('.delivery_inf.Courier');
    // let dataCity = searchInp.getAttribute('data-city')
    if (selectedCity === "Львів" || selectedCity === "Львів"){
        CheckboxCourier.style.display = "flex";
        CheckboxCourier.style.height = "fit-content";
        // deliveryInf.style.display = "flex";
        // deliveryInf.style.height = "fit-content";
    } else {
        CheckboxCourier.style.display = "none";
        CheckboxCourier.style.height = 0;
        deliveryInf.style.display = "none";
        deliveryInf.style.height = 0;
    }
}

checkedCityDeliveryPermission()

// =====================================================================


function initializePageFromLocalStorage() {
    const selectedCity = localStorage.getItem("selectedCity");
    const selectedCityRef = localStorage.getItem("selectedCityRef");
    const StreetFullName = localStorage.getItem("StreetFullName");
    const ContInfoStep = localStorage.getItem("close_step_first")
    // const DelInfoStep = localStorage.getItem("open_step_two")
    const TruckStepTwo = localStorage.getItem("truck_step_two")

    const dataDel = localStorage.getItem("dataDel")
    const DepFullName = localStorage.getItem("DepartmentFullName")
    const DepShortAddress = localStorage.getItem("DepShortAddress")

    const PMFullName = localStorage.getItem("PMFullName");
    const PMShortAddress = localStorage.getItem("PMShortAddress");

    const homeInputValue = localStorage.getItem("homeInfo")
    const apartmentInputValue = localStorage.getItem("apartment")
    const StepThree = localStorage.getItem("step_three")
    const NInput = localStorage.getItem("name")
    const SInput = localStorage.getItem("surname")
    const EmInput = localStorage.getItem("email")
    const PhInput = localStorage.getItem("phone")
    let nameInput = document.querySelector('.checkout_input[name="first_name"]');
    let surnameInput = document.querySelector('.checkout_input[name="last_name"]');
    let emailInput = document.querySelector('.checkout_input[name="email"]');
    let phoneInput = document.querySelector('.checkout_input[name="phone_number"]');
    let apartmentValue = document.querySelector('input[name="apartment"]');
    let homeInput = document.querySelector('input[name="home"]');
    let upon_rec_btn = document.querySelector(".upon_rec_btn ");
    let cardpay_btn = document.querySelector(".cardpay_btn");
    const storedPaymentMethod = localStorage.getItem('selectedPaymentMethod');

    const Step = localStorage.getItem("Step");

    let delivery_cost_el = document.querySelector(".delivery_cost");
    let full_amount = document.querySelector(".full_amount");
    let del_price = document.querySelectorAll(".del_price");
    let total_price = localStorage.getItem("total_price")
    let delivery_cost = localStorage.getItem("delivery_cost")

    if (total_price && delivery_cost) {
        delivery_cost_el.innerHTML = delivery_cost + ' <span>₴</span>';
        full_amount.innerHTML = total_price + ' <span>₴</span>';
        del_price[1].innerHTML = delivery_cost + ' <span>₴</span>';
        del_price[1].style.color = "#414141";
        del_price[2].innerHTML = delivery_cost + ' <span>₴</span>';''
        del_price[2].style.color = "#414141";
    }

    let ContUserInfoList = [NInput, SInput, EmInput, PhInput]
    if (ContUserInfoList.every(item => item !== null && item !== "")) {
        nameInput.value = NInput;
        surnameInput.value = SInput;
        emailInput.value = EmInput;
        phoneInput.value = PhInput;
    }
    console.log("hello1")
    // Отримайте елемент <input> для міста та встановіть значення
    const searchInp = document.querySelector(".inp_selector_search_city");
    if (searchInp) {
        searchInp.value = selectedCity;
        searchInp.setAttribute("data-city", selectedCity);
    }
    // Отримайте елемент <input> для вулиці та встановіть значення
    const searchInpStreet = document.querySelector(".inp_selector_search_street");
    if (searchInpStreet) {
        searchInpStreet.value = StreetFullName;
        searchInpStreet.setAttribute("data-street", StreetFullName);
    }
    if (Step === "Delivery") {
        console.log("DelInfoStep === true")

        ContInfo.classList.add("close_step_first")
        DelInfo.classList.add("open_step_two")

        Delivery.classList.remove("delivery_hide")
        Delivery.classList.add("delivery_visible")

        ContInfo.classList.remove("cont_info_visible")
        ContInfo.classList.add("cont_info_hide")

        Payment.classList.remove("payment_visible")
        Payment.classList.add("payment_hide")

        truck.classList.add("truck_step_two")

    }
    if (TruckStepTwo === "true"){
        console.log("TruckStepTwo === true")
        truck.classList.add("truck_step_two")
    }
    if (TruckStepTwo === "false"){
        truck.classList.remove("truck_step_two")
    }
    if (DepFullName) {
        InpDep.value = DepShortAddress;
        InpDep.setAttribute("data-dep_fullname", DepFullName)
    }
    if (PMShortAddress) {
        InpPM.value = PMShortAddress
    }
    if (apartmentValue && homeInput) {
        apartmentValue.value = apartmentInputValue
        homeInput.value = homeInputValue
    }
    if (Step === "Payment") {
        console.log("Step === Payment")
        truck.classList.remove("truck_step_two")
        truck.classList.remove("truck_step_one")
        ContInfo.classList.add("close_step_first")
        DelInfo.classList.remove("open_step_two")
        DelInfo.classList.add("close_step_two")

        Delivery.classList.add("delivery_hide")
        Delivery.classList.remove("delivery_visible")

        ContInfo.classList.remove("cont_info_visible")
        ContInfo.classList.add("cont_info_hide")

        Payment.classList.remove("payment_hide")
        Payment.classList.add("payment_visible")

        PaymentInfo.classList.add("open_step_three")
        truck.classList.add("truck_step_three")
        let matchingCheckbox = document.querySelector(`[data-payment="${storedPaymentMethod}"]`);
        updatePaymentButtons(matchingCheckbox)
    }
    // if (storedPaymentMethod) {
    //     const matchingCheckbox = document.querySelector(`[data-payment="${storedPaymentMethod}"]`);
    //     if (matchingCheckbox) {
    //         matchingCheckbox.checked = true;
    //
    //     }
    // }

    thisCheckboxTrue(dataDel)
    sendValueToServerDepartment(selectedCity)
    sendValueToServerPM(selectedCity)

}

initializePageFromLocalStorage();

function thisCheckboxTrue(dataDel){
    let checkbox = document.querySelectorAll(".checkout_input_checkbox");
    checkbox.forEach((check) => {
        if (check.getAttribute("data-delivery") === dataDel) {
            check.checked = true
            ChoiceCheckBox(check)

        } else {
            check.checked = false
        }
    })
}


function updatePaymentButtons(checkbox) {
    const paymentButtonContainer = document.querySelector('.payment_button_container');
    const OrderBtnCont = document.querySelector(".cont_order_btn");
    const isOnStepThree = localStorage.getItem("step_three") === "true";

    paymentButtonContainer.innerHTML = '';
    OrderBtnCont.innerHTML = '';

    const backButton = document.createElement('a');
    backButton.classList.add('contact_delivery_btn_back', 'truck_step_three');
    backButton.setAttribute("onclick", "StepBackTwo()");
    backButton.textContent = 'Назад';
    paymentButtonContainer.appendChild(backButton);

    const selectedPaymentMethod = checkbox.getAttribute('data-payment');
    localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
    if (selectedPaymentMethod === 'Card_on_website' && isOnStepThree) {
        CreatePaymentByCardBtn().then(({ data, signature }) => {
            const formContainer = document.querySelector('.cont_order_btn');
            formContainer.innerHTML = '';

            const form = document.createElement('form');
            form.setAttribute("id", "payment_form");
            form.method = 'POST';
            form.action = 'https://www.liqpay.ua/api/3/checkout';
            form.acceptCharset = 'utf-8';

            const dataInput = document.createElement('input');
            dataInput.setAttribute("id", "liqpay_data");
            dataInput.type = 'hidden';
            dataInput.name = 'data';
            dataInput.value = data;
            form.appendChild(dataInput);

            const signatureInput = document.createElement('input');
            signatureInput.setAttribute("id", "liqpay_signature");
            signatureInput.type = 'hidden';
            signatureInput.name = 'signature';
            signatureInput.value = signature;
            form.appendChild(signatureInput);

            const payOrderButton = document.createElement('button');
            payOrderButton.classList.add('cardpay_btn', 'truck_step_three');
            payOrderButton.setAttribute('onclick', 'SaveOrderInfo()');
            // payOrderButton.setAttribute('type', 'submit');
            payOrderButton.textContent = 'Оплатити замовлення';
            form.appendChild(payOrderButton);

            formContainer.appendChild(form);
        });
        ChangePaymentCheckbox();
    }
    else if (selectedPaymentMethod === 'Upon_Receipt' && isOnStepThree) {
        const confirmOrderButton = document.createElement('a');
        confirmOrderButton.classList.add('upon_rec_btn', 'truck_step_three');
        confirmOrderButton.textContent = 'Підтвердити замовлення';
        OrderBtnCont.appendChild(confirmOrderButton);
        ChangePaymentCheckbox();
    }
    if (selectedPaymentMethod === null) {
        let cardpay_btn = document.querySelector(".cardpay_btn");
        let upon_rec_btn = document.querySelector(".upon_rec_btn");
        if (cardpay_btn && upon_rec_btn) {
            cardpay_btn.disabled = false;
            upon_rec_btn.disabled = false;
        }
    }
}

document.querySelectorAll('.checkout_input_checkbox_payment').forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {
        if (event.target.classList.contains('checkout_input_checkbox_payment')) {
            handleCheckboxClick(event.target);
        }
    });
});

// Переносимо логіку зміни чекбокса в функцію handleCheckboxClick
function handleCheckboxClick(checkbox) {
    const checkboxes = document.querySelectorAll('.checkout_input_checkbox_payment');

    checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
            cb.checked = false;
        }
    });

    updatePaymentButtons(checkbox);
}

function ChangePaymentCheckbox() {
    const checkboxes = document.querySelectorAll('.checkout_input_checkbox_payment');
    const storedPaymentMethod = localStorage.getItem('selectedPaymentMethod');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.getAttribute('data-payment') === storedPaymentMethod;

        // Видаляємо існуючий обробник події перед додаванням нового
        checkbox.removeEventListener('change', handleCheckboxChange);
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

// Визначаємо окрему функцію для обробки події зміни чекбокса
function handleCheckboxChange() {
    ChangePaymentCheckbox();
}

// Початковий виклик ChangePaymentCheckbox
ChangePaymentCheckbox();

function formatPhoneNumber(input) {
  const digitsOnly = input.replace(/\D/g, '');
  const withPrefix = digitsOnly.startsWith('38') ? digitsOnly : '38' + digitsOnly;
  const formattedNumber = '+38' + withPrefix.slice(2); // +380951234567

  return formattedNumber;
}

async function CreatePaymentByCardBtn(){
    let csrfToken = getCsrfToken();
    const URL = "/liqpay/create_payment_by_card_btn/"
    let data = {
        "order": order,
        "name": localStorage.getItem("name"),
        "surname": localStorage.getItem("surname"),
        "email": localStorage.getItem("email"),
        "phone": formatPhoneNumber(localStorage.getItem("phone")),
        "delivery": localStorage.getItem("dataDel"),
        "home": localStorage.getItem("homeInfo"),
        "apartment": localStorage.getItem("apartment"),
        "street": localStorage.getItem("StreetFullName"),
        "department_full_name": localStorage.getItem("DepartmentFullName"),
        "recipient_depart_ref": localStorage.getItem("RecipientDepartRef"),
        "city": localStorage.getItem("CityFullName"),
        "city_ref": localStorage.getItem("selectedCityRef"),
        "total_price": localStorage.getItem("total_price"),
        "total_weight": total_order_weight,
    }

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;

}

function SaveOrderInfo() {
    let csrfToken = getCsrfToken();
    const URL = "/liqpay/create_order_payment_by_card/";
    let LiqPayData = document.getElementById("liqpay_data").value
    let LiqPaySignature = document.getElementById("liqpay_signature").value
    let data = {
        "order": order,
        "name": localStorage.getItem("name"),
        "surname": localStorage.getItem("surname"),
        "email": localStorage.getItem("email"),
        "phone": formatPhoneNumber(localStorage.getItem("phone")),
        "delivery": localStorage.getItem("dataDel"),
        "home": localStorage.getItem("homeInfo"),
        "apartment": localStorage.getItem("apartment"),
        "street": localStorage.getItem("StreetFullName"),
        "department_full_name": localStorage.getItem("DepartmentFullName"),
        "recipient_depart_ref": localStorage.getItem("RecipientDepartRef"),
        "city": localStorage.getItem("CityFullName"),
        "city_ref": localStorage.getItem("selectedCityRef"),
        "total_price": localStorage.getItem("total_price"),
        "total_weight": total_order_weight,
        "data": LiqPayData,
        "signature": LiqPaySignature
    }
    $.ajax({
        type: "POST",
        url: URL,
        headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
        success: function (response) {
            if (response.success === "Successfully") {
                localStorage.setItem("redirect_liqpay", "true");
                let payment_form = document.getElementById("payment_form");
                payment_form.submit()
            }
        },
        error: function (error) {
            console.error("Error saving order information:", error);
        },
    });
}



function CheckedPaymentBtn() {
    let cardpay_btn = document.querySelector(".cardpay_btn");
    let upon_rec_btn = document.querySelector(".upon_rec_btn");
    let Step = localStorage.getItem("Step");
    let step_three = localStorage.getItem("step_three");

    let target_btn = cardpay_btn || upon_rec_btn; // Виберіть ту, яка існує

    if (target_btn) {
        console.log(Step, "Step");

        if ((Step === "Delivery" || Step === "Contact_info") && step_three !== "true") {
            console.log(target_btn)
            target_btn.disabled = true;
            target_btn.style.display = "none";
        }

        if (Step === "Payment" && step_three === "true") {
            target_btn.disabled = false;
            target_btn.style.display = "block";
        }
    }
}

CheckedPaymentBtn();



function StepBackFirst(elem) {
    console.log("Step === Contact info");
    let Step = localStorage.getItem("Step");
    if (Step === "Delivery") {
        truck.classList.remove("truck_step_two");
        truck.classList.remove("start_three_step_two");
        truck.classList.add("truck_step_one");

        Delivery.classList.remove("delivery_visible")
        Delivery.classList.add("delivery_hide")

        ContInfo.classList.remove("cont_info_hide")
        ContInfo.classList.add("cont_info_visible")

        Payment.classList.remove("payment_visible")
        Payment.classList.add("payment_hide")

        ContInfo.classList.remove("close_step_first");
        DelInfo.classList.remove("open_step_two");
        localStorage.setItem("Step", "Contact_info");
    }
}

// StepBackFirst()

function StepBackTwo() {
    let Step = localStorage.getItem("Step");
    console.log("Step === Delivery");
    if (Step === "Payment") {
        truck.classList.remove("truck_step_three");
        truck.classList.remove("truck_step_two");
        truck.classList.add("start_three_step_two");
        DelInfo.classList.add("open_step_two");

        Delivery.classList.remove("delivery_hide")
        Delivery.classList.add("delivery_visible")

        ContInfo.classList.remove("cont_info_visible")
        ContInfo.classList.add("cont_info_hide")

        Payment.classList.remove("payment_visible")
        Payment.classList.add("payment_hide")

        PaymentInfo.classList.remove("open_step_three")
        DelInfo.classList.remove("close_step_two")
        localStorage.removeItem("step_three")
        localStorage.setItem("Step", "Delivery")
        let dataDel = localStorage.getItem("dataDel")
        let PMShortAddress = localStorage.getItem(".PMShortAddress");
        let PMFullName = localStorage.getItem(".PMFullName");
        CheckedPaymentBtn()
        thisCheckboxTrue(dataDel)
        if (PMShortAddress) {
            InpPM.value = PMShortAddress
            InpPM.setAttribute("data-PMFullName", PMFullName)
        }
    } else {

    }
}

function changeCheckBox(checkbox) {
    const checkboxes = document.querySelectorAll('.checkout_input_checkbox');
    // let deliveryInf = document.querySelector('.delivery_inf.Courier');
    checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
        }
        if (otherCheckbox === checkbox){
            let dataDel = otherCheckbox.getAttribute("data-delivery")
            localStorage.setItem("dataDel", dataDel)
        }
    });
}

function ChoiceCheckBox(checkbox) {
    const valueCheckbox = checkbox.getAttribute('data-delivery');
    const deliveryInfC = document.querySelector('.delivery_inf.Courier');
    const deliveryInfHP_B = document.querySelector('.delivery_inf_dep.NP-Branch');
    const deliveryInfHP_PM = document.querySelector('.delivery_inf_pm.NP-Postal-Machine');
    const checkboxes = document.querySelectorAll('.checkout_input_checkbox');

    if (checkbox.checked) {
        deliveryInfC.style.display = valueCheckbox === "Courier" ? "flex" : "none";
        deliveryInfC.style.height = valueCheckbox === "Courier" ? "fit-content" : 0;
        deliveryInfHP_B.style.display = valueCheckbox === "NP-Branch" ? "flex" : "none";
        deliveryInfHP_PM.style.display = valueCheckbox === "NP-Postal-Machine" ? "flex" : "none";

        checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    } else {
        deliveryInfC.style.display = "none";
        deliveryInfHP_B.style.display = "none";
        deliveryInfHP_PM.style.display = "none";
    }
}



