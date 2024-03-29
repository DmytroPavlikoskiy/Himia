let seconds = document.getElementById("seconds");
   let ss = document.getElementById("ss");
   let modal_timer_wrapper = document.getElementById("modal");

   const idleTime = 10 * 1000; // Якщо клієнт неактивний 10 секунд Запускається таймер StartClientInactiveTimer()

   let modalVisible = false;
   let userActive = false;
   let confirmed = false;
   let modalTimer;
   let countdown;

   function StartClientInactiveTimer() {
       let timeLeft = (5 * 60 + 1); // 600 секунд неактивності користувача, після чого вилазить модальне вікно
       countdown = setInterval(function () {
           timeLeft--;

           // Якщо користувач став активним, скидаємо таймер і виходимо
           if (userActive) {
               clearInterval(countdown);
               userActive = false;
               return;
           }
           //Час вичерпано! Виконання дій.
           if (timeLeft <= 0) {
               clearInterval(countdown);
               showModal();
           }
       }, 1000);
   }

   function ClickConfirmationBtn(){
       clearInterval(countdown);
       hideModal()
   }


   function removeReservedProduct() {
       let csrfToken = getCsrfToken();
       const URL = "/basket/remove_reserved_products/"
       let data = {
            order_id: order
       }
       console.log(data)
       $.ajax({
            type: "POST",
            url: URL,
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
            success: function (response) {
               if (response.success === "success") {
                   console.log("success")
                   localStorage.removeItem("NextURL");
                   setTimeout(()=>{
                       ClearCheckoutLocalStorage()
                       window.location.replace(homeUrl);
                   }, 500)

               }
               if (response.error === "Order does not exist") {

                }
            },
            error: function (response) {

            },
        });
   }


   function showModal() {
           modal_timer_wrapper.classList.add("show");
           modalVisible = true;
           let TimerSeconds = 16; // Задаємо початкове значення таймера
           seconds.textContent = TimerSeconds;

           modalTimer = setInterval(function () {
               TimerSeconds--;
               seconds.textContent = TimerSeconds;
               let strokeOffset = 73.33 - (73.33 * TimerSeconds) / 16;
               ss.style.strokeDashoffset = strokeOffset;
               // Якщо час закінчився
               if (TimerSeconds === 0) {
                   userActive = false;
                   modal_timer_wrapper.classList.remove("show");
                   removeReservedProduct()
               }
           }, 1000); // Оновлюємо таймер кожну секунду
   }

   function hideModal() {
       clearInterval(modalTimer);
       modal_timer_wrapper.classList.remove("show");
       modalVisible = false;
       confirmed = false;
       userActive = false;
       clearInterval(countdown);
   }

   $(document).idle({
       onIdle: function () {
           StartClientInactiveTimer()
       },
       onActive: function () {
           userActive = true;
       },
       idle: idleTime
   });