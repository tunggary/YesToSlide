//사진 선택하면 주황색 테두리 띄우기
var image_list = null;
var image_scroll_veil = null;
function do_when_click_img(thumbImgUrl_only) {
  console.log(thumbImgUrl_only);

  var li = document.getElementById(thumbImgUrl_only + "_for_li");
  console.log(li);

  checkRadio();
  li.classList.toggle("active");
  parent.parent.sunny.set_current_thumbId_for_sorting(li.getAttribute("cthumb"));

  console.log(li.getAttribute("slideId"));
  if (li.getAttribute("slideId") == "none" || true) {
    console.log(li.getAttribute("cthumb"));
    console.log(slide_info);
    var found = false;
    for (var j = 0; j < slide_info.length; j++) {
      if (li.getAttribute("cthumb") == slide_info[j].thumbImgUrl_only) {
        var info = {
          Comment: "",
          CreateTime: 12,
          Email: "",
          ID: "", //"SLIDES_API1348034400_0",
          Kind: "Image",
          Name: "",
          OriginID: "", //"SLIDES_API504215932_0",
          OriginPresent: "", //"1VH2gLwlr0LK1lYBzxlxI-tJARBU8te3MaHr2UwdONYM",
          PresentationID: "",
          ProfileImage: "",
          orgImgUrl: "",
          thumbImgUrl: "",
        };

        info.Comment = slide_info[j].title;
        info.CreateTime = slide_info[j].CreateTime;
        info.Name = slide_info[j].name;
        info.OriginPresent = parent.parent.sunny.get_current_original_presentationID();
        info.PresentationID = parent.parent.sunny.get_current_presentationID();
        info.ProfileImage = slide_info[j].ProfileImage;
        info.thumbImgUrl = slide_info[j].thumbImgUrl;
        info.orgImgUrl = slide_info[j].orgImgUrl.replace("https://drive.google.com/uc?&id=", "");

        console.log(info);

        /*
            CreateTime: "20210721193339"
            ProfileImage: "https://lh3.googleusercontent.com/a/AATXAJy7wHTwoe5rldlDuYtGYGvKuM_ZMqCbBZ89GoIg=s96-c"
            category: "image"
            date: "2021-07-07"
            name: "Interns Toslide"
            orgImgUrl: "https://drive.google.com/uc?&id=115EF_kW7FSjUO4PCScXkKBZCsKoFygV8"
            slideId: "none"
            slideUrl: ""
            thumbImgUrl: "https://drive.google.com/uc?&id=1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            thumbImgUrl_only: "1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            title: "sss"
            */
        console.log(slide_info[j]);
        /*
            alert(parent.parent.sunny.is_controller());
            if(parent.parent.sunny.is_controller())
            {
              return;
            }
            */
        if (parent.parent.sunny.is_controller()) {
          parent.parent.sunny.navigate_slide(i);
          return;
        }
        parent.parent.sunny.update_main_slide_image(
          "",
          info,
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );

        return;
      }
    }
    console.log("info not found");
    return;
  }

  if (parent.parent.sunny.is_controller()) {
    parent.parent.sunny.navigate_slide(i);
    return;
  }

  parent.parent.sunny.find_comment_from_spreadsheet_using_google_slideID(
    li.getAttribute("slideId"),
    function (info_rst) {
      if (info_rst.length == 0) {
        //alert("no info for this picture");
        parent.parent.sunny.update_main_slide_image(
          li.getAttribute("slideId"),
          info,
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );
        //return;
      } else {
        parent.parent.sunny.update_main_slide_image(
          li.getAttribute("slideId"),
          info[0],
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );
      }
    }
  );

  return;
  checkRadio();
  image_list[i].classList.toggle("active");
  // console.log(image_list[i]);

  //console.log("cthumb ",image_list[i].getAttribute("cthumb"));
  parent.parent.sunny.set_current_thumbId_for_sorting(image_list[i].getAttribute("cthumb"));
  if (image_list[i].id == "none") {
    console.log(image_list[i].getAttribute("cthumb"));
    console.log(slide_info);
    var found = false;
    for (var j = 0; j < slide_info.length; j++) {
      if (image_list[i].getAttribute("cthumb") == slide_info[j].thumbImgUrl_only) {
        var info = {
          Comment: "",
          CreateTime: 12,
          Email: "",
          ID: "", //"SLIDES_API1348034400_0",
          Kind: "Image",
          Name: "",
          OriginID: "", //"SLIDES_API504215932_0",
          OriginPresent: "", //"1VH2gLwlr0LK1lYBzxlxI-tJARBU8te3MaHr2UwdONYM",
          PresentationID: "",
          ProfileImage: "",
          orgImgUrl: "",
          thumbImgUrl: "",
        };

        info.Comment = slide_info[j].title;
        info.CreateTime = slide_info[j].CreateTime;
        info.Name = slide_info[j].name;
        info.OriginPresent = parent.parent.sunny.get_current_original_presentationID();
        info.PresentationID = parent.parent.sunny.get_current_presentationID();
        info.ProfileImage = slide_info[j].ProfileImage;
        info.thumbImgUrl = slide_info[j].thumbImgUrl;
        info.orgImgUrl = slide_info[j].orgImgUrl.replace("https://drive.google.com/uc?&id=", "");

        console.log(info);

        /*
            CreateTime: "20210721193339"
            ProfileImage: "https://lh3.googleusercontent.com/a/AATXAJy7wHTwoe5rldlDuYtGYGvKuM_ZMqCbBZ89GoIg=s96-c"
            category: "image"
            date: "2021-07-07"
            name: "Interns Toslide"
            orgImgUrl: "https://drive.google.com/uc?&id=115EF_kW7FSjUO4PCScXkKBZCsKoFygV8"
            slideId: "none"
            slideUrl: ""
            thumbImgUrl: "https://drive.google.com/uc?&id=1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            thumbImgUrl_only: "1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            title: "sss"
            */
        console.log(slide_info[j]);
        /*
            alert(parent.parent.sunny.is_controller());
            if(parent.parent.sunny.is_controller())
            {
              return;
            }
            */
        if (parent.parent.sunny.is_controller()) {
          parent.parent.sunny.navigate_slide(i);
          return;
        }
        parent.parent.sunny.update_main_slide_image(
          "",
          info,
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );

        return;
      }
    }
    console.log("info not found");
    return;
  }

  if (parent.parent.sunny.is_controller()) {
    parent.parent.sunny.navigate_slide(i);
    return;
  }
  parent.parent.sunny.find_comment_from_spreadsheet_using_google_slideID(
    image_list[i].id,
    function (info) {
      if (info.length == 0) {
        //alert("no info for this picture");
        parent.parent.sunny.update_main_slide_image(
          image_list[i].id,
          null,
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );
        //return;
      } else {
        parent.parent.sunny.update_main_slide_image(
          image_list[i].id,
          info[0],
          parent.parent.main_iframe,
          "image_content",
          "chat_boxID",
          "chat_box_name",
          "chat_box_comment",
          "chat_profileID"
        );
      }
    }
  );
}
function prepare_show_outline() {
  return;
  image_list = document.getElementsByClassName("image_list");
  image_scroll_veil = document.getElementsByClassName("image_scroll_veil");
  for (let i = 0; i < image_scroll_veil.length; i++) {
    image_scroll_veil[i].addEventListener("click", () => {
      do_when_click_img(i);
      return;
      checkRadio();
      image_list[i].classList.toggle("active");
      // console.log(image_list[i]);

      //console.log("cthumb ",image_list[i].getAttribute("cthumb"));
      parent.parent.sunny.set_current_thumbId_for_sorting(image_list[i].getAttribute("cthumb"));
      if (image_list[i].id == "none") {
        console.log(image_list[i].getAttribute("cthumb"));
        console.log(slide_info);
        var found = false;
        for (var j = 0; j < slide_info.length; j++) {
          if (image_list[i].getAttribute("cthumb") == slide_info[j].thumbImgUrl_only) {
            var info = {
              Comment: "",
              CreateTime: 12,
              Email: "",
              ID: "", //"SLIDES_API1348034400_0",
              Kind: "Image",
              Name: "",
              OriginID: "", //"SLIDES_API504215932_0",
              OriginPresent: "", //"1VH2gLwlr0LK1lYBzxlxI-tJARBU8te3MaHr2UwdONYM",
              PresentationID: "",
              ProfileImage: "",
              orgImgUrl: "",
              thumbImgUrl: "",
            };

            info.Comment = slide_info[j].title;
            info.CreateTime = slide_info[j].CreateTime;
            info.Name = slide_info[j].name;
            info.OriginPresent = parent.parent.sunny.get_current_original_presentationID();
            info.PresentationID = parent.parent.sunny.get_current_presentationID();
            info.ProfileImage = slide_info[j].ProfileImage;
            info.thumbImgUrl = slide_info[j].thumbImgUrl;
            info.orgImgUrl = slide_info[j].orgImgUrl.replace(
              "https://drive.google.com/uc?&id=",
              ""
            );

            console.log(info);

            /*
            CreateTime: "20210721193339"
            ProfileImage: "https://lh3.googleusercontent.com/a/AATXAJy7wHTwoe5rldlDuYtGYGvKuM_ZMqCbBZ89GoIg=s96-c"
            category: "image"
            date: "2021-07-07"
            name: "Interns Toslide"
            orgImgUrl: "https://drive.google.com/uc?&id=115EF_kW7FSjUO4PCScXkKBZCsKoFygV8"
            slideId: "none"
            slideUrl: ""
            thumbImgUrl: "https://drive.google.com/uc?&id=1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            thumbImgUrl_only: "1ZoKTvOCQks84khQjQGqswzUeOEsme7KK"
            title: "sss"
            */
            console.log(slide_info[j]);
            parent.parent.sunny.update_main_slide_image(
              "",
              info,
              parent.parent.main_iframe,
              "image_content",
              "chat_boxID",
              "chat_box_name",
              "chat_box_comment",
              "chat_profileID"
            );

            return;
          }
        }
        console.log("info not found");
        return;
      }

      parent.parent.sunny.find_comment_from_spreadsheet_using_google_slideID(
        image_list[i].id,
        function (info) {
          if (info.length == 0) {
            //alert("no info for this picture");
            parent.parent.sunny.update_main_slide_image(
              image_list[i].id,
              null,
              parent.parent.main_iframe,
              "image_content",
              "chat_boxID",
              "chat_box_name",
              "chat_box_comment",
              "chat_profileID"
            );
            //return;
          } else {
            parent.parent.sunny.update_main_slide_image(
              image_list[i].id,
              info[0],
              parent.parent.main_iframe,
              "image_content",
              "chat_boxID",
              "chat_box_name",
              "chat_box_comment",
              "chat_profileID"
            );
          }
        }
      );
    });
  }
}

function checkRadio() {
  image_list = document.getElementsByClassName("image_list");
  image_scroll_veil = document.getElementsByClassName("image_scroll_veil");

  for (let i = 0; i < image_scroll_veil.length; i++) {
    if (image_list[i].classList.contains("active")) {
      image_list[i].classList.remove("active");
    }
  }
}

// 모두삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var dark_background = null;
var all_delete_btn = null;
var all_delete_modal = null;
function prepare_open_delete_all_modal() {
  dark_background = document.getElementsByClassName("dark_background");
  all_delete_btn = document.getElementById("all_delete_btn");
  all_delete_modal = document.getElementById("all_delete_modal");
  all_delete_btn.addEventListener("click", () => {
    all_delete_modal.style.display = "block";
    dark_background[0].style.display = "block";
  });
}

// 사진삭제버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var image_delete_btn = null;
var image_delete_modal = null;

/*
function do_image_delete(e)
{
  image_delete_modal = document.getElementById("image_delete_modal");
  var slideId = e.currentTarget.myParam;
  console.log(slideId);
  image_delete_modal.style.display = "block";
  dark_background[0].style.display = "block";
}
*/

var tobe_deleted_image_slideId = "";
var tobe_deleted_image_slideId_org = "";
function delete_a_image(thumbImgUrl_only) {
  if (ongoing_one_image_deleting) {
    alert("image deleting is going on, try seconds later");
    return;
  }
  image_delete_modal = document.getElementById("image_delete_modal");

  //console.log(thumbImgUrl_only);
  //console.log(slide_info);
  var found = false;
  for (var i = 0; i < slide_info.length; i++) {
    //console.log(slide_info[i].thumbImgUrl_only);
    //console.log(thumbImgUrl_only);
    if (thumbImgUrl_only == slide_info[i].thumbImgUrl_only) {
      //console.log(slide_info[i]);

      //console.log(slide_info[i].slideId);
      if (slide_info[i].slideId == "none") {
        break;
      }

      found = true;
      org_slideId = slide_info[i].slideId_origin;
      //console.log(slide_info[i].slideId_origin);
      tobe_deleted_image_slideId_org = slide_info[i].slideId_origin;
      tobe_deleted_image_slideId = slide_info[i].slideId;
      break;
    }
  }

  if (tobe_deleted_image_slideId_org == "" || tobe_deleted_image_slideId == "") {
    found = false;
  }
  if (found) {
    image_delete_modal.style.display = "block";
    dark_background[0].style.display = "block";
  } else {
    tobe_deleted_image_slideId = "";
    tobe_deleted_image_slideId_org = "";
    alert("image already deleted or not yet prepared");
  }
}
function prepare_open_delete_modal() {
  return;
  image_delete_btn = document.getElementsByClassName("image_delete_btn");
  image_delete_modal = document.getElementById("image_delete_modal");
  for (let i = 0; i < image_delete_btn.length; i++) {
    console.log(i);

    try {
      image_delete_btn[i].removeEventListener("click", do_image_delete);
    } catch (err) {
      console.log(err.message);
    }
    image_delete_btn[i].addEventListener("click", do_image_delete, false);
    console.log(image_delete_btn[i].name);
    console.log(image_delete_btn[i]);
    image_delete_btn[i].myParam = image_delete_btn[i].name;

    /*
    image_delete_btn[i].addEventListener("click", () => {

      console.log(i, slide_info[i]);
      image_delete_modal.style.display = "block";
      dark_background[0].style.display = "block";
    });
    */
  }
}

// 사진 및 동영상 보내기버튼 누르면 모달 띄우기 & 검은색 뒷배경 띄우기
var send_imageOrVideo = null;
var send_imageOrVideo_modal = null;
function prepare_open_send_modal() {
  send_imageOrVideo = document.getElementById("send_imageOrVideo");
  send_imageOrVideo_modal = document.getElementById("send_imageOrVideo_modal");
  send_imageOrVideo.addEventListener("click", () => {
    send_imageOrVideo_modal.style.display = "block";
    dark_background[0].style.display = "block";
  });
}

// 삭제,취소,x버튼 누르면 모달 없애기 & 검은색 뒷배경 없애기
var delete_btn = null;
var negative_btn = null;
var par_back_img = null;
var close_btn = null;

var ongoing_one_image_deleting = false;
function do_delete_image(e) {
  if (ongoing_one_image_deleting) {
    return;
  }

  ongoing_one_image_deleting = true;

  //var i = e.currentTarget.myParam;
  par_back_img = document.getElementsByClassName("par_back_img");

  parent.parent.sunny_slides_sheets.delete_a_slide(
    parent.parent.sunny.get_current_presentationID(),
    tobe_deleted_image_slideId,
    function (rst) {
      console.log(rst);

      parent.parent.sunny_slides_sheets.delete_a_slide(
        parent.parent.sunny.get_current_original_presentationID(),
        tobe_deleted_image_slideId_org,
        function (rst) {
          console.log(rst);
          ongoing_one_image_deleting = false;
        }
      );
    }
  );

  image_delete_modal = document.getElementById("image_delete_modal");
  image_delete_modal.style.display = "none";
  dark_background[0].style.display = "none";

  console.log(slide_info.length, slide_info);
  var thumbImgUrl_only = "";
  for (var j = 0; j < slide_info.length; j++) {
    if (slide_info[j].slideId == tobe_deleted_image_slideId) {
      thumbImgUrl_only = slide_info[j].thumbImgUrl_only;
      slide_info.splice(j, 1);
      break;
    }
  }
  console.log(slide_info.length, slide_info);

  console.log(thumbImgUrl_only + "_for_li");
  var child = document.getElementById(thumbImgUrl_only + "_for_li");
  console.log(child);

  document.getElementById("ul_in_list_content").removeChild(child);

  parent.parent.sunny.clear_image_content();

  //each.slideId+"_image"
  //setTimeout(() => {
  //parent.parent.load_all_images_to_image_list();
  //}, 5000);
}

function do_cancel_delete_image(e) {
  image_delete_modal = document.getElementById("image_delete_modal");
  image_delete_modal.style.display = "none";
  dark_background[0].style.display = "none";
}
function do_close_sending_img(e) {
  send_imageOrVideo_modal.style.display = "none";
  dark_background[0].style.display = "none";
}
function prepare_cancel_delete_modal() {
  delete_btn = document.getElementsByClassName("delete_btn_each");
  negative_btn = document.getElementsByClassName("negative_btn_each");
  par_back_img = document.getElementsByClassName("par_back_img");
  close_btn = document.getElementById("close_btn");
  for (let i = 0; i < delete_btn.length; i++) {
    try {
      //console.log("delete do_delete_image");
      delete_btn[i].removeEventListener("click", do_delete_image);
    } catch (err) {
      console.log(err.message);
    }

    //console.log("add do_delete_image");
    delete_btn[i].addEventListener("click", do_delete_image, false);
    delete_btn[i].myParam = i;
  }

  for (let i = 0; i < negative_btn.length; i++) {
    try {
      //console.log("delete do_delete_image");
      negative_btn[i].removeEventListener("click", do_cancel_delete_image);
    } catch (err) {
      console.log(err.message);
    }

    //console.log("add do_cancel_image");
    negative_btn[i].addEventListener("click", do_cancel_delete_image, false);
    //negative_btn[i].myParam = i;

    /*
    negative_btn[i].addEventListener("click", () => {
      par_back_img[i].style.display = "none";
      dark_background[0].style.display = "none";
    });
    */
  }

  try {
    //console.log("delete do_delete_image");
    close_btn.removeEventListener("click", do_cancel_deledo_close_sending_imgte_image);
  } catch (err) {
    console.log(err.message);
  }

  close_btn.addEventListener("click", do_close_sending_img, false);

  /*
  close_btn.addEventListener("click", () => {
    send_imageOrVideo_modal.style.display = "none";
    dark_background[0].style.display = "none";
  });
  */
}
function do_delete_image_all(e) {
  dark_background = document.getElementsByClassName("dark_background");
  all_delete_modal = document.getElementById("all_delete_modal");

  all_delete_modal.style.display = "none";
  dark_background[0].style.display = "none";
  console.log("delete all images");
}
function do_cancel_delete_image_all(e) {
  dark_background = document.getElementsByClassName("dark_background");
  all_delete_modal = document.getElementById("all_delete_modal");

  all_delete_modal.style.display = "none";
  dark_background[0].style.display = "none";
  console.log("cancel_delete_image_all");
}
function prepare_cancel_delete_all_modal() {
  delete_btn = document.getElementsByClassName("delete_btn_all");
  negative_btn = document.getElementsByClassName("negative_btn_all");

  for (let i = 0; i < delete_btn.length; i++) {
    try {
      //console.log("delete do_delete_image_all ");
      delete_btn[i].removeEventListener("click", do_delete_image_all);
    } catch (err) {
      console.log(err.message);
    }

    //console.log("add do_delete_image_all");
    delete_btn[i].addEventListener("click", do_delete_image_all, false);
  }

  for (let i = 0; i < negative_btn.length; i++) {
    try {
      //console.log("delete do_cancel_delete_image_all");
      negative_btn[i].removeEventListener("click", do_cancel_delete_image_all);
    } catch (err) {
      console.log(err.message);
    }

    //console.log("add do_cancel_delete_image_all");
    negative_btn[i].addEventListener("click", do_cancel_delete_image_all, false);
  }
}

//scroll bar setting
let list_content = null;
let column_1 = null;
let column_2 = null;
function prepare_set_scroll() {
  column_1 = document.getElementsByClassName("column_1")[0];
  column_2 = document.getElementsByClassName("column_2")[0];
  list_content = document.getElementsByClassName("list_content")[0];

  if (typeof column_2 === "undefined" && typeof column_1 === "undefined") {
    document.getElementById("ul_in_list_content").classList.add("column_1");
    column_1 = document.getElementsByClassName("column_1")[0];
  }
  if (column_2 == null) {
    if (column_1.clientHeight > 656) {
      list_content.style.overflowY = "scroll";
    } else {
      list_content.style.overflowY = "hidden";
    }
  } else {
    if (image_list.length >= 3 || column_2.clientHeight > 656) {
      list_content.style.overflowY = "scroll";
    } else {
      list_content.style.overflowY = "hidden";
    }
  }
}

//all check button
let all_check_btn = document.getElementById("all_check");
let background = document.getElementsByClassName("background");
let selected_check_label = document.getElementsByClassName("selected_check_label");
function prepare_all_check_button() {
  all_check_btn.addEventListener("click", (e) => {
    all_check();
  });
}
function all_check() {
  ckeck_State();
  if (all_check_btn.checked) {
    //checked된 상태, 모든 버튼 checked

    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].checked = true;
      tobe_voting_images = {};
    }

    parent.parent.sunny_slides_sheets.get_contentUrl_for_all_slides(
      parent.parent.sunny.get_current_presentationID(),
      function (rst) {
        //console.log(tobe_voting_images);
        //console.log(rst);
        for (var i = 0; i < slide_info.length; i++) {
          for (j = 0; j < rst.length; j++) {
            if (slide_info[i].thumbImgUrl_only == rst[j].imageId) {
              slide_info[i].contentUrl = rst[j].contentUrl;
              continue;
            }
          }
        }

        for (var i = 0; i < slide_info.length; i++) {
          var voting_info = {
            thumbId: "",
            title: "",
            name: "",
            profileImage: "",
            category: "image",
            date: "",
            CreateTime: "",
            thumbImgUrl: "",
            thumbImgUrl_only: "",
            orgImgUrl: "",
            slideUrl: "",
            slideId: "",
          };
          voting_info.name = slide_info[i].name;
          voting_info.profileImage = slide_info[i].ProfileImage;
          voting_info.CreateTime = slide_info[i].CreateTime;
          voting_info.thumbImgUrl = slide_info[i].thumbImgUrl;
          voting_info.slideUrl = slide_info[i].contentUrl;
          voting_info.title = slide_info[i].title;
          voting_info.thumbImgUrl_only = slide_info[i].thumbImgUrl_only;

          tobe_voting_images[slide_info[i].thumbImgUrl_only] = voting_info;
        }
      }
    );
  } else {
    //unchecked된 상태, 모든 버튼 unchecked
    tobe_voting_images = {};
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].checked = false;
    }
  }
}
function ckeck_State() {
  if (all_check_btn.value === "unchecked") {
    all_check_btn.value = "checked";
  } else if (all_check_btn.value === "checked") {
    all_check_btn.value = "disabled";
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].checked = false;
      selected_check_label[i].style.display = "none";
    }
    all_check_btn.checked = false;
    all_check_btn.setAttribute("disabled", "disabled");
    background[0].style.zIndex = "200";
  } else {
    all_check_btn.value = "unchecked";
    for (let i = 0; i < selected_check_label.length; i++) {
      selected_check_label[i].style.display = "block";
    }
    all_check_btn.removeAttribute("disabled");
    background[0].style.zIndex = "-1";
  }
}

//목록,투표 중 어떤 탭이 선택되었는지 확인 후 드롭다운 옵션 보이기, 선택된 사진만 투표창에 보이기
let nav_link = document.getElementsByClassName("nav-link");
let tab_pane = document.getElementsByClassName("tab-pane");
let option_sort = document.getElementById("option_sort");
let option_vote = document.getElementById("option_vote");
let option_column = document.getElementById("option_column");
let option_filter = document.getElementById("option_filter");
var just_click_voting_tab = false;
function fn0_for_prepare_tab_check() {
  if (voting_state === "before") {
    //all체크 버튼 비활성화, 체크박스 숨기기
    all_check_btn.value = "checked";
    all_check();
    //정렬옵션,필터옵션 활성화
    option_sort.style.display = "block";
    option_filter.style.display = "block";
    option_column.style.display = "none";
    option_vote.style.display = "none";
    //1 column 으로 강제변경
    option_column.value = "column_1";
    option_column.onchange();
    //투표결과 안보이게 하기
    for (let i = 0; i < image_voting_number.length; i++) {
      image_voting_number[i].style.display = "none";
    }
    //전체 목록탭에 보이기

    if (current_sorting_order == "cvoting") {
      console.log("prev_sorting_order");
      current_sorting_order = prev_sorting_order;
      sortList();
    }
    //투표순 정렬
    option_sort.value = "vote";
    change_sorting();
    //전체보기
    option_filter.value = "view_all";
    filtering();
  } else {
    alert("현재 투표가 진행중입니다. 투표를 종료해 주세요.");
    just_click_voting_tab = true;
    nav_link[0].classList.toggle("active");
    nav_link[1].classList.toggle("active");
    tab_pane[0].classList.toggle("active");
    tab_pane[1].classList.toggle("active");
    just_click_voting_tab = false;
  }
}
function hide_select_image_modal() {
  dark_background[0].style.display = "none";
  document.getElementById("select_image_modal").style.display = "none";
}
function fn1_for_prepare_tab_check() {
  //체크가 안되어 있으면 모달창 띄우기
  if (none_checked()) {
    dark_background[0].style.display = "block";
    document.getElementById("select_image_modal").style.display = "block";
    nav_link[0].classList.toggle("active");
    nav_link[1].classList.toggle("active");
    tab_pane[0].classList.toggle("active");
    tab_pane[1].classList.toggle("active");

    //cancel_for_select_image_for_voting
  } else {
    // prev_sorting_order = current_sorting_order;
    // parent.parent.sunny_slides_sheets.get_contentUrl_for_all_slides(
    //   parent.parent.sunny.get_current_presentationID(),
    //   function (rst) {
    //     //console.log(tobe_voting_images);
    //     //console.log(rst);
    //     for (var i = 0; i < slide_info.length; i++) {
    //       for (j = 0; j < rst.length; j++) {
    //         if (slide_info[i].thumbImgUrl_only == rst[j].imageId) {
    //           slide_info[i].slideUrl = rst[j].contentUrl;
    //           continue;
    //         }
    //       }
    //     }

    option_sort.style.display = "none";
    option_filter.style.display = "none";
    option_column.style.display = "block";
    option_vote.style.display = "block";
    all_check_btn.checked = false;
    all_check_btn.setAttribute("disabled", "disabled"); //all체크 버튼 비활성화
    // 선택된 사진만 투표창에 보이기
    option_filter.value = "view_select";
    filtering();
    // if (!just_click_voting_tab) {
    //   reset_voting_attributes();
    //   parent.parent.sunny_voting.set_ready_voting();
    // }
    //   }
    // );
  }
}
function prepare_tab_check() {
  //목록탭이 선택되었을때 option 2가지 보이기
  try {
    nav_link[0].removeEventListener("click", fn0_for_prepare_tab_check);
  } catch (err) {}

  nav_link[0].addEventListener("click", fn0_for_prepare_tab_check);
  /*
  () => {
    //투표탭에서 나올때 투표진행중인지 확인
    if (voting_state === "before") {
      //정렬옵션,필터옵션 활성화
      option_sort.style.display = "block";
      option_filter.style.display = "block";
      option_column.style.display = "none";
      option_vote.style.display = "none";
      //all체크 버튼 활성화
      all_check_btn.removeAttribute("disabled");
      //1 column 으로 강제변경
      option_column.value = "column_1";
      option_column.onchange();
      //투표결과 안보이게 하기
      for (let i = 0; i < image_voting_number.length; i++) {
        image_voting_number[i].style.display = "none";
      }
      //전체 목록탭에 보이기
      option_filter.value = "view_all";
      filtering();
    } else {
      alert("현재 투표가 진행중입니다. 투표를 종료해 주세요.");
      nav_link[1].click();
    }
  });
  */
  //투표탭이 선택되었을때 option 2가지 보이기

  try {
    nav_link[1].removeEventListener("click", fn1_for_prepare_tab_check);
  } catch (err) {}
  nav_link[1].addEventListener("click", fn1_for_prepare_tab_check);

  /*() => {
    //체크가 안되어 있으면 모달창 띄우기
    if (none_checked()) {
      dark_background[0].style.display = "block";
      document.getElementById("select_image_modal").style.display = "block";
      nav_link[0].click();
    } else {
      option_sort.style.display = "none";
      option_filter.style.display = "none";
      option_column.style.display = "block";
      option_vote.style.display = "block";
      all_check_btn.setAttribute("disabled", "disabled"); //all체크 버튼 비활성화
      // 선택된 사진만 투표창에 보이기
      option_filter.value = "view_select";
      filtering();
    }
  });
  */
}
function none_checked() {
  for (let i = 0; i < selected_check_label.length; i++) {
    if (selected_check_label[i].checked) return false;
  }
  return true;
}

//투표시작, 끝내기
let image_voting_number = document.getElementsByClassName("image_voting_number");
let button_before_voting = document.getElementById("button_before_voting");
let button_after_voting = document.getElementById("button_after_voting");
let button_voting = document.getElementById("button_voting");

let voting_state = "before";
function is_voting_ready() {
  // for (let key in tobe_voting_images) {
  //   if (
  //     tobe_voting_images[key].slideUrl == "" ||
  //     tobe_voting_images[key].slideUrl == null ||
  //     typeof tobe_voting_images[key].slideUrl === "undefined"
  //   ) {
  //     console.log(tobe_voting_images[key].slideUrl);
  //     return false;
  //   }
  // }

  return true;
}

//수합상태
let collect = true;

//수합상태 설정
function setCollectState(param) {
  collect = param;
}

async function btnClick(btn1, btn2) {
  return new Promise((resolve) => {
    btn1.onclick = () => resolve(true);
    btn2.onclick = () => resolve(false);
  });
}

async function voting() {
  console.log(voting_state);
  if (voting_state == "before") {
    //수합중이면 투표시작전 수합이 중지된다는 메세지 띄우기
    if (collect) {
      dark_background[0].style.display = "block";
      document.getElementById("collecting_off_modal").style.display = "block";
      await btnClick(
        document.getElementsByClassName("voting_start")[0],
        document.getElementsByClassName("voting_cancel")[0]
      ).then((resolvedData) => {
        if (resolvedData) {
          setCollectState(false); // 확인버튼 누름(수합 off)
        }
        dark_background[0].style.display = "none";
        document.getElementById("collecting_off_modal").style.display = "none";
      });
      // 취소 버튼 누르면 빠져나오기(수합 상태유지)
      if (collect) {
        return;
      }
    }

    //투표시작하기
    console.log("before");
    if (!is_voting_ready()) {
      parent.parent.sunny_slides_sheets.get_contentUrl_for_all_slides(
        parent.parent.sunny.get_current_presentationID(),
        function (rst) {
          //console.log(tobe_voting_images);
          //console.log(rst);

          for (var i = 0; i < slide_info.length; i++) {
            for (j = 0; j < rst.length; j++) {
              if (slide_info[i].thumbImgUrl_only == rst[j].imageId) {
                slide_info[i].contentUrl = rst[j].contentUrl;
                continue;
              }
            }
          }

          for (let key in tobe_voting_images) {
            for (var i = 0; i < slide_info.length; i++) {
              //console.log(slide_info[i].thumbImgUrl_only,tobe_voting_images[key].thumbImgUrl_only);
              if (slide_info[i].thumbImgUrl_only == tobe_voting_images[key].thumbImgUrl_only) {
                tobe_voting_images[key] = slide_info[i];
                continue;
              }
            }
          }

          console.log(tobe_voting_images);
          voting();
        }
      );

      return;
    }
    voting_state = "voting";

    for (let i = 0; i < image_voting_number.length; i++) {
      selected_check_label[i].checked
        ? (image_voting_number[i].style.display = "block")
        : (image_voting_number[i].style.display = "none");
    }
    button_before_voting.style.display = "none";
    button_voting.style.display = "block";

    /*
    parent.parent.sunny_slides_sheets.get_contentUrl_for_all_slides(parent.parent.sunny.get_current_presentationID(),function(rst){

      console.log(tobe_voting_images);
      console.log(rst);
      for(var i = 0; i < slide_info.length; i++)
      {
        for(j = 0; j< rst.length;j++)
        {
          if(slide_info[i].thumbImgUrl_only == rst[j].imageId)
          {
            slide_info[i].thumb_contentUrl = rst[j].contentUrl;
            continue;
          }
        }
      }
      console.log(slide_info);

     
      
    });
    */

    parent.parent.sunny_voting.send_voting_data(tobe_voting_images);
  } else if (voting_state == "voting") {
    console.log("voting");
    //투표완료하기
    voting_state = "completed";
    button_voting.style.display = "none";
    button_after_voting.style.display = "block";
    change_sorting_vote(); //투표순 정렬
  } else {
    console.log("completed");
    //투표끝내기
    voting_state = "before";
    for (let i = 0; i < image_voting_number.length; i++) {
      image_voting_number[i].style.display = "none";
    }
    button_before_voting.style.display = "block";
    button_after_voting.style.display = "none";

    tobe_voting_images = {};
    parent.parent.sunny_voting.remove_voting_data();
    parent.parent.sunny_voting.end_voting();
    try {
      nav_link[0].click();
    } catch (err) {
      console.log(err.message);
    }
  }
}

// 투표 데이터 모으기
var tobe_voting_images = {};
function do_check_image(e) {
  if (e.checked) {
    var voting_info = {
      thumbId: "",
      title: "",
      name: "하나",
      profileImage: "./img/profile.jpg",
      category: "image",
      date: "",
      CreateTime: "",
      thumbImgUrl: "",
      thumbImgUrl_only: "",
      orgImgUrl: "",
      slideUrl: "",
      slideId: "",
    };
    var found = false;
    for (var i = 0; i < slide_info.length; i++) {
      if (slide_info[i].thumbImgUrl_only == e.name) {
        /*
        CreateTime: 20210720090256
        category: "image"
        date: "2021-07-07"
        name: "Interns Toslide"
        orgImgUrl: "https://drive.google.com/uc?&id=1-1gw95TyE6g5GUOTnb7AfSobIqqpNiUF"
        profileImage: "./img/profile.jpg"
        slideId: "SLIDES_API1977573856_0"
        slideUrl: "https://docs.google.com/presentation/d/1VJtDd-8lFsGEZfm1NuR_oK-K0v8BBJPh53Cw8EOW5uk/preview?rm=minimal&slide=id.SLIDES_API1977573856_0"
        thumbImgUrl: "https://drive.google.com/uc?&id=1AEqeo813aDiVGHdt4vdKHmtLhuYw0xUf"
        thumbImgUrl_only: "1AEqeo813aDiVGHdt4vdKHmtLhuYw0xUf"
        title: "sadsadas"
        */
        voting_info.name = slide_info[i].name;
        voting_info.profileImage = slide_info[i].ProfileImage;
        voting_info.CreateTime = slide_info[i].CreateTime;
        voting_info.thumbImgUrl = slide_info[i].thumbImgUrl;
        voting_info.slideUrl = slide_info[i].contentUrl;
        voting_info.thumbImgUrl_only = slide_info[i].thumbImgUrl_only;
        voting_info.title = slide_info[i].title;
      }
    }
    //console.log(e.name,slide_info[i].thumbImgUrl_only);

    tobe_voting_images[e.name] = voting_info;
  } else {
    delete tobe_voting_images[e.name];
  }
  //console.log(e.name);
  //console.log(tobe_voting_images);
}

//중복투표 활성화, 비활성화
let button_duplicable_voting = document.getElementById("button_duplicable_voting");
let button_duplicable_voting_active = document.getElementById("button_duplicable_voting_active");
let duplicating_active = false;
function duplicating() {
  if (duplicating_active) {
    duplicating_active = false;
    button_duplicable_voting.style.display = "block";
    button_duplicable_voting_active.style.display = "none";
  } else {
    duplicating_active = true;
    button_duplicable_voting.style.display = "none";
    button_duplicable_voting_active.style.display = "block";
  }
}

//select 옵션
function prepare_option_filter() {
  option_filter = document.getElementById("option_filter");
  option_filter.addEventListener("change", () => {
    filtering();
  });
}
function filtering() {
  image_list = document.getElementsByClassName("image_list");

  if (option_filter.value === "view_video") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (slide_info[i].category !== "video") {
        image_list[i].style.display = "none";
      }
    }
  } else if (option_filter.value === "view_image") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (slide_info[i].category !== "image") {
        image_list[i].style.display = "none";
      }
    }
  } else if (option_filter.value === "view_select") {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
      if (!selected_check_label[i].checked) {
        image_list[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < selected_check_label.length; i++) {
      image_list[i].style.display = "block";
    }
  }
  prepare_set_scroll();
}

function change_column(param) {
  const ul_in_list_content = document.getElementById("ul_in_list_content");
  if (param.value === "column_2") {
    ul_in_list_content.classList.remove("column_1");
    ul_in_list_content.classList.add("column_2");
  } else {
    ul_in_list_content.classList.add("column_1");
    ul_in_list_content.classList.remove("column_2");
  }
  prepare_set_scroll();
}

function do_after_adding_all_images() {
  //console.log("do_after_adding_all_images 111");
  prepare_show_outline();
  prepare_open_delete_all_modal();
  prepare_open_delete_modal();
  prepare_cancel_delete_modal();
  prepare_cancel_delete_all_modal();
  prepare_set_scroll();
  prepare_all_check_button();
  prepare_tab_check();
  prepare_open_send_modal();
  prepare_option_filter();
  if (slide_info.length >= 3) {
    try {
      list_content = document.getElementsByClassName("list_content")[0];
      list_content.style.overflowY = "scroll";
    } catch (err) {
      console.log(err);
    }
  }
}
do_after_adding_all_images();

// window.onload = function(){
//   var old_version = document.getElementById('version').innerHTML;
//   check_version_v3("../../js/version_v3.txt",old_version,"image",function(rst){
//     if(rst =="ignore")
//       console.log(" image 버전 업그레이드 해주세요");
//     else if(rst=="fail")
//     {
//       location.reload();
//     }
//   });

// }
