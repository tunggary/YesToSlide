const att_bottom = document.getElementsByClassName("att_bottom");
const label = document.getElementsByClassName("label");
const participants_list = document.getElementsByClassName("participants_list");
const toggleText = document.querySelector(".label span");
const toggleImg = document.querySelector(".label img");

//자세히보기 & 접기 토글기능
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

//참가자 선택기능
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

// 참가자방출버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const participants_delete_btn = document.getElementsByClassName("participants_delete_btn");
const dark_background = document.getElementsByClassName("dark_background");
for (let i = 0; i < participants_delete_btn.length; i++) {
  participants_delete_btn[i].addEventListener("click", () => {
    dark_background[0].style.display = "block";
    par_back_img[0].style.display = "block";
  });
}

// 삭제,취소버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
const delete_btn = document.getElementsByClassName("delete_btn");
const negative_btn = document.getElementsByClassName("negative_btn");
const par_back_img = document.getElementsByClassName("par_back_img");
for (let i = 0; i < delete_btn.length; i++) {
  delete_btn[i].addEventListener("click", () => {
    par_back_img[i].style.display = "none";
    dark_background[0].style.display = "none";
  });
  negative_btn[i].addEventListener("click", () => {
    par_back_img[i].style.display = "none";
    dark_background[0].style.display = "none";
  });
}
