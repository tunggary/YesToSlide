//참가자 선택기능
var file_list = null;
function add_click_listener_to_presentatin_list() {
  file_list = document.getElementsByClassName("file_list");
  for (let i = 0; i < file_list.length; i++) {
    file_list[i].addEventListener("click", () => {
      checkRadio();
      file_list[i].classList.toggle("active");
    });
  }
}

function checkRadio() {
  for (let i = 0; i < file_list.length; i++) {
    if (file_list[i].className == "file_list active") {
      file_list[i].classList.remove("active");
    }
  }
}

// 참가자방출버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
function prepare_open_delete_modal() {
  file_delete_btn = document.getElementsByClassName("file_delete_btn");
  dark_background = document.getElementsByClassName("dark_background");
  for (let i = 0; i < file_delete_btn.length; i++) {
    file_delete_btn[i].addEventListener("click", () => {
      dark_background[0].style.display = "block";
      par_back_img[0].style.display = "block";
    });
  }
}

// 삭제,취소버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
var delete_btn = null;
var negative_btn = null;
var par_back_img = null;
function prepare_cancel_delete_modal() {
  delete_btn = document.getElementsByClassName("delete_btn");
  negative_btn = document.getElementsByClassName("negative_btn");
  par_back_img = document.getElementsByClassName("par_back_img");
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
}

function prepare_set_scroll() {
  const file_list = document.getElementsByClassName("file_list");
  const content = document.getElementsByClassName("content");
  console.log(file_list.length);
  if (file_list.length >= 14) {
    content[0].style.overflowY = "scroll";
  } else {
    content[0].style.overflowY = "hidden";
  }
}

function load_previous_presentain(present_name) {
  var r = confirm("열까요?");
  if (r == false) {
    return;
  } else {
    if (!parent.parent.sunny.is_controller()) {
      parent.document.getElementById("image_content").src = "";
      parent.handleBasicToolsClick("button_openfile");
    }
    parent.parent.sunny.open_presentation_from_history(present_name);
  }
}
function add_each_file(each) {
  console.log(each);
  var cnt = document.getElementById("fileUl").childElementCount;
  cnt++;
  var template =
    `<li class="file_list">
  <div class="file_num">` +
    parent.parent.sunny.padLeadingZeros(cnt, 2) +
    `</div>
  <div class="file_img">
    <img src="./img/icon_google_slide.png" width="25" height="34">
  </div>
  <div class="file_info" style="cursor:pointer" onclick="load_previous_presentain('` +
    each["title"] +
    `')">
    <div class="file_name">` +
    each["title"] +
    `</div>
    <div class="file_date">` +
    each["create_date"] +
    `</div>
  </div>
  <div class="file_delete_btn">
    <img src="./img/close_white_24dp.png" width="20" height="20">
  </div>
  </li>`;

  $("#fileUl").append(template);
  prepare_set_scroll();
}

function do_after_adding_all_files() {
  add_click_listener_to_presentatin_list();
  prepare_open_delete_modal();
  prepare_cancel_delete_modal();
  prepare_set_scroll();
}
//controller에서 사이즈 변경시 마다 adjust_size를 호출 합니다.
let tri = null;
let file_container = null;
let content = null;
function adjust_size(height) {
  console.log(height);
  tri = document.getElementsByClassName("tri")[0];
  file_container = document.getElementsByClassName("file_container")[0];
  content = document.getElementsByClassName("content")[0];

  tri.style.display = "none"; //모바일이면 imageTab 맨위에 삼각형(화살표) 필요없음
  file_container.style.borderRadius = "0"; // 모바일이면 borderRadius 필요없음

  let screen_height = height - 199; //iframe 외부에 브라우저 높이 - 상단바,하단바 높이
  let gap = 823 - screen_height;
  file_container.style.height = `${screen_height}px`; // .file_container 기존높이 823px
  content.style.height = `${780 - gap}px`; // .content 기존높이 780px
}

window.onload = function () {
  var old_version = document.getElementById("version").innerHTML;
  check_version_v3("../../js/version_v3.txt", old_version, "file", function (rst) {
    if (rst == "ignore") console.log(" file 버전 업그레이드 해주세요");
    else if (rst == "fail") {
      location.reload();
    }
  });
};
