//slide data
var slide_info = [
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

//210713 수정
function setImage(slide, checked = false) {
  let html = "";
  for (let i = 0; i < slide.length; i++) {
    html +=
      `<li class="image_list" id="` +
      slide[i].slideId +
      `" style="display:block;">
    <iframe class="image"
      src="${slide[i].slideUrl}"
      frameborder="0" width="345" height="194" allowfullscreen="true" mozallowfullscreen="true"
      webkitallowfullscreen="true"></iframe>
    <div class="image_info">
      <img src="${slide[i].profileImage}">
      <div>
        <div class="image_title">${slide[i].title}</div>
        <div class="image_name">${slide[i].name}</div>
      </div>
    </div>
    <div class="image_scroll_veil"></div>
    <div class="image_delete_btn">
      <img src="./img/그룹 230.png" width="12" height="12">
    </div>
    <label class="form-check-label" for="selected_check"></label>
    <input class="form-check-input shadow-none selected_check_label" type="checkbox" id="selected_check" ${
      checked ? "checked" : null
    }>
    <div class="image_voting_number">15표 (1등)</div>
    </li>`;
  }
  document.querySelector(".list_content ul").innerHTML = html;
}

setImage(slide_info);

function add_slide_info(each) {
  //console.log(each);
  slide_info.push(each);
}
