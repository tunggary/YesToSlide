const activeImage = document.getElementsByClassName("active");
const image_list = document.getElementsByClassName("image_list");

for (let i = 0; i < image_list.length; i++) {
  image_list[i].addEventListener("click", () => {
    checkRadio();
    image_list[i].classList.toggle("active");
  });
}
function checkRadio() {
  for (let i = 0; i < image_list.length; i++) {
    if (image_list[i].className == "image_list active") {
      image_list[i].classList.remove("active");
    }
  }
}
