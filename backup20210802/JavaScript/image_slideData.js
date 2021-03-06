//slide data
var slide_info = [];

function setImage() {
  for (var i = 0; i < slide_info.length; i++) {
    add_a_slide_to_ul(slide_info[i], false);
  }
  return;
}

function change_a_slide_info(sinfo) {
  console.log(slide_info);
  for (var i = 0; i < slide_info.length; i++) {
    if (slide_info[i].thumbImgUrl_only == sinfo.thumbImgUrl_only) {
      slide_info[i] = sinfo;
      var li = document.getElementById(sinfo.thumbImgUrl_only + "_for_li");
      li.setAttribute("slideId", sinfo.slideId);

      console.log(slide_info[i]);
      break;
    }
  }
  console.log(slide_info);
}
function add_a_slide_to_ul(each, adding = false) {
  console.log(each);
  if (adding) slide_info.push(each);

  var ul = document.getElementById("ul_in_list_content");
  var li = document.createElement("li");
  ul.classList.add("column_1");

  li.classList.add("image_list");
  //li.id = each.slideId+"_image";
  li.id = each.thumbImgUrl_only + "_for_li";
  var name = "";

  try {
    name = each.name.replace(/ /g, "_");
  } catch (err) {
    return;
  }

  li.name = name;

  li.setAttribute("cname", name);
  li.setAttribute("cthumb", each.thumbImgUrl_only);
  li.setAttribute("cdate", each.CreateTime);
  li.setAttribute("slideId", each.slideId);
  li.style.display = "block";
  console.log("each.ProfileImage", each.ProfileImage);
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
      <img src="./img/delete_image_btn.png" width="12" height="12">
    </div>
    <label class="form-check-label" for="selected_check"></label>
    <input class="form-check-input shadow-none selected_check_label" type="checkbox" name="${each.thumbImgUrl_only}" id="selected_check" onclick="do_check_image(this);" >
    <div class="image_voting_number">15??? (1???)</div>
  `;

  ul.appendChild(li);
  // sortList();
  console.log(slide_info);
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
  console.log("do_after_adding_all_images", 555);
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

  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
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
      // start by saying there should be no switching:

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

  var b = list.getElementsByTagName("LI");
  var sorted_imgages_by_property = [];
  // Loop through all list-items:
  for (i = 0; i < b.length; i++) {
    sorted_imgages_by_property.push(b[i].getAttribute("cthumb"));
    //console.log(b[i].getAttribute("cthumb"));
  }

  console.log("****************", sorted_imgages_by_property);
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

//test??? ??????
add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "?????????",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.SLIDES_API1655905382_0",
    ProfileImage: "./img/profile.jpg",
    title: "?????? ?????? ????????????",
    category: "image",
  },
  true
);

add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "?????????",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_2",
    ProfileImage: "./img/profile.jpg",
    title: "?????? ?????? ????????????",
    category: "image",
  },
  true
);

add_a_slide_to_ul(
  {
    slideId: "slide_id",
    name: "?????????",
    CreateTime: "210719",
    thumbImgUrl:
      "https://docs.google.com/presentation/d/1wJeY0T4ZGlCSyo2YnKiNRSvai84FDd-CdaC9FUJrU-c/preview?rm=minimal&slide=id.ge29cb1c65e_0_8",
    ProfileImage: "./img/profile.jpg",
    title: "?????? ?????? ????????????",
    category: "image",
  },
  true
);
setImage(slide_info);
