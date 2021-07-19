//사진 선택하면 주황색 테두리 띄우기
var image_list = null;
var image_scroll_veil = null;
function prepare_show_outline() {
  image_list = document.getElementsByClassName("image_list");
  image_scroll_veil = document.getElementsByClassName("image_scroll_veil");
  for (let i = 0; i < image_scroll_veil.length; i++) {
    image_scroll_veil[i].addEventListener("click", () => {
      checkRadio();
      image_list[i].classList.toggle("active");
      // console.log(image_list[i]);

      parent.parent.sunny.find_comment_from_spreadsheet_using_google_slideID(
        image_list[i].id,
        function (info) {
          if (info.length == 0) {
            //alert("no info for this picture");
            parent.parent.sunny.update_main_slide_image(
              image_list[i].id,
              null,
              parent.parent.main_iframe,
              "image_content",
              "chat_boxID",
              "chat_box_name",
              "chat_box_comment",
              "chat_profileID"
            );
            //return;
          } else {
            console.log(info[0]);
            parent.parent.sunny.update_main_slide_image(
              image_list[i].id,
              info[0],
              parent.parent.main_iframe,
              "image_content",
              "chat_boxID",
              "chat_box_name",
              "chat_box_comment",
              "chat_profileID"
            );
          }
        }
      );
    });
  }
}

function checkRadio() {
  for (let i = 0; i < image_scroll_veil.length; i++) {
    if (image_list[i].className == "image_list active") {
      image_list[i].classList.remove("active");
    }
  }
}

// 모두삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var dark_background = null;
var all_delete_btn = null;
var all_delete_modal = null;
function prepare_open_delete_all_modal() {
  dark_background = document.getElementsByClassName("dark_background");
  all_delete_btn = document.getElementById("all_delete_btn");
  all_delete_modal = document.getElementById("all_delete_modal");
  all_delete_btn.addEventListener("click", () => {
    all_delete_modal.style.display = "block";
    dark_background[0].style.display = "block";
  });
}

// 사진삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var image_delete_btn = null;
var image_delete_modal = null;
function prepare_open_delete_modal() {
  image_delete_btn = document.getElementsByClassName("image_delete_btn");
  image_delete_modal = document.getElementById("image_delete_modal");
  for (let i = 0; i < image_delete_btn.length; i++) {
    image_delete_btn[i].addEventListener("click", () => {
      image_delete_modal.style.display = "block";
      dark_background[0].style.display = "block";
    });
  }
}

// 사진 및 동영상 보내기버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var send_imageOrVideo = null;
var send_imageOrVideo_modal = null;
function prepare_open_send_modal() {
  send_imageOrVideo = document.getElementById("send_imageOrVideo");
  send_imageOrVideo_modal = document.getElementById("send_imageOrVideo_modal");
  send_imageOrVideo.addEventListener("click", () => {
    send_imageOrVideo_modal.style.display = "block";
    dark_background[0].style.display = "block";
  });
}

// 삭제,취소,x버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
var delete_btn = null;
var negative_btn = null;
var par_back_img = null;
var close_btn = null;
function prepare_cancel_delete_modal() {
  delete_btn = document.getElementsByClassName("delete_btn");
  negative_btn = document.getElementsByClassName("negative_btn");
  par_back_img = document.getElementsByClassName("par_back_img");
  close_btn = document.getElementById("close_btn");
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
  close_btn.addEventListener("click", () => {
    send_imageOrVideo_modal.style.display = "none";
    dark_background[0].style.display = "none";
  });
}

//scroll bar setting
function prepare_set_scroll() {
  let count = 0;
  for (let i = 0; i < image_list.length; i++) {
    if (image_list[i].style.display === "block") count += 1;
  }
  if (count >= 3) {
    document.getElementsByClassName("list_content")[0].style.overflowY = "scroll";
  } else {
    document.getElementsByClassName("list_content")[0].style.overflowY = "hidden";
  }
}

//all check button
let all_check_btn = document.getElementById("all_check");
let background = document.getElementsByClassName("background");
let selected_check_label = document.getElementsByClassName("selected_check_label");
function prepare_all_check_button() {
  all_check_btn.addEventListener("click", () => {
    all_check();
  });
}
function all_check() {
  ckeck_State();
  if (all_check_btn.checked) {
    //checked된 상태, 모든 버튼 checked
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].checked = true;
    }
  } else {
    //unchecked된 상태, 모든 버튼 unchecked
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].checked = false;
    }
  }
}
function ckeck_State() {
  if (all_check_btn.value === "unchecked") {
    all_check_btn.value = "checked";
  } else if (all_check_btn.value === "checked") {
    all_check_btn.value = "disabled";
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].style.display = "none";
    }
    all_check_btn.setAttribute("disabled", "disabled");
    background[0].style.zIndex = "200";
  } else {
    all_check_btn.value = "unchecked";
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].style.display = "block";
    }
    all_check_btn.removeAttribute("disabled");
    background[0].style.zIndex = "-1";
  }
}

//목록,투표 중 어떤 탭이 선택되었는지 확인 후 드롭다운 옵션 보이기, 선택된 사진만 투표창에 보이기
let nav_link = document.getElementsByClassName("nav-link");
let option_sort = document.getElementById("option_sort");
let option_vote = document.getElementById("option_vote");
function prepare_tab_check() {
  //목록탭이 선택되었을때 option 2가지 보이기
  nav_link[0].addEventListener("click", () => {
    //투표탭에서 나올때 투표진행중인지 확인
    if (voting_state) {
      alert("현재 투표가 진행중입니다. 투표를 종료해 주세요.");
      nav_link[1].click();
    } else {
      option_sort.style.display = "block";
      option_vote.style.display = "none";
      all_check_btn.removeAttribute("disabled"); //all체크 버튼 활성화
      for (let i = 0; i < image_voting_number.length; i++) {
        image_voting_number[i].style.display = "none";
      }
      //전체 목록탭에 보이기
      option_filter.value = "view_all";
      filtering();
    }
  });
  //투표탭이 선택되었을때 option 2가지 보이기
  nav_link[1].addEventListener("click", () => {
    //체크가 안되어 있으면 모달창 띄우기
    if (none_checked()) {
      dark_background[0].style.display = "block";
      document.getElementById("select_image_modal").style.display = "block";
      nav_link[0].click();
    } else {
      option_sort.style.display = "none";
      option_vote.style.display = "block";
      all_check_btn.setAttribute("disabled", "disabled"); //all체크 버튼 비활성화
      // 선택된 사진만 투표창에 보이기
      option_filter.value = "view_select";
      filtering();
    }
  });
}
function none_checked() {
  for (let i = 0; i < selected_check_label.length; i++) {
    if (selected_check_label[i].checked) return false;
  }
  return true;
}

//투표시작, 끝내기
let image_voting_number = document.getElementsByClassName("image_voting_number");
let button_before_voting = document.getElementById("button_before_voting");
let button_after_voting = document.getElementById("button_after_voting");
let voting_state = false;
function voting(parameter) {
  if (!voting_state) {
    //투표시작하기
    voting_state = true;
    for (let i = 0; i < image_voting_number.length; i++) {
      selected_check_label[i].checked
        ? (image_voting_number[i].style.display = "block")
        : (image_voting_number[i].style.display = "none");
    }
    button_before_voting.style.display = "none";
    button_after_voting.style.display = "block";
  } else {
    //투표끝내기
    voting_state = false;
    // for (let i = 0; i < image_voting_number.length; i++) {
    //   image_voting_number[i].style.display = "none";
    // }
    button_before_voting.style.display = "block";
    button_after_voting.style.display = "none";
  }
}

//중복투표 활성화, 비활성화
let button_duplicable_voting = document.getElementById("button_duplicable_voting");
let button_duplicable_voting_active = document.getElementById("button_duplicable_voting_active");
let duplicating_active = false;
function duplicating() {
  if (duplicating_active) {
    duplicating_active = false;
    button_duplicable_voting.style.display = "block";
    button_duplicable_voting_active.style.display = "none";
  } else {
    duplicating_active = true;
    button_duplicable_voting.style.display = "none";
    button_duplicable_voting_active.style.display = "block";
  }
}

//select 옵션
let option_filter = null;
function prepare_option_filter() {
  option_filter = document.getElementById("option_filter");
  option_filter.addEventListener("change", () => {
    filtering();
  });
}
function filtering() {
  if (option_filter.value === "view_video") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (slide_info[i].category !== "video") {
        image_list[i].style.display = "none";
      }
    }
  } else if (option_filter.value === "view_image") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (slide_info[i].category !== "image") {
        image_list[i].style.display = "none";
      }
    }
  } else if (option_filter.value === "view_select") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (!selected_check_label[i].checked) {
        image_list[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
    }
  }
  prepare_set_scroll();
}

function do_after_adding_all_images() {
  prepare_show_outline();
  prepare_open_delete_all_modal();
  prepare_open_delete_modal();
  prepare_cancel_delete_modal();

  //2021-07-12 추가
  prepare_set_scroll();
  prepare_all_check_button();
  prepare_tab_check();
  prepare_open_send_modal();
  prepare_option_filter();
}
do_after_adding_all_images();
