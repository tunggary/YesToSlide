let showPic = document.querySelector(".showPic");
let upload_box = document.querySelector(".upload_box");
let result = document.querySelector(".result");
let cropped_image = document.querySelector(".cropped_image");
let upload_message = document.querySelector("#upload_message");
let upload_UI_veil = document.querySelector(".upload_UI_veil");
let toggle_grid_btn = document.getElementById("toggle_grid_btn");
let cropper = null;
let file;

function load_image(input) {
  var newImage = document.createElement("img");
  newImage.setAttribute("id", "newPic");
  file = input.files[0];
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
  if (gridding && !viewing) {
    cropper.rotate(-90);
  }
}

function rotateRight() {
  if (gridding && !viewing) {
    cropper.rotate(90);
  }
}

let newCanvas = null;
let viewing = false;
function get_image() {
  if (!viewing & gridding) {
    viewing = true;

    newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "newCanvas");

    newCanvas = cropper.getCroppedCanvas({
      width: 315,
      height: 177,
    });

    showPic.classList.toggle("d-none");
    cropped_image.classList.toggle("d-none");
    result.innerHTML = "";
    result.appendChild(newCanvas);
  }
}

function undo() {
  if (viewing && gridding) {
    viewing = false;
    showPic.classList.toggle("d-none");
    cropped_image.classList.toggle("d-none");
  }
  if (!viewing && !gridding) {
    toggle_grid_btn.setAttribute("src", "./img/toggle_grid_on.png");
    toggle_grid_btn.setAttribute("value", "on");
    gridding = true;
    showPic.classList.toggle("d-none");
    cropped_image.classList.toggle("d-none");
  }
}

function close_modal() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  viewing = false;
  gridding = true;
  upload_message.value = null;
  toggle_grid_btn.setAttribute("src", "./img/toggle_grid_on.png");
  toggle_grid_btn.setAttribute("value", "on");

  if (upload_UI_veil.classList.contains("d-none")) {
    upload_UI_veil.classList.remove("d-none");
  }
  if (upload_box.classList.contains("d-none")) {
    upload_box.classList.remove("d-none");
  }
  showPic.innerHTML = "";
  if (!showPic.classList.contains("d-none")) {
    showPic.classList.add("d-none");
  }
  result.innerHTML = "";
  if (!cropped_image.classList.contains("d-none")) {
    cropped_image.classList.add("d-none");
  }
}

function sending() {
  const msg = upload_message.value.trim();
  if (msg == null || msg == "") {
    alert("메시지를 입력하세요");
    return;
  }
  if (!viewing && gridding) {
    alert("영역을 선택하세요");
    return;
  }
}

let gridding = true;
function toggle_grid() {
  if (!viewing) {
    if (toggle_grid_btn.getAttribute("value") === "on") {
      const src_info = document.getElementById("newPic").src;
      var newImage = document.createElement("img");
      newImage.setAttribute("src", src_info);
      newImage.style.width = "100%";
      newImage.style.height = "100%";
      newImage.style.objectFit = "contain";

      result.innerHTML = "";
      result.appendChild(newImage);
      toggle_grid_btn.setAttribute("src", "./img/toggle_grid_off.png");
      toggle_grid_btn.setAttribute("value", "off");
      gridding = false;
    } else {
      toggle_grid_btn.setAttribute("src", "./img/toggle_grid_on.png");
      toggle_grid_btn.setAttribute("value", "on");
      gridding = true;
    }
    showPic.classList.toggle("d-none");
    cropped_image.classList.toggle("d-none");
  }
}