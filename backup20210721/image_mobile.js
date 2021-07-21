function prepare_set_mobile_screen() {
  if (is_mobile()) {
    const tri = document.getElementsByClassName("tri")[0];
    const image_container = document.getElementsByClassName("image_container")[0];
    const list_content = document.getElementsByClassName("list_content")[0];
    const bottom_img = document.querySelectorAll(".bottom_content img");

    for (let i = 0; i < bottom_img.length; i++) {
      bottom_img[i].style.border = "1px solid #dadce0";
    }
    tri.style.display = "none"; //모바일이면 imageTab 맨위에 삼각형(화살표) 필요없음
    image_container.style.borderRadius = "0"; // 모바일이면 borderRadius 필요없음

    window.addEventListener("message", (e) => {
      console.log(e.data);
      let screen_height = e.data - 199; //iframe 외부에 브라우저 높이 - 상단바,하단바 높이
      let gap = 823 - screen_height;
      image_container.style.height = `${823 - gap}px`; // 기존높이 823px
      list_content.style.height = `${673 - gap}px`; // 기존높이 673px
    });
  }
}

function is_mobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }

  if (typeof window.orientation !== "undefined") {
    return true;
  }

  var iOSios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (iOSios) return true;

  return false;
}
