var att_bottom = document.getElementsByClassName("att_bottom");
var label = document.getElementsByClassName("label");
var participants_list = null;
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
function participant_toggle_event(e)
{
 
  participants_list = document.getElementsByClassName("participants_list");
  var i = e.currentTarget.myParam;
  console.log(i);
  checkRadio();
  participants_list[i].classList.toggle("active");
}
function add_click_listener_to_attendances() {

  participants_list = document.getElementsByClassName("participants_list");
  
  for (let i = 0; i < participants_list.length; i++) {


    try{
      participants_list[i].removeEventListener('click', participant_toggle_event);
    }
    catch(err)
    {
      console.log(err.message);
  
    }

    participants_list[i].addEventListener("click",participant_toggle_event,false);
    participants_list[i].myParam = i;

    
    /*
    participants_list[i].addEventListener("click", () => {
      checkRadio();
      participants_list[i].classList.toggle("active");
    });
    */
    
  }

}

function checkRadio() {
  for (let i = 0; i < participants_list.length; i++) {
    if (participants_list[i].className == "participants_list active") {
      participants_list[i].classList.remove("active");
    }
  }
}

// 참가자방출버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var participants_delete_btn = null;
var dark_background = null;
function prepare_open_expel_modal() {
  participants_delete_btn = document.getElementsByClassName("participants_delete_btn");
  dark_background = document.getElementsByClassName("dark_background");
  for (let i = 0; i < participants_delete_btn.length; i++) {
    participants_delete_btn[i].addEventListener("click", () => {
      dark_background[0].style.display = "block";
      par_back_img[0].style.display = "block";
    });
  }
}

// 삭제,취소버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
var delete_btn = null;
var negative_btn = null;
var par_back_img = null;
function prepare_cancel_expel_modal() {
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

function add_attendance(each) {
  //console.log(each);

  var cnt = document.getElementById("attendanceUl").childElementCount;
  cnt++;
  var template =
    `<li class="participants_list">
    <div class="profile_img">
      <img src="`+each["imageUrl"]+`">
    </div>
    <div class="profile_info">
      <div class="participants_name">` +
    each["name"] +
    `</div>
      <div class="participants_email">` +
    each["email"] +
    `</div>
    </div>
    <div class="participants_delete_btn">
      <img src="./img/close_white_24dp.png">
    </div>
  </li>`;

  $("#attendanceUl").append(template);
}

function do_after_adding_all_attendances() {
  add_click_listener_to_attendances();
  prepare_open_expel_modal();
  prepare_cancel_expel_modal();
}

function clear() {
  document.getElementById("attendanceUl").innerHTML = "";
}

//controller에서 사이즈 변경시 마다 adjust_size를 호출 합니다.
let tri = null;
let att_top = null;
let att_container = null;
let content = null;
function adjust_size(height) {
  tri = document.getElementsByClassName("tri");
  att_top = document.getElementsByClassName("att_top");
  att_container = document.getElementsByClassName("att_container");
  content = document.getElementsByClassName("content");
  label = document.getElementsByClassName("label");
  att_bottom = document.getElementsByClassName("att_bottom");

  att_top[0].style.display = "none";
  tri[0].style.display = "none";
  att_container[0].style.borderRadius = "0px";
  att_container[0].style.paddingTop = "0px";
  att_bottom[0].classList.toggle("active");
  label[0].style.display = "none";

  let screen_height = height - 199; //iframe 외부에 브라우저 높이 - 상단바,하단바 높이
  content[0].style.height = `${screen_height - 56}px`; // .content 기존높이 780px
}

window.onload = function(){
  var old_version = document.getElementById('version').innerHTML;
  check_version_v3("../../js/version_v3.txt",old_version,"attendance",function(rst){
    if(rst =="ignore")
      console.log(" attendance 버전 업그레이드 해주세요");
    else if(rst=="fail")
    {
      location.reload();
    }  
  });
}