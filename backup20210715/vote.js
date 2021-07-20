const voteTab = document.getElementsByClassName("voteTab");

document.querySelector(".screen").addEventListener("gesturestart", touchstart);
document.querySelector(".screen").addEventListener("gestureend", touchend);

function touchstart(event) {
  // first_startX = event.touches[0].clientX;
  // first_startY = event.touches[0].clientY;
  // console.log("start: " + first_startX, first_startY);
  document.getElementsByClassName("info")[0].innerHTML += `<br>gesture start`;
}

function touchend(event) {
  // var x = event.changedTouches[0].clientX;
  // var y = event.changedTouches[0].clientY;
  // console.log("end: " + x, y);
  // document.getElementsByClassName("info")[0].innerHTML += `<br>end: ${x} / ${y}`;
  document.getElementsByClassName("info")[0].innerHTML += `<br>gesture end`;
}

var myElement = document.getElementById("screen");
var pz = new PinchZoom.default(myElement, {
  draggableUnzoomed: false,
  minZoom: 1,
  onZoomStart: function (object, event) {
    console.log("start");
  },
  onZoomEnd: function (object, event) {
    console.log("end");
  },
});
