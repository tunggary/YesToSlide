//사진 선택하면 주황색 테두리 띄우기
const image_list = document.getElementsByClassName("image_list");
const image_scroll_veil = document.getElementsByClassName("image_scroll_veil");
for (let i = 0; i < image_scroll_veil.length; i++) {
  image_scroll_veil[i].addEventListener("click", () => {
    checkRadio();
    image_list[i].classList.toggle("active");
  });
}
function checkRadio() {
  for (let i = 0; i < image_scroll_veil.length; i++) {
    if (image_list[i].className == "image_list active") {
      image_list[i].classList.remove("active");
    }
  }
}

// 모두삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const dark_background = document.getElementsByClassName("dark_background");
const all_delete_btn = document.getElementById("all_delete_btn");
const all_delete_modal = document.getElementById("all_delete_modal");
all_delete_btn.addEventListener("click", () => {
  all_delete_modal.style.display = "block";
  dark_background[0].style.display = "block";
});

// 사진삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
const image_delete_btn = document.getElementsByClassName("image_delete_btn");
const image_delete_modal = document.getElementById("image_delete_modal");
for (let i = 0; i < image_delete_btn.length; i++) {
  image_delete_btn[i].addEventListener("click", () => {
    image_delete_modal.style.display = "block";
    dark_background[0].style.display = "block";
  });
}

// 삭제,취소버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
const delete_btn = document.getElementsByClassName("delete_btn");
const negative_btn = document.getElementsByClassName("negative_btn");
const par_back_img = document.getElementsByClassName("par_back_img");
for (let i = 0; i < delete_btn.length; i++) {
  delete_btn[i].addEventListener("click", () => {
    par_back_img[i].style.display = "none";
    dark_background[0].style.display = "none";
  });
  negative_btn[i].addEventListener("click", () => {
    par_back_img[i].style.display = "none";
    dark_background[0].style.display = "none";
  });
}

//slide data
const slide_info = [
  {
    slideUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.SLIDES_API1655905382_0",
    title: "지난 해 추석 외가집 친척들과 함께 모였던 사진",
    name: "정성윤",
    profileImage: "./img/profile.jpg",
    category: "image",
    date: "2021-07-07",
  },
  {
    slideUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2",
    title: "작년겨울 가족들과 함께 본 바다풍경",
    name: "홍길동",
    profileImage: "./img/profile.jpg",
    category: "image",
    date: "2021-07-07",
  },
  {
    slideUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_8",
    title: "2020 친구들과 함께 본 일몰",
    name: "김하나",
    profileImage: "./img/profile.jpg",
    category: "image",
    date: "2021-07-07",
  },
];

function setImage() {
  let html = "";
  for (let i = 0; i < slide_info.length; i++) {
    html += `<li class="image_list">
    <iframe class="image"
      src="https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2"
      frameborder="0" width="345" height="194" allowfullscreen="true" mozallowfullscreen="true"
      webkitallowfullscreen="true"></iframe>
    <div class="image_info">
      <img src="./img/profile.jpg">
      <div>
        <div class="image_title">지난 해 추석 외가집 친척들과 함께 모였던 사진</div>
        <div class="image_name">정성윤</div>
      </div>
    </div>
    <div class="image_scroll_veil"></div>
    <div class="image_delete_btn">
      <img src="./img/그룹 230.png" width="12" height="12">
    </div>
  </li>`;
  }
}
