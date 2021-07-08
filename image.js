//사진 선택하면 주황색 테두리 띄우기
const image_list = document.getElementsByClassName("image_list");
const image_scroll_veil = document.getElementsByClassName("image_scroll_veil");
for (let i = 0; i < image_scroll_veil.length; i++) {
  image_scroll_veil[i].addEventListener("click", () => {
    checkRadio();
    image_list[i].classList.toggle("active");
  });
}
function checkRadio() {
  for (let i = 0; i < image_scroll_veil.length; i++) {
    if (image_list[i].className == "image_list active") {
      image_list[i].classList.remove("active");
    }
  }
}

// 모두삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const dark_background = document.getElementsByClassName("dark_background");
const all_delete_btn = document.getElementById("all_delete_btn");
const all_delete_modal = document.getElementById("all_delete_modal");
all_delete_btn.addEventListener("click", () => {
  all_delete_modal.style.display = "block";
  dark_background[0].style.display = "block";
});

// 사진삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const image_delete_btn = document.getElementsByClassName("image_delete_btn");
const image_delete_modal = document.getElementById("image_delete_modal");
for (let i = 0; i < image_delete_btn.length; i++) {
  image_delete_btn[i].addEventListener("click", () => {
    image_delete_modal.style.display = "block";
    dark_background[0].style.display = "block";
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

//image,video 업로드
const send_imageOrVideo = document.getElementById("send_imageOrVideo");
const player = document.getElementsByClassName("player");

send_imageOrVideo.addEventListener("change", function () {
  const file = send_imageOrVideo.files[0];
  console.log(file.type);
  if (
    file.type === "video/mp4" ||
    file.type === "video/avi" ||
    file.type === "video/x-ms-wmv" ||
    file.type === "video/x-matroska" ||
    file.type === "video/quicktime" ||
    file.type === "video/mpeg"
  ) {
    const videourl = URL.createObjectURL(file);
    player[0].innerHTML = `<video id="videoPlay" width="800" height="450" controls>
      <source type="video/mp4" src="" type="video/mp4" />
      <source src="${videourl}" type="video/ogg" id="vvvv">
      </video>`;
  }

  if (file.type === "image/jpeg" || file.type === "image/png") {
    const imageURL = URL.createObjectURL(file);
    player[0].innerHTML = `<img src="${imageURL}" width="800" height="450">`;
  }
});
