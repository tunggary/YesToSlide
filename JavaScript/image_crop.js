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
    rotate_state %= 4;
  }
  if (!gridding) {
    rotate_state_temp--;
    rotate_state_temp %= 4;
    //newImage 회전여부 확인 후 CSS설정
    newImage.style.width = `${
      rotate_state_temp == 0 || Math.abs(rotate_state_temp) == 2 ? "100%" : "176px"
    }`;
    newImage.style.height = "100%";
    newImage.style.transform = `rotate(${rotate_state_temp * 90}deg)`;
    newImage.style.objectFit = "contain";
  }
}

function rotateRight() {
  if (gridding && !viewing) {
    cropper.rotate(90);
    rotate_state++;
    rotate_state %= 4;
  }
  if (!gridding) {
    rotate_state_temp++;
    rotate_state_temp %= 4;
    //newImage 회전여부 확인 후 CSS설정
    newImage.style.width = `${
      rotate_state_temp == 0 || Math.abs(rotate_state_temp) == 2 ? "100%" : "176px"
    }`;
    newImage.style.height = "100%";
    newImage.style.transform = `rotate(${rotate_state_temp * 90}deg)`;
    newImage.style.objectFit = "contain";
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
  rotate_state = 0;
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

      thumbnailContext.drawImage(newCanvas, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
      var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg", 0.7);

      //enlarge cropped one
      var canvas = document.getElementById("Canvas2");
      var canvasContext = canvas.getContext("2d");
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(newCanvas, 0, 0, canvas.width, canvas.height);

      parent.parent.sunny.uploadToGD_base64(
        thumbnailData,
        msg,
        canvas.toDataURL("image/PNG", 1),
        "image"
      );

      /*
      //parent.sunny.uploadToGD_base64(newCanvas.toDataURL("image/PNG",1),msg,thumbnailData);
      parent.parent.sunny.uploadToGD_base64(
        thumbnailData,
        msg,
        canvas.toDataURL("image/PNG", 1),
        "image"
      );
     
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

      thumbnailCanvas.width = "343"; //"343";
      thumbnailCanvas.height = "191"; //"191";
      thumbnailContext.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
      thumbnailContext.drawImage(
        rotateOriginal(),
        0,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height
      );
      var thumbnailData = thumbnailCanvas.toDataURL("image/jpeg", 0.7);

      parent.parent.sunny.uploadToGD_base64(
        thumbnailData,
        msg,
        rotateOriginal().toDataURL("image/PNG", 1),
        "image"
      );

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
let rotate_state_temp = 0;
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
    rotate_state_temp = rotate_state;
  }
}

function rotateOriginal() {
  //여기 캔버스 크기 그대로 두고 중앙에 그려지고, 나머지 부분은 블러로 채워지도록 해야함

  const src_info = document.getElementById("newPic").src;
  let originalImage = document.createElement("img");
  originalImage.setAttribute("src", src_info);
  let rotateCount = rotate_state;

  var originalCanvas = document.querySelector("#originalCanvas");
  var originalContext = originalCanvas.getContext("2d");
  var editedWidth = (editedHeight = 0);
  var originalRatio = originalImage.width / originalImage.height;

  originalContext.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
  originalContext.save();

  var rotate = rotateCount % 4;
  if (rotate < 0) rotate += 4;

  if (rotate == 0 || rotate == 2) {
    if (originalRatio < 16 / 9) {
      editedHeight = originalCanvas.height;
      editedWidth = editedHeight * originalRatio;
    } else {
      editedWidth = originalCanvas.width;
      editedHeight = editedWidth / originalRatio;
    }
  } else {
    if (originalRatio < 9 / 16) {
      editedHeight = originalCanvas.width;
      editedWidth = editedHeight * originalRatio;
    } else {
      editedWidth = originalCanvas.height;
      editedHeight = editedWidth / originalRatio;
    }
  }

  originalContext.filter = "blur(50px)";
  switch (rotate) {
    case 0:
      originalContext.drawImage(originalImage, 0, 0, originalCanvas.width, originalCanvas.height);
      originalContext.filter = "none";
      if (originalRatio < 16 / 9) {
        originalContext.drawImage(
          originalImage,
          (originalCanvas.width - editedWidth) / 2,
          0,
          editedWidth,
          editedHeight
        );
      } else {
        originalContext.drawImage(
          originalImage,
          0,
          (originalCanvas.height - editedHeight) / 2,
          editedWidth,
          editedHeight
        );
      }
      break;
    case 1:
      originalContext.rotate((Math.PI / 180) * 90);
      originalContext.translate(0, -originalCanvas.width);
      originalContext.drawImage(originalImage, 0, 0, originalCanvas.height, originalCanvas.width);
      originalContext.filter = "none";
      if (originalRatio < 9 / 16) {
        originalContext.drawImage(
          originalImage,
          (originalCanvas.height - editedWidth) / 2,
          0,
          editedWidth,
          editedHeight
        );
      } else {
        originalContext.drawImage(
          originalImage,
          0,
          (originalCanvas.width - editedHeight) / 2,
          editedWidth,
          editedHeight
        );
      }
      break;
    case 2:
      originalContext.rotate((Math.PI / 180) * 180);
      originalContext.translate(-originalCanvas.width, -originalCanvas.height);
      originalContext.drawImage(originalImage, 0, 0, originalCanvas.width, originalCanvas.height);
      originalContext.filter = "none";
      if (originalRatio < 16 / 9) {
        originalContext.drawImage(
          originalImage,
          (originalCanvas.width - editedWidth) / 2,
          0,
          editedWidth,
          editedHeight
        );
      } else {
        originalContext.drawImage(
          originalImage,
          0,
          (originalCanvas.height - editedHeight) / 2,
          editedWidth,
          editedHeight
        );
      }
      break;
    case 3:
      originalContext.rotate((Math.PI / 180) * 270);
      originalContext.translate(-originalCanvas.height, 0);
      originalContext.drawImage(originalImage, 0, 0, originalCanvas.height, originalCanvas.width);
      originalContext.filter = "none";
      if (originalRatio < 9 / 16) {
        originalContext.drawImage(
          originalImage,
          (originalCanvas.height - editedWidth) / 2,
          0,
          editedWidth,
          editedHeight
        );
      } else {
        originalContext.drawImage(
          originalImage,
          0,
          (originalCanvas.width - editedHeight) / 2,
          editedWidth,
          editedHeight
        );
      }
      break;
  }
  originalContext.restore();
  return originalCanvas;
}
