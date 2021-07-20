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

function add_a_slide_to_ul(each, adding = false) {
  //console.log(each);
  if (adding) slide_info.push(each);
  var ul = document.getElementById("ul_in_list_content");
  ul.classList.add("column_1");
  var li = document.createElement("li");

  li.classList.add("image_list");
  li.id = each.slideId;
  var name = each.name.replace(/ /g, "_");
  li.name = name;
  li.setAttribute("cname", name);
  li.setAttribute("cdate", each.CreateTime);
  li.style.display = "block";

  li.innerHTML = `<iframe class="image"  
    src="${each.thumbImgUrl}"
    frameborder="0" allowfullscreen="true" mozallowfullscreen="true"
    webkitallowfullscreen="true"></iframe>
    <div class="image_info">
      <img src="${each.profileImage}">
      <div>
        <div class="image_title">${each.title}</div>
        <div class="image_name">${each.name}</div>
      </div>
    </div>
    <div class="image_scroll_veil"></div>
    <div class="image_delete_btn">
      <img src="./img/그룹 230.png">
    </div>
    <label class="form-check-label" for="selected_check"></label>
    <input class="form-check-input shadow-none selected_check_label" type="checkbox" id="selected_check">
    <div class="image_voting_number">15표 (1등)</div>
  `;

  //console.log(li);
  ul.appendChild(li);
  // sortList();
}

function add_slide_info(each) {
  console.log(each);
  slide_info.push(each);
}

function clear() {
  slide_info = [];
  //setImage();
  document.getElementById("ul_in_list_content").innerHTML = "";
}

var current_sorting_order = "newest";

function change_sorting(selectObject) {
  var value = selectObject.value;
  //console.log(slide_info);
  if (current_sorting_order != value) {
    //document.querySelector(".list_content ul").innerHTML ="";
    current_sorting_order = value;
    if (current_sorting_order == "newest") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("-date"));
      sortList("newest");
    } else if (current_sorting_order == "time") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("date"));
      sortList("cdate");
    } else if (current_sorting_order == "name") {
      //slide_info.sort(parent.parent.sunny.dynamicSort("name"));
      sortList("cname");
    }

    //console.log(slide_info);
  }

  //setImage();
  do_after_adding_all_images();
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
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("ul_in_list_content");
  //console.log(list);
  switching = true;
  //console.log(list.getElementsByTagName("LI"));
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < b.length - 1; i++) {
      // start by saying there should be no switching:
      shouldSwitch = false;
      /* check if the next item should
      switch place with the current item: */

      //console.log(sorting_property,b[i]);
      if (sorting_property == "newest") {
        //console.log(b[i].getAttribute(sorting_property),b[i].getAttribute(sorting_property));
        //console.log(b[i].getAttribute(sorting_property) <=b [i].getAttribute(sorting_property));
        if (
          b[i].getAttribute("cdate").toLowerCase() <= b[i + 1].getAttribute("cdate").toLowerCase()
        ) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
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
}

//test용 코드
add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "정성윤",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.SLIDES_API1655905382_0",
    profileImage: "./img/profile.jpg",
    title: "작년 가을 가족끼리",
    category: "image",
  },
  true
);

add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "정성윤",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2",
    profileImage: "./img/profile.jpg",
    title: "작년 가을 가족끼리",
    category: "image",
  },
  true
);

add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "정성윤",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_8",
    profileImage: "./img/profile.jpg",
    title: "작년 가을 가족끼리",
    category: "image",
  },
  true
);
