let showPic = document.querySelector(".showPic");
let upload_box = document.querySelector(".upload_box");
let result = document.querySelector(".result");
let upload_message = document.querySelector("#upload_message");
let upload_UI_veil = document.querySelector(".upload_UI_veil");
let cropper = null;
function load_image(input) {
  var newImage = document.createElement("img");
  newImage.setAttribute("id", "newPic");
  var file = input.files[0];
  newImage.src = URL.createObjectURL(file);
  showPic.appendChild(newImage);

  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.style.objectFit = "contain";
  upload_box.classList.toggle("d-none");
  showPic.classList.toggle("d-none");
  upload_UI_veil.classList.toggle("d-none");
  edit_image();
}

function edit_image() {
  const image = document.getElementById("newPic");
  cropper = new Cropper(image, {
    viewMode: 0,
    dragMode: "move",
    aspectRatio: 16 / 9,
    center: false,
    highlight: false,
    background: false,
    autoCropArea: 1,
  });
}

function rotateLeft() {
  cropper.rotate(-90);
}

function rotateRight() {
  cropper.rotate(90);
}

let newCanvas = null;
let viewing = false;
function get_image() {
  if (!viewing) {
    viewing = true;

    newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "newCanvas");

    newCanvas = cropper.getCroppedCanvas({
      width: 315,
      height: 177,
    });

    showPic.classList.toggle("d-none");
    result.classList.toggle("d-none");
    result.innerHTML = "";
    result.appendChild(newCanvas);
  }
}

function undo() {
  if (viewing) {
    viewing = false;
    showPic.classList.toggle("d-none");
    result.classList.toggle("d-none");
  }
}

function close_modal() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  viewing = false;

  upload_message.value = null;

  if (upload_box.classList.contains("d-none")) {
    upload_box.classList.remove("d-none");
  }
  showPic.innerHTML = "";
  if (!showPic.classList.contains("d-none")) {
    showPic.classList.add("d-none");
  }
  result.innerHTML = "";
  if (!result.classList.contains("d-none")) {
    result.classList.add("d-none");
  }
}

function sending() {
  const msg = upload_message.value.trim();
  if (msg == null || msg == "") {
    alert("메시지를 입력하세요");
    return;
  }
  if (newCanvas == null) {
    alert("영역을 선택하세요");
    return;
  }
}
