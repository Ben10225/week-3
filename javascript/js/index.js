let url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
let data1 = []

const address = fetch(url, {}).then( (res) =>{
  return res.json();
}).then((data)=>{
  
    // console.log(i.stitle, `https${i.file.slice(5).split("https")[0]}`)
    data = data.result.results
    // console.log(data)
    for(let i=0;i<2;i++){
      // 容器
      let proContainer = document.querySelector(".promotionOutter");
      // 先建好 外包div
      let newPromotion = document.createElement('div');
      newPromotion.className= "promotion";
      proContainer.appendChild(newPromotion);
      // 篩選用 要先再選一次外層 nth-child 
      let promotionIn = document.querySelector(`.promotion:nth-child(${i+1})`);
      // 增加內層的 div
      let proImage = document.createElement('div');
      proImage.className = "proImage";
      proImage.style.cssText = `background-image: url('https${data[i].file.slice(5).split("https")[0]}')`;
      promotionIn.appendChild(proImage);
      let proText = document.createElement('div');
      let textNode = document.createTextNode(`${data[i].stitle}`);
      proText.appendChild(textNode);
      proText.className = "proText";
      promotionIn.appendChild(proText);
    }
    for(let i=0;i<8;i++){
      let contentContainer = document.querySelector(".content");
      let conBox = document.createElement('div');
      conBox.className= "conBox";
      contentContainer.appendChild(conBox);

      let conboxIn = document.querySelector(`.conBox:nth-child(${i+1})`);
      // img
      let conImage = document.createElement('div');
      conImage.className = "conImage";
      conImage.style.cssText = `background-image: url('https${data[i+2].file.slice(5).split("https")[0]}')`;
      conboxIn.appendChild(conImage);
      // txt
      let contxtBox = document.createElement('div');
      contxtBox.className= "contxtBox";
      conboxIn.appendChild(contxtBox);

      let contxtboxIn = document.querySelector(`.conBox:nth-child(${i+1}) .contxtBox`);
      let conTxt = document.createElement('div');
      conTxt.className = "conTxt";
      let textNode = document.createTextNode(`${data[i+2].stitle}`);
      conTxt.appendChild(textNode);
      if((`${data[i+2].stitle}`).length >= 12){
        conTxt.style.cssText = `font-size: 16px;`;
      }
      contxtboxIn.appendChild(conTxt);
    }

    let btn = document.querySelector("button");
    let ct = 0

    // 點擊觸發
    btn.addEventListener("click", function(){
      ct += 1;
      if(ct < 7){
        for(let i=0;i<8;i++){
          let contentContainer = document.querySelector(".content");
          let conBox = document.createElement('div');
          conBox.className= "conBox";
          contentContainer.appendChild(conBox);
    
          let conboxIn = document.querySelector(`.conBox:nth-child(${i+1+ct*8})`);
          // img
          let conImage = document.createElement('div');
          conImage.className = "conImage";
          conImage.style.cssText = `background-image: url('https${data[i+2+ct*8].file.slice(5).split("https")[0]}')`;
          conboxIn.appendChild(conImage);
          // txt
          let contxtBox = document.createElement('div');
          contxtBox.className= "contxtBox";
          conboxIn.appendChild(contxtBox);
    
          let contxtboxIn = document.querySelector(`.conBox:nth-child(${i+1+ct*8}) .contxtBox`);
          let conTxt = document.createElement('div');
          conTxt.className = "conTxt";
          let textNode = document.createTextNode(`${data[i+2+ct*8].stitle}`);
          conTxt.appendChild(textNode);
          if((`${data[i+2+ct*8].stitle}`).length >= 12){
            conTxt.style.cssText = `font-size: 16px;`;
          }
          contxtboxIn.appendChild(conTxt);
        }
        if(ct == 6){
          // 移除 DOM
          let footer  = document.querySelector("footer");
          footer.style.cssText = `height: 30px;`
          let removeNode = document.querySelector("button");
          footer.removeChild(removeNode);
        }
      }
    });

}); 
