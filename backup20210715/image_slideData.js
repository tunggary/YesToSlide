//slide data
var slide_info = [];

//210713 수정
function setImage() {
  console.log(slide_info);
  let html = "";
  for (let i = 0; i < slide_info.length; i++) {
    html +=
      `<li class="image_list" id="` +
      slide_info[i].slideId +
      `" style="display:block;">
    <iframe class="image"
      src="${slide_info[i].slideUrl}"
      frameborder="0" width="345" height="194" allowfullscreen="true" mozallowfullscreen="true"
      webkitallowfullscreen="true"></iframe>
    <div class="image_info">
      <img src="${slide_info[i].profileImage}">
      <div>
        <div class="image_title">${slide_info[i].title}</div>
        <div class="image_name">${slide_info[i].name}</div>
      </div>
    </div>
    <div class="image_scroll_veil"></div>
    <div class="image_delete_btn">
      <img src="./img/그룹 230.png" width="12" height="12">
    </div>
    <label class="form-check-label" for="selected_check"></label>
    <input class="form-check-input shadow-none selected_check_label" type="checkbox" id="selected_check">
    <div class="image_voting_number">15표 (1등)</div>
    </li>`;
  }
  document.querySelector(".list_content ul").innerHTML = html;
}

function add_slide_info(each) {
  console.log(each);
  slide_info.push(each);
}
function clear() {
  slide_info = [];
  setImage();
}

//test용 코드
add_slide_info({
  slideId: "jsy",
  slideUrl:
    "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.SLIDES_API1655905382_0",
  profileImage: "./img/profile.jpg",
  title: "지난 해 추석 외가집 친척들과 함께 모였던 사진",
  name: "정성윤",
  category: "image",
});
add_slide_info({
  slideId: "jsy",
  slideUrl:
    "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2",
  profileImage: "./img/profile.jpg",
  title: "지난 해 추석 외가집 친척들과 함께 모였던 사진",
  name: "정성윤",
  category: "image",
});
add_slide_info({
  slideId: "jsy",
  slideUrl:
    "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_8",
  profileImage: "./img/profile.jpg",
  title: "지난 해 추석 외가집 친척들과 함께 모였던 사진",
  name: "정성윤",
  category: "image",
});
setImage();
