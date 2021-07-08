const send_imageOrVideo = document.getElementById("send_imageOrVideo");
const send_label = document.getElementById("send_label");

const image = document.getElementById("image");
let count_ = 0;

send_imageOrVideo.addEventListener("change", function () {
  if (count_ > 0) {
    location.reload();
  }
  count_ += count_ + 1;

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
  const cropper = new Cropper(image, {
    aspectRatio: 16 / 9,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
  });
}
