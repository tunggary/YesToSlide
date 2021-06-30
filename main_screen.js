const button_collecting_On = document.getElementById("button_collecting_On");
const button_collecting_Off = document.getElementById("button_collecting_Off");

button_collecting_Off.addEventListener("click", () => {
  button_collecting_Off.style.display = "none";
  button_collecting_On.style.display = "inline-block";
});

button_collecting_On.addEventListener("click", () => {
  button_collecting_On.style.display = "none";
  button_collecting_Off.style.display = "inline-block";
});

const button_autoSlidesShow = document.getElementById("button_autoSlidesShow");
const button_manualSlidesShow = document.getElementById("button_manualSlidesShow");
const ifHover_manualSlideShow = document.getElementById("ifHover_manualSlideShow");
const ifHover_autoSlideShow = document.getElementById("ifHover_autoSlideShow");

button_manualSlidesShow.addEventListener("click", () => {
  button_manualSlidesShow.style.display = "none";
  button_autoSlidesShow.style.display = "inline-block";
});

button_manualSlidesShow.addEventListener("mouseover", () => {
  ifHover_manualSlideShow.style.display = "inline-block";
});

button_manualSlidesShow.addEventListener("mouseout", () => {
  ifHover_manualSlideShow.style.display = "none";
});

button_autoSlidesShow.addEventListener("click", () => {
  button_autoSlidesShow.style.display = "none";
  button_manualSlidesShow.style.display = "inline-block";
});

button_autoSlidesShow.addEventListener("mouseover", () => {
  ifHover_autoSlideShow.style.display = "inline-block";
});

button_autoSlidesShow.addEventListener("mouseout", () => {
  ifHover_autoSlideShow.style.display = "none";
});
