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
      divMessages.style.transform = "translateX(200%)";
    }, 4000);
  }

  if (status === "success") {
    textMessages.innerText = message;
    textMessages.style.color = "#fff"; // Зміна кольору тексту
    divMessages.style.border = "2px solid #00ff00";
    divMessages.style.backgroundColor = "#3f3f3f";
    divMessages.style.transform = "translateX(-5%)";
    setTimeout(function () {
      divMessages.style.transform = "translateX(200%)";
    }, 4000);
  }
}

function MessageClose(){
  let closeMessageIcon = document.getElementById("message_close_btn");
  let divMessages = document.querySelector(".err-suc_message");
  closeMessageIcon.addEventListener("click", () => {
    divMessages.style.transform = "translateX(200%)";
  });
}
MessageClose()