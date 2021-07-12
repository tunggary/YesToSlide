//참가자 선택기능
var file_list = null;
function add_click_listener_to_presentatin_list()
{
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
var file_delete_btn = null;
var dark_background = null;
function prepare_open_delete_modal()
{
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
var delete_btn= null;
var negative_btn  = null;
var par_back_img = null;
function prepare_cancel_delete_modal()
{
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

function add_each_file(each)
{
  var cnt = document.getElementById("fileUl").childElementCount ;
  cnt ++;
  var template = `<li class="file_list">
  <div class="file_num">`+parent.sunny.padLeadingZeros(cnt,2)+`</div>
  <div class="file_img">
    <img src="./img/icon_google_slide.png" width="25" height="34">
  </div>
  <div class="file_info">
    <div class="file_name">`+each["title"]+`</div>
    <div class="file_date">`+each["create_date"]+`</div>
  </div>
  <div class="file_delete_btn">
    <img src="./img/close_white_24dp.png" width="20" height="20">
  </div>
  </li>`;

  $("#fileUl").append(template);
}

function do_after_adding_all_files()
{
  add_click_listener_to_presentatin_list();
  prepare_open_delete_modal();
  prepare_cancel_delete_modal();
    
}