const voteTab = document.getElementsByClassName("voteTab");
let first_startX = null,
  first_startY = null;
let second_startX = null,
  second_startY = null;
document.querySelector(".screen").addEventListener("touchstart", touchstart);
document.querySelector(".screen").addEventListener("touchend", touchend);

function touchstart(event) {
  first_startX = event.touches[0].clientX;
  first_startY = event.touches[0].clientY;
  // first_startX
  //   ? (second_startX = event.touches[0].clientX)
  //   : (first_startX = event.touches[0].clientX);
  // first_startY
  //   ? (second_startY = event.touches[0].clientY)
  //   : (first_startY = event.touches[0].clientY);
  console.log("start: " + first_startX, first_startY);
  document.getElementsByClassName(
    "info"
  )[0].innerHTML += `<br>start: ${first_startX} / ${first_startY}`;
}

function touchend(event) {
  var x = event.changedTouches[0].clientX;
  var y = event.changedTouches[0].clientY;
  console.log("end: " + x, y);
  document.getElementsByClassName("info")[0].innerHTML += `<br>end: ${x} / ${y}`;
}
