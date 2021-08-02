function create_div_for_one_button(img1, img2) {
  document.getElementById("darkBg").style.display = "block";
  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "block";

  var div = document.createElement("div");

  div.innerHTML =
    `
  <div class="modal_block" id="modal_one_button" width="311" height="200" radius="26">
    <div class="modal_image" src="` +
    img1 +
    `" width="68" height="68"></div>
    <div class="modal_image" src="` +
    img2 +
    `" width="311" height="51"></div>
    <div class="modal_button" type="1" positiveTitle="확인" fontSize="14" fontWeight="600"></div>
  </div>
  `;

  document.getElementById("modal_container").appendChild(div);
}
function create_div_for_yes_no(w, h, msg, posTitle, negTitle, img1) {
  document.getElementById("darkBg").style.display = "block";
  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "block";

  var div = document.createElement("div");

  div.innerHTML =
    `
  <div class="modal_block" id="modal_yes_no" width="` +
    w +
    `" height="` +
    h +
    `" radius="26">
    <div class="modal_image" src="` +
    img1 +
    `" width="74" height="74"></div>
    <div class="modal_string" fontSize="14" fontWeight="bold">` +
    msg +
    `</div>
    <div class="modal_button" type="3" positiveTitle="` +
    posTitle +
    `" negativeTitle="` +
    negTitle +
    `" fontSize="12" fontWeight="bold"></div>
  </div>
  `;

  document.getElementById("modal_container").appendChild(div);
}
function create_div_for_one_input(inputTitle, imgSrc, placeholder, w, h) {
  document.getElementById("darkBg").style.display = "block";

  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "block";
  var div = document.createElement("div");

  div.innerHTML = `
    <div class="modal_block" id="modal_one_input" width="${w}" height="${h}" radius="30">

    <div class="modal_image" src="${imgSrc}" width="41" height="56"
      title="coordinator@gmail.com_20200709" titleSize="16" titleWeight="500"></div>
    
    <div class="modal_input" fontSize="12" fontWeight="bold">
      <div class="input">
        <label for="input_1">${inputTitle}</label>
        <input type="text" id="general_input1" autocomplete="off" placeholder="${placeholder}">
      </div>
      
    </div>
    
    <div class="modal_button" type="3" positiveTitle="입력완료" negativeTitle="취소" fontSize="14" fontWeight="bold"
      height="44" radius="22" width="198"></div>
  </div>
  `;
  document.getElementById("modal_container").appendChild(div);
}

function create_div_for_two_inputs(
  inputTitle,
  imgSrc,
  inputTitle1,
  placeholder1,
  inputTitle2,
  placeholder2,
  w,
  h
) {
  document.getElementById("darkBg").style.display = "block";

  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "block";
  var div = document.createElement("div");

  div.innerHTML = `
    <div class="modal_block" id="modal_two_inputs" width="${w}" height="${h}" radius="30">

    <div class="modal_image" src="${imgSrc}" width="41" height="56"
      title="${inputTitle}" titleSize="16" titleWeight="500" id="general_modal_title"></div>
    
    <div class="modal_input" fontSize="12" fontWeight="bold">
      <div class="input">
        <label for="input_1" id="general_input1_label">${inputTitle1}</label>
        <input type="text" id="general_input1" autocomplete="off" placeholder="${placeholder1}">
      </div>
      <div class="input">
        <label for="input_2" id="general_input2_label">${inputTitle2}</label>
        <input type="text" id="general_input2" autocomplete="off" placeholder="${placeholder2}">
      </div>
    </div>
    
    <div class="modal_button" type="3" positiveTitle="입력완료" negativeTitle="취소" fontSize="14" fontWeight="bold"
      height="44" radius="22" width="198"></div>
  </div>
  
  <div  class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
    <div class="modal_block" id="modal_alert" width="311" height="197" radius="26">
      <div class="btn-close" data-bs-dismiss="toast" onclick="timerStop()"></div>
      <div class="modal_image" src="./img/i_icon.png" width="74" height="74"></div>
      <div class="modal_string" fontSize="16" fontWeight="bold" id="timerText"></div>
    </div>
  </div>
  `;

  document.getElementById("modal_container").appendChild(div);
}

function create_div_for_alert(msg, width, height) {
  document.getElementById("darkBg").style.display = "block";

  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "block";
  var div = document.createElement("div");

  div.innerHTML = `
  <div class="modal_block" id="modal_alert" width="${width}" height="${height}" radius="26">
    <div class="modal_expel"></div>
    <div class="modal_image" src="./i_icon.png" width="74" height="74"></div>
    <div class="modal_string" fontSize="16" fontWeight="bold">${msg}</div>
  </div>
  `;

  document.getElementById("modal_container").appendChild(div);
}

let timer = null;
let alerting = null;
let toastList = null;

function alertShow(msg) {
  if (alerting == true) {
    return;
  }
  alerting = true;
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  document.getElementById("timerText").innerHTML = msg;
  toastList[0].show();
  timerStart();
}

function timerStart() {
  // var count = 5;
  // timer = setInterval(() => {
  //   document.getElementById("timerHeader").innerHTML = `${count - 1}초후에 사라집니다`;
  //   count--;
  //   if (count == 0) {
  //     timerStop();
  //   }
  // }, 1000);
  timer = setTimeout(() => {
    timerStop();
  }, 5000);
}

function timerStop() {
  toastList[0].hide();
  clearInterval(timer);
  // document.getElementById("timerHeader").innerHTML = "";
  alerting = false;
}

function create_a_modal(pfn = null, nfn = null) {
  let modal_block = document.getElementsByClassName("modal_block");
  let modal_length = modal_block.length;

  for (let i = 0; i < modal_length; i++) {
    const id = modal_block[i].getAttribute("id");
    const element = document.getElementById(id);

    const width = element.getAttribute("width");
    element.style.width = `${width}px`;
    const height = element.getAttribute("height");
    element.style.height = `${height}px`;
    const radius = element.getAttribute("radius");
    element.style.borderRadius = `${radius}px`;

    for (let j = 0; j < element.children.length; j++) {
      let child_Node = element.children[j];
      if (child_Node.className == "modal_image") {
        //modal_image 설정

        //이미지 src, width, height 설정
        let img = document.createElement("img");
        const src = child_Node.getAttribute("src");
        src ? img.setAttribute("src", src) : null;
        const imgWidth = child_Node.getAttribute("width");
        img.setAttribute("width", imgWidth);
        const imgHeight = child_Node.getAttribute("height");
        img.setAttribute("height", imgHeight);

        //타이틀 설정
        let div = document.createElement("div");
        div.classList.add("file_name");
        const title = child_Node.getAttribute("title");
        div.textContent = title;

        //이미지,타이틀 추가
        child_Node.appendChild(img);
        child_Node.appendChild(div);

        //타이틀 fontSize, fontWeight 설정
        const titleSize = child_Node.getAttribute("titleSize");
        child_Node.children[1].style.fontSize = `${titleSize}px`;
        const titleWeight = child_Node.getAttribute("titleWeight");
        child_Node.children[1].style.fontWeight = `${titleWeight}`;
      } else if (child_Node.className == "modal_input") {
        //modal_input 설정

        //modal_input fontSize 설정
        const fontSize = child_Node.getAttribute("fontSize");
        child_Node.style.fontSize = `${fontSize}px`;
        const fontWeight = child_Node.getAttribute("fontWeight");
        child_Node.style.fontWeight = `${fontWeight}`;
      } else if (child_Node.className == "modal_expel") {
        //modal_expel 설정
        child_Node.onclick = just_close_modal;
      } else if (child_Node.className == "modal_string") {
        //modal_string 설정
        const fontSize = child_Node.getAttribute("fontSize");
        child_Node.style.fontSize = `${fontSize}px`;
        const fontWeight = child_Node.getAttribute("fontWeight");
        child_Node.style.fontWeight = `${fontWeight}`;
      } else if (child_Node.className == "modal_button") {
        //modal_button 설정

        //주황색 positive버튼 글자 설정
        let divPos = document.createElement("div");
        divPos.classList.add("positive");
        const posTitle = child_Node.getAttribute("positiveTitle");
        divPos.textContent = posTitle;
        if (pfn != null) divPos.onclick = pfn;
        else divPos.onclick = just_close_modal;

        //흰색 negative버튼 글자 설정
        let divNega = document.createElement("div");
        divNega.classList.add("negative");
        const negaTitle = child_Node.getAttribute("negativeTitle");
        divNega.textContent = negaTitle;

        if (nfn != null) divNega.onclick = nfn;
        else divNega.onclick = just_close_modal;

        //type 이 1이면 positive만, 2이면 negative만, 3이면 둘다 버튼 나오도록 설정
        if (child_Node.getAttribute("type") == "1") {
          child_Node.classList.add("modal_one_button");
          child_Node.appendChild(divPos);
        } else if (child_Node.getAttribute("type") == "2") {
          child_Node.classList.add("modal_one_button");
          child_Node.appendChild(divNega);
        } else if (child_Node.getAttribute("type") == "3") {
          child_Node.classList.add("modal_two_button");
          child_Node.appendChild(divPos);
          child_Node.appendChild(divNega);
        }

        //fontSize, Weight, width, height, radius 설정
        const fontSize = child_Node.getAttribute("fontSize");
        child_Node.style.fontSize = `${fontSize}px`;
        const fontWeight = child_Node.getAttribute("fontWeight");
        child_Node.style.fontWeight = `${fontWeight}`;
        const width = child_Node.getAttribute("width");
        const height = child_Node.getAttribute("height");
        const radius = child_Node.getAttribute("radius");
        for (let k = 0; k < child_Node.children.length; k++) {
          child_Node.children[k].style.width = `${width}px`;
          child_Node.children[k].style.height = `${height}px`;
          child_Node.children[k].style.borderRadius = `${radius}px`;
        }
      }
    }
  }
}

function just_close_modal() {
  if (document.getElementsByClassName("modal_block")[0].getAttribute("id") == "modal_two_inputs") {
    timerStop(); //two inputs 모달일 경우 timer stop해주어야함
  }
  document.getElementById("darkBg").style.display = "none";
  document.getElementById("modal_container").innerHTML = "";
  document.getElementById("modal_container").style.display = "none";
}
