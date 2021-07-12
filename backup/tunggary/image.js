//사진 선택하면 주황색 테두리 띄우기
var image_list =null;
var image_scroll_veil = null;
function prepare_show_outline()
{

  image_list = document.getElementsByClassName("image_list");
  image_scroll_veil = document.getElementsByClassName("image_scroll_veil");
  for (let i = 0; i < image_scroll_veil.length; i++) {
    image_scroll_veil[i].addEventListener("click", () => {
      checkRadio();
      image_list[i].classList.toggle("active");
      console.log(image_list[i]);

      parent.sunny.find_comment_from_spreadsheet_using_google_slideID(image_list[i].id,function(info){
        if(info.length==0)
        {
           alert("no info for this picture");
           return;
        }
        console.log(info[0]);
        parent.sunny.update_main_slide_image(image_list[i].id, info[0],"imageVideoId","chat_box_name","chat_box_comment");
      });
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

var dark_background= null;
var all_delete_btn= null;
var all_delete_modal= null;
function prepare_open_delete_all_modal()
{
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
function prepare_open_delete_modal()
{
  image_delete_btn = document.getElementsByClassName("image_delete_btn");
  image_delete_modal = document.getElementById("image_delete_modal");
  for (let i = 0; i < image_delete_btn.length; i++) {
    image_delete_btn[i].addEventListener("click", () => {
      image_delete_modal.style.display = "block";
      dark_background[0].style.display = "block";
    });
  }
}


// 삭제,취소버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
var delete_btn = null;
var negative_btn = null;
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

function do_after_adding_all_images()
{
  prepare_show_outline();
  prepare_open_delete_all_modal();
  prepare_open_delete_modal();
  prepare_cancel_delete_modal();

}