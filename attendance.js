const att_bottom = document.getElementsByClassName("att_bottom");
const label = document.getElementsByClassName("label");
const participants_list = document.getElementsByClassName("participants_list");
const toggleText = document.querySelector(".label span");
const toggleImg = document.querySelector(".label img");

label[0].addEventListener("click", function () {
  att_bottom[0].classList.toggle("active");
  if (toggleText.innerHTML === "접기") {
    toggleText.innerHTML = "자세히보기";
    toggleImg.setAttribute("src", "./img/dropdown_button.png");
  } else {
    toggleText.innerHTML = "접기";
    toggleImg.setAttribute("src", "./img/dropUp_button.png");
  }
});

for (let i = 0; i < participants_list.length; i++) {
  participants_list[i].addEventListener("click", () => {
    checkRadio();
    participants_list[i].classList.toggle("active");
  });
}
function checkRadio() {
  for (let i = 0; i < participants_list.length; i++) {
    if (participants_list[i].className == "participants_list active") {
      participants_list[i].classList.remove("active");
    }
  }
}
