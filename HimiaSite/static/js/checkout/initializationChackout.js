
function InitializationStepTwo() {
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


function InitializationStepThree() {
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
    } else {
        localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod)
        updatePaymentButtons(checkboxTrue)
    }
    localStorage.setItem("Step", "Payment");
}