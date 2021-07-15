const send_imageOrVideo = document.getElementById("send_imageOrVideo");
const send_label = document.getElementById("send_label");
const image = document.getElementById("image");
const cropped_data = document.getElementsByClassName("cropped_data");
const button_UI = document.getElementsByClassName("button_UI");
const destroy = document.getElementById("destroy");
const crop = document.getElementById("crop");
const left_rotate = document.getElementById("left_rotate");
const right_rotate = document.getElementById("right_rotate");
let is_working = false;

destroy.addEventListener("click", () => {
  cropper_destroy();
});

send_imageOrVideo.addEventListener("click", () => {
  if (is_working) {
    cropper_destroy();
  }
});

//파일 선택
send_imageOrVideo.addEventListener("change", function () {
  const file = send_imageOrVideo.files[0];
  const URL_Selected = URL.createObjectURL(file);

  //선택된 파일 img파일인지 확인, 아니면 경고창 뜨면서 화면 reload
  if (file.type === "image/jpeg" || file.type === "image/png") {
    //선택된 파일 입력, cropper 만들기
    image.setAttribute("src", URL_Selected);
    cropper_start();
  } else {
    alert("사진파일을 선택해주세요");
    location.reload();
  }
});

//cropper 만들기
function cropper_start() {
  //작업중 true
  is_working = true;

  //cropper 만들기
  cropper = new Cropper(image, {
    viewMode: 2,
    dragMode: "none",
    aspectRatio: 16 / 9,
    center: false,
    highlight: false,
    background: false,
    autoCropArea: 1,
  });

  //buttonUI 보이기
  button_UI[0].style.display = "block";
}

//cropper삭제
function cropper_destroy() {
  //cropper삭제
  cropper.destroy();
  cropper = null;

  //loading된 img, cropping된 img삭제
  image.setAttribute("src", " ");
  cropped_data[0].setAttribute("src", " ");

  //buttonUI 숨기기, 작업중 false
  button_UI[0].style.display = "none";
  is_working = false;
}

//crop 버튼 누르면 crop된 사진 보이기
crop.addEventListener("click", () => {
  const html = cropper.getCroppedCanvas().toDataURL("image/jpeg");
  cropped_data[0].setAttribute("src", html);
});

//image 왼쪽으로 회전
left_rotate.addEventListener("click", () => {
  cropper.rotate(-90);
});

//image 오른쪽으로 회전
right_rotate.addEventListener("click", () => {
  cropper.rotate(90);
});
