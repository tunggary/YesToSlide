//참가자 선택기능
const file_list = document.getElementsByClassName("file_list");
for (let i = 0; i < file_list.length; i++) {
  file_list[i].addEventListener("click", () => {
    checkRadio();
    file_list[i].classList.toggle("active");
  });
}
function checkRadio() {
  for (let i = 0; i < file_list.length; i++) {
    if (file_list[i].className == "file_list active") {
      file_list[i].classList.remove("active");
    }
  }
}

// 참가자방출버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const file_delete_btn = document.getElementsByClassName("file_delete_btn");
const dark_background = document.getElementsByClassName("dark_background");
for (let i = 0; i < file_delete_btn.length; i++) {
  file_delete_btn[i].addEventListener("click", () => {
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

function scroll_func() {
  const file_list = document.getElementsByClassName("file_list");
  const content = document.getElementsByClassName("content");
  if (file_list.length >= 14) {
    content[0].style.overflowY = "scroll";
  } else {
    content[0].style.overflowY = "hidden";
  }
}
scroll_func();
