let showPic = document.querySelector(".showPic");
let upload_box = document.querySelector(".upload_box");
let result = document.querySelector(".result");
let cropped_image = document.querySelector(".cropped_image");
let upload_message = document.querySelector("#upload_message");
let upload_UI_veil = document.querySelector(".upload_UI_veil");
let toggle_grid_btn = document.getElementById("toggle_grid_btn");
let cropper = null;
let file;
var original_image_file = null;
function load_image(input) {
  var img = document.createElement("img");
  img.setAttribute("id", "newPic");
  file = input.files[0];
  original_img_file = file;
  img.src = URL.createObjectURL(file);
  showPic.appendChild(img);

  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
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

let rotate_state = 0;
function rotateLeft() {
  if (gridding && !viewing) {
    cropper.rotate(-90);
    rotate_state--;
  }
}

function rotateRight() {
  if (gridding && !viewing) {
    cropper.rotate(90);
    rotate_state++;
  }
}

let newCanvas = null;
let viewing = false;
function get_image() {
  if (!viewing & gridding) {
    viewing = true;

    newCanvas = document.createElement("canvas");
    newCanvas = cropper.getCroppedCanvas({
      width: 314,
      height: 176.5,
    });
    newCanvas.setAttribute("id", "newCanvas");

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

  send_imageOrVideo_modal.style.display = "none";
  dark_background[0].style.display = "none";

  try {
    if (gridding) {
      var thumbnailCanvas = document.getElementById("thumbnail");
      var thumbnailContext = thumbnailCanvas.getContext("2d");

      thumbnailCanvas.width = "343";
      thumbnailCanvas.height = "191";
      thumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

      thumbnailContext.drawImage(newCanvas, 0, 0, 343, 191);
      var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg", 0.7);

      // document.getElementById("thum").appendChild(thumbnailCanvas);
      //enlarge cropped one
      var canvas = document.getElementById("Canvas2");
      var canvasContext = canvas.getContext("2d");
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(newCanvas, 0, 0, canvas.width, canvas.height);

      //parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg,thumbnailData);
      parent.parent.sunny.uploadToGD_base64(
        thumbnailData,
        msg,
        canvas.toDataURL("image/PNG", 1),
        "image"
      );
      /*
      try{
        parent.parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg);
      }
      catch(err)
      {

      }
      */
    } else {
      var thumbnailCanvas = document.getElementById("thumbnail");
      var thumbnailContext = thumbnailCanvas.getContext("2d");

      thumbnailCanvas.width = "1000"; //"343";
      thumbnailCanvas.height = "600"; //"191";
      thumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

      var hRatio = thumbnailCanvas.width / newImage.width;
      var vRatio = thumbnailCanvas.height / newImage.height;
      var ratio = Math.min(hRatio, vRatio);
      var centerShift_x = (thumbnailCanvas.width - newImage.width * ratio) / 2;
      var centerShift_y = (thumbnailCanvas.height - newImage.height * ratio) / 2;
      thumbnailContext.translate(newImage.height, 0);
      thumbnailContext.rotate(90 * (Math.PI / 180));
      // thumbnailContext.translate(-500, -300);

      thumbnailContext.drawImage(
        newImage,
        0,
        0,
        newImage.width,
        newImage.height,
        0,
        0,
        newImage.width * ratio,
        newImage.height * ratio
      );

      var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg", 0.7);

      // parent.parent.sunny.send_orginal_image_v2(
      //   "main_iframe",
      //   original_image_file,
      //   "Canvas1",
      //   "Canvas2",
      //   msg,
      //   function (org_canvas) {
      //     console.log(org_canvas);
      //     var thumbnailCanvas = document.getElementById("thumbnail");
      //     var thumbnailContext = thumbnailCanvas.getContext("2d");

      //     thumbnailCanvas.width = "343";
      //     thumbnailCanvas.height = "191";
      //     thumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

      //     thumbnailContext.drawImage(org_canvas, 0, 0, 343, 191);
      //     var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg", 0.7);

      //     parent.parent.sunny.uploadToGD_base64(
      //       thumbnailData,
      //       msg,
      //       org_canvas.toDataURL("image/PNG", 1),
      //       "image"
      //     );
      //   }
      // );

      /*
      //try{
        parent.parent.document.getElementById("sunny_spinner").classList.remove("d-none");
        {
          parent.parent.sunny.send_orginal_image_v2("",original_image_file,"Canvas1","Canvas2",msg,function(rst){
          });
        
        }
      //}
      //catch(err)
      //{

      //}
      */
    }
  } catch (err) {
    console.log(err);
  }
  close_modal();
}

let gridding = true;
let newImage = null;
function toggle_grid() {
  if (!viewing) {
    if (toggle_grid_btn.getAttribute("value") === "on") {
      const src_info = document.getElementById("newPic").src;
      newImage = document.createElement("img");
      newImage.setAttribute("src", src_info);
      //newImage 회전여부 확인 후 CSS설정
      newImage.style.width = `${
        rotate_state == 0 || Math.abs(rotate_state) == 2 ? "100%" : "176px"
      }`;
      newImage.style.height = "100%";
      newImage.style.transform = `rotate(${rotate_state * 90}deg)`;
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
