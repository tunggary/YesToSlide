Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./face-api-models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./face-api-models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./face-api-models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./face-api-models"),
]);

function load_image(input) {
  if (input.files[0] == undefined) {
    return;
  }
  document.getElementsByClassName("container")[0].innerHTML = "";
  let img = document.createElement("img");
  img.src = URL.createObjectURL(input.files[0]);
  img.setAttribute("id", "myImg");
  document.getElementsByClassName("container")[0].appendChild(img);
}

async function detect() {
  if (document.getElementsByClassName("rect")[0]) {
    document.getElementsByClassName("rect")[0].remove();
  }
  const input = document.getElementById("myImg");
  const canvas = faceapi.createCanvasFromMedia(input);
  document.getElementsByClassName("container")[0].append(canvas);
  const displaySize = { width: input.width, height: input.height };
  faceapi.matchDimensions(canvas, displaySize);
  const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions());
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  faceapi.draw.drawDetections(canvas, resizedDetections);
  console.log(resizedDetections);

  let Xsum = 0,
    Ysum = 0;
  let Xmax = input.offsetLeft,
    Ymax = input.offsetTop;
  let Xmin = input.offsetLeft + input.offsetWidth,
    Ymin = input.offsetTop + input.offsetHeight;
  for (let i = 0; i < resizedDetections.length; i++) {
    let {
      _box: { width, height, x, y },
    } = resizedDetections[i];
    x = input.offsetLeft + x;
    y = input.offsetTop + y;

    Xmax = x + width > Xmax ? x + width : Xmax;
    Xmax =
      Xmax > input.offsetLeft + input.offsetWidth ? input.offsetLeft + input.offsetWidth : Xmax;

    Ymax = y + height > Ymax ? y + height : Ymax;
    Ymax =
      Ymax > input.offsetTop + input.offsetHeight ? input.offsetTop + input.offsetHeight : Ymax;

    Xmin = x < Xmin ? x : Xmin;
    Xmin = Xmin < input.offsetLeft ? input.offsetLeft : Xmin;

    Ymin = y < Ymin ? y : Ymin;
    Ymin = Ymin < input.offsetTop ? input.offsetTop : Ymin;

    Xsum += x + width / 2;
    Ysum += y + height / 2;
  }
  Xmin = resizedDetections.length ? Xmin : input.offsetLeft;
  Xmax = resizedDetections.length ? Xmax : input.offsetLeft + input.offsetWidth;
  Ymin = resizedDetections.length ? Ymin : input.offsetTop;
  Ymax = resizedDetections.length ? Ymax : input.offsetTop + input.offsetHeight;
  Xavg = resizedDetections.length
    ? Xsum / resizedDetections.length
    : input.offsetLeft + input.offsetWidth / 2;
  Yavg = resizedDetections.length
    ? Ysum / resizedDetections.length
    : input.offsetTop + input.offsetHeight / 2;
  rectWidth = Xmax - Xmin;
  rectHeight = Ymax - Ymin;
  positionLeft = Xmin;
  positionTop = Ymin;
  console.log(Xavg, Yavg, rectWidth, rectHeight, positionLeft, positionTop);

  if (rectWidth >= rectHeight) {
    rectWidth = Xmax - Xmin + input.offsetWidth / 5;
    rectHeight = rectWidth * 0.5625;
    positionLeft = Xmin - input.offsetWidth / 10;
    positionTop = Yavg - rectHeight / 2;

    if (rectHeight > input.offsetHeight) {
      rectHeight = input.offsetHeight;
      positionTop = input.offsetTop;
    }
    if (positionTop < input.offsetTop) {
      positionTop = input.offsetTop;
    }
    if (positionTop + rectHeight > input.offsetTop + input.offsetHeight) {
      positionTop = input.offsetTop + input.offsetHeight - rectHeight;
    }

    if (rectWidth > input.offsetWidth) {
      rectWidth = input.offsetWidth;
      rectHeight = rectWidth * 0.5625;
      positionLeft = input.offsetLeft;
      positionTop = Yavg - rectHeight / 2;
    }
    if (positionLeft < input.offsetLeft) {
      positionLeft = input.offsetLeft;
    }
    if (positionLeft + rectWidth > input.offsetLeft + input.offsetWidth) {
      positionLeft = input.offsetLeft + input.offsetWidth - rectWidth;
    }
  } else {
    rectHeight = Ymax - Ymin + input.offsetHeight / 5;
    rectWidth = rectHeight * 1.7777;
    positionLeft = Xavg - rectWidth / 2;
    positionTop = Ymin - input.offsetHeight / 10;

    if (rectHeight > input.offsetHeight) {
      rectHeight = input.offsetHeight;
      positionTop = input.offsetTop;
    }
    if (positionTop < input.offsetTop) {
      positionTop = input.offsetTop;
    }
    if (positionTop + rectHeight > input.offsetTop + input.offsetHeight) {
      positionTop = input.offsetTop + input.offsetHeight - rectHeight;
    }

    if (rectWidth > input.offsetWidth) {
      rectWidth = input.offsetWidth;
      rectHeight = rectWidth * 0.5625;
      positionLeft = input.offsetLeft;
      positionTop = Yavg - rectHeight / 2;
    }
    if (positionLeft < input.offsetLeft) {
      positionLeft = input.offsetLeft;
    }
    if (positionLeft + rectWidth > input.offsetLeft + input.offsetWidth) {
      positionLeft = input.offsetLeft + input.offsetWidth - rectWidth;
    }
  }
  let div = document.createElement("div");
  div.classList.add("rect");
  div.style.width = `${rectWidth}px`;
  div.style.height = `${rectHeight}px`;
  div.style.left = `${positionLeft}px`;
  div.style.top = `${positionTop}px`;
  document.getElementsByClassName("container")[0].appendChild(div);
}

function newCanvas() {
  var canvas = document.getElementById("canvas");
  canvas.width = rectWidth;
  canvas.height = rectHeight;
  var context = canvas.getContext("2d");

  let img = document.getElementById("myImg");
  imageLeft = positionLeft - img.offsetLeft;
  imageTop = positionTop - img.offsetTop;

  context.drawImage(
    img,
    imageLeft,
    imageTop,
    rectWidth,
    rectHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
}
