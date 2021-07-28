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

      //modal_input placeholder설정
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.classList.add("modal_description");
      const placeholder = child_Node.getAttribute("placeholder");
      input.setAttribute("placeholder", placeholder);

      //modal_input 추가
      child_Node.appendChild(input);

      //modal_input fontSize 설정
      const fontSize = child_Node.getAttribute("fontSize");
      child_Node.children[0].style.fontSize = `${fontSize}px`;
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

      //흰색 negative버튼 글자 설정
      let divNega = document.createElement("div");
      divNega.classList.add("negative");
      const negaTitle = child_Node.getAttribute("negativeTitle");
      divNega.textContent = negaTitle;

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

      //fontSize, Weight 설정
      const fontSize = child_Node.getAttribute("fontSize");
      child_Node.style.fontSize = `${fontSize}px`;
      const fontWeight = child_Node.getAttribute("fontWeight");
      child_Node.style.fontWeight = `${fontWeight}`;
    }
  }
}
