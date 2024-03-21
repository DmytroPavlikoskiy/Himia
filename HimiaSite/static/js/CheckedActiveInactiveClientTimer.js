let timer; // змінна для таймера
let secondsLeft = 300; // початкова кількість секунд для таймера (5 хвилин)
let modalTimer; // змінна для таймера у модальному вікні
let modalSecondsLeft = 15; // початкова кількість секунд для таймера у модальному вікні

// Показати модальне вікно з таймером
function showModal() {
  let modalChoiceTimer = document.getElementById("myModal")
  modalChoiceTimer.classList.add("visible_modal_timer");
  updateModalTimerDisplay();
}

// Сховати модальне вікно
function hideModal() {
  let modalChoiceTimer = document.getElementById("myModal")
  modalChoiceTimer.classList.remove("visible_modal_timer");
  clearInterval(modalTimer);
  modalSecondsLeft = 15;
  updateModalTimerDisplay();
}

// Оновлення відображення таймера у модальному вікні
function updateModalTimerDisplay() {
  let modalTimerSeconds = document.getElementById("timer-seconds");
  modalTimerSeconds.textContent = modalSecondsLeft;

  let modalTimerCircle = document.getElementById("timer-circle");
  let modalPercentLeft = (modalSecondsLeft / 15) * 100;
  modalTimerCircle.style.backgroundImage = `conic-gradient(#FFFFFF ${modalPercentLeft}%, transparent ${modalPercentLeft}%)`;
}

// Функція для запуску таймера
function startTimer() {
  timer = setInterval(function() {
    secondsLeft--;

    if (secondsLeft <= 0) {
      clearInterval(timer);
      showModal();
      startModalTimer();
    }
  }, 1000);
}

// Функція для запуску таймера у модальному вікні
function startModalTimer() {
  modalTimer = setInterval(function() {
    modalSecondsLeft--;
    updateModalTimerDisplay();

    if (modalSecondsLeft <= 0) {
      clearInterval(modalTimer);
      console.log("HELLO") // Перенаправлення на іншу сторінку
    }
  }, 1000);
}

// При кліку на кнопку "Так" у модальному вікні
document.getElementById("modal-yesBtn").addEventListener("click", function() {
  hideModal();
  startTimer();
});

// Скидання таймера при активності користувача
function resetTimer() {
  clearInterval(timer);
  clearInterval(modalTimer);
  secondsLeft = 300;
  modalSecondsLeft = 15;
  updateModalTimerDisplay();
  startTimer();
}

// Додаємо прослуховувачів подій для скидання таймера при активності користувача
document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);
document.addEventListener("scroll", resetTimer);

// Запускаємо таймер при завантаженні сторінки
window.addEventListener("load", function() {
  startTimer();
});

// При неактивності користувача відновлюємо таймер
ifvisible.on("idle", function(){
  resetTimer();
});

// При активності користувача зупиняємо таймер
ifvisible.on("wakeup", function(){
  resetTimer();
});

// При закритті модального вікна також скидаємо таймер
document.getElementById("myModal").addEventListener("hidden.bs.modal", function () {
  resetTimer();
});