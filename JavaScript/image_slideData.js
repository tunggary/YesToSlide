//slide data
var slide_info = [];

//210713 수정
function setImage() {
  for (var i = 0; i < slide_info.length; i++) {
    add_a_slide_to_ul(slide_info[i], false);
  }
  return;
}

//setImage(slide_info);

function change_a_slide_info(sinfo) {
  //console.log(slide_info);
  for (var i = 0; i < slide_info.length; i++) {
    if (slide_info[i].thumbImgUrl_only == sinfo.thumbImgUrl_only) {
      slide_info[i] = sinfo;
      console.log(sinfo);
      var li = document.getElementById(sinfo.thumbImgUrl_only + "_for_li");
      li.setAttribute("slideId", sinfo.slideId);

      //console.log(slide_info[i]);
      break;
    }
  }
  //console.log(slide_info);
}
function add_a_slide_to_ul(each, adding = false, do_sorting = true) {
  // if (typeof each.thumbImgUrl_only === "undefined") {
  //   return;
  // }
  if (adding) {
    slide_info.push(each);
  }

  var ul = document.getElementById("ul_in_list_content");
  var li = document.createElement("li");
  ul.classList.add("column_1");

  li.classList.add("image_list");
  li.id = each.thumbImgUrl_only + "_for_li";
  var name = "";

  try {
    name = each.name.replace(/ /g, "_");
  } catch (err) {
    return;
  }

  li.name = name;

  li.setAttribute("cname", name);
  li.setAttribute("cvoting", 0);
  li.setAttribute("cthumb", each.thumbImgUrl_only);
  li.setAttribute("cdate", each.CreateTime);
  li.setAttribute("slideId", each.slideId);
  li.style.display = "block";

  //test용 코드
  let vote = 15;
  if (each.name === "홍길동") {
    vote = 10;
  } else if (each.name === "정성윤") {
    vote = 5;
  }

  li.innerHTML = `<iframe class="image"  
    src="${each.thumbImgUrl}"
    frameborder="0" width="345" height="194" allowfullscreen="true" mozallowfullscreen="true"
    webkitallowfullscreen="true"></iframe>
    <div class="image_info">
      <img src="${each.ProfileImage}">
      <div>
        <div class="image_title">${each.title}</div>
        <div class="image_name">${each.name}</div>
      </div>
    </div>
    <div class="image_scroll_veil" onclick="do_when_click_img('${each.thumbImgUrl_only}')"></div>
    <div class="image_delete_btn" onclick="delete_a_image('${each.thumbImgUrl_only}')">
      <img src="./img/그룹 230.png" width="12" height="12">
    </div>
    <label class="form-check-label" for="selected_check"></label>
    <input class="form-check-input shadow-none selected_check_label" type="checkbox" name="${
      each.thumbImgUrl_only
    }" id="selected_check" onclick="do_check_image(this);" >
    <div class="image_voting_number" id="${
      /*parent.parent.sha256(each.thumbImgUrl_only)*/ "test"
    }">${vote}표</div>
  `;

  ul.appendChild(li);
  if (do_sorting) {
    // sortList();
  } else {
    var list = document.getElementById("ul_in_list_content");
    var b = list.getElementsByTagName("LI");
    var sorted_imgages_by_property = [];
    // Loop through all list-items:
    for (i = 0; i < b.length; i++) {
      sorted_imgages_by_property.push(b[i].getAttribute("cthumb"));
      //console.log(b[i].getAttribute("cthumb"));
    }

    //console.log("****************sorted_imgages_by_property");
    parent.parent.sunny.set_sorted_images(sorted_imgages_by_property);
  }
  //console.log(slide_info);
}

function add_slide_info(each) {
  //console.log(each);
  slide_info.push(each);
}

function clear() {
  slide_info = [];
  //setImage();
  document.getElementById("ul_in_list_content").innerHTML = "";
}

var current_sorting_order = "time";
var prev_sorting_order = "";

function change_sorting(selectObject) {
  console.log(selectObject.value);
  var value = selectObject.value;
  //console.log(slide_info);
  if (current_sorting_order != value) {
    //document.querySelector(".list_content ul").innerHTML ="";
    current_sorting_order = value;
    if (current_sorting_order == "newest") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("-date"));
      sortList("newest");
      console.log("do_after_adding_all_images", 555);
      do_after_adding_all_images();
    } else if (current_sorting_order == "time") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("date"));
      sortList("cdate");
      console.log("do_after_adding_all_images", 555);
      do_after_adding_all_images();
    } else if (current_sorting_order == "name") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("name"));
      sortList("cname");
      console.log("do_after_adding_all_images", 555);
      do_after_adding_all_images();
    } else {
      change_sorting_vote();
    }
  }
}

//투표순 정렬
function change_sorting_vote() {
  let contents = document.getElementsByClassName("image_list");
  let parents = document.getElementById("ul_in_list_content");
  for (let i = 0; i < contents.length; i++) {
    if (contents[i].style.display == "none") {
      contents[i].children[6].innerHTML = "0표";
    }
  }
  for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents.length - 1 - i; j++) {
      //slide_info가 아닌 image_list의 text를 직접 가져와서 처리
      let num1 = Number(contents[j].children[6].innerText.replace(/[^0-9]/g, "") || "0");
      let num2 = Number(contents[j + 1].children[6].innerText.replace(/[^0-9]/g, "") || "0");
      //투표수가 없는 것들은 0표로 처리
      if (num1 < num2) {
        parents.insertBefore(contents[j + 1], contents[j]);
      }
    }
  }
}

function reset_voting_attributes() {
  var list = document.getElementById("ul_in_list_content");
  var listItem = list.getElementsByTagName("li");

  for (var i = 0; i < listItem.length; i++) {
    listItem[i].setAttribute("cvoting", 0);
  }
}
function sortList(sorting_property = "") {
  if (sorting_property == "") {
    if (current_sorting_order == "newest") {
      sorting_property = "newest";
    } else if (current_sorting_order == "time") {
      sorting_property = "cdate";
    } else if (current_sorting_order == "name") {
      sorting_property = "cname";
    }
  }
  if (sorting_property == "voting") sorting_property = "cvoting";

  var list, i, switching, b, shouldSwitch;

  list = document.getElementById("ul_in_list_content");

  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  var mandatory_cnt = list.getElementsByTagName("LI").length;
  while (switching) {
    mandatory_cnt--;
    //if(mandatory_cnt == -1)
    // break;
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");

    // Loop through all list-items:
    for (i = 0; i < b.length - 1; i++) {
      //console.log(b[i].getAttribute("cdate"));
      shouldSwitch = false;
      if (b[i].getAttribute("cdate") == "" || typeof b[i].getAttribute("cdate") === "undefined") {
        continue;
      }

      if (b[i].getAttribute("cname") == "" || typeof b[i].getAttribute("cname") === "undefined") {
        continue;
      }

      if (
        b[i].getAttribute("cvoting") == "" ||
        typeof b[i].getAttribute("cvoting") === "undefined"
      ) {
        continue;
      }

      // start by saying there should be no switching:

      /* check if the next item should
      switch place with the current item: */

      //console.log(sorting_property,b[i]);
      if (sorting_property == "newest") {
        //console.log(b[i].getAttribute(sorting_property),b[i].getAttribute(sorting_property));
        //console.log(b[i].getAttribute(sorting_property) <=b [i].getAttribute(sorting_property));
        if (
          b[i].getAttribute("cdate").toLowerCase() < b[i + 1].getAttribute("cdate").toLowerCase()
        ) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (sorting_property == "cvoting") {
        if (b[i].getAttribute(sorting_property) < b[i + 1].getAttribute(sorting_property)) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (
          b[i].getAttribute(sorting_property).toLowerCase() >
          b[i + 1].getAttribute(sorting_property).toLowerCase()
        ) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    }
    //console.log("shouldSwitch",shouldSwitch);
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      //console.log(list.getElementsByTagName("LI"));
    }
  }

  var b = list.getElementsByTagName("LI");
  var sorted_imgages_by_property = [];
  // Loop through all list-items:
  for (i = 0; i < b.length; i++) {
    sorted_imgages_by_property.push(b[i].getAttribute("cthumb"));
    //console.log(b[i].getAttribute("cthumb"));
  }

  // console.log("****************",sorted_imgages_by_property );
  parent.parent.sunny.set_sorted_images(sorted_imgages_by_property);

  /*
  console.log("current_sorting_order ",current_sorting_order);
  //console.log(slide_info);
  if (current_sorting_order == "newest") {
    slide_info = slide_info.sort(parent.parent.sunny.dynamicSort("-CreateTime"));
  
  } else if (current_sorting_order == "time") {
    slide_info = slide_info.sort(parent.parent.sunny.dynamicSort("CreateTime"));
  
  } else if (current_sorting_order == "name") {
    slide_info = slide_info.sort(parent.parent.sunny.dynamicSort("name"));
  
  }
  console.log(slide_info);
  */
}

function updating_voting_rst(li_Id, voting_cnt) {
  var id = parent.parent.sha256(li_Id);
  document.getElementById(id).innerHTML = voting_cnt + "표";
  //console.log(document.getElementById(li_Id+"_for_li").getAttribute("cvoting"));
  document.getElementById(li_Id + "_for_li").setAttribute("cvoting", voting_cnt);
  current_sorting_order = "cvoting";
  sortList("voting");
}

//test용 코드
slide_info = [
  {
    slideId: "slide_id",
    name: "정성윤",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.SLIDES_API1655905382_0",
    ProfileImage: "./img/profile.jpg",
    title: "작년 가을 가족끼리",
    category: "image",
  },
  {
    slideId: "slide_id",
    name: "홍길동",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2",
    ProfileImage: "./img/profile.jpg",
    title: "여름방학",
    category: "image",
  },
  {
    slideId: "slide_id",
    name: "김하나",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_8",
    ProfileImage: "./img/profile.jpg",
    title: "겨울여행",
    category: "image",
  },
];
setImage();
