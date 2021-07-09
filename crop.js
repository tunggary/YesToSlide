const send_imageOrVideo = document.getElementById("send_imageOrVideo");
const send_label = document.getElementById("send_label");
const image = document.getElementById("image");
const cropped_data = document.getElementsByClassName("cropped_data");
const button_UI = document.getElementsByClassName("button_UI");

send_imageOrVideo.addEventListener("change", function () {
  const file = send_imageOrVideo.files[0];
  const URL_Selected = URL.createObjectURL(file);
  image.setAttribute("src", URL_Selected);
  if (file.type === "image/jpeg" || file.type === "image/png") {
    init_func();
  } else {
    alert("사진파일을 선택해주세요");
    location.reload();
  }
});

function init_func() {
  cropper = new Cropper(image, {
    viewMode: 2,
    dragMode: "none",
    aspectRatio: 16 / 9,
    center: false,
    highlight: false,
    background: false,
    autoCropArea: 1,
  });
  button_UI[0].style.display = "block";
}

const destroy = document.getElementById("destroy");
destroy.addEventListener("click", () => {
  cropper.destroy();
  cropper = null;
  image.setAttribute("src", " ");
  cropped_data[0].setAttribute("src", " ");
  button_UI[0].style.display = "none";
});

const crop = document.getElementById("crop");
crop.addEventListener("click", () => {
  const html = cropper.getCroppedCanvas().toDataURL("image/jpeg");
  cropped_data[0].setAttribute("src", html);
});

const left_rotate = document.getElementById("left_rotate");
left_rotate.addEventListener("click", () => {
  cropper.rotate(-90);
});

const right_rotate = document.getElementById("right_rotate");
right_rotate.addEventListener("click", () => {
  cropper.rotate(90);
});
