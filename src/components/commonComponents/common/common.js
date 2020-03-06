export const openBigImgJump = function(img) {
  let newTab = window.open();
  let styleImg = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
  `;
  let stylebody = `
    width: 100%;
    height: 100%;
    margin: 0px; 
    background: #0e0e0e;
  `;
  newTab.document.body.style.margin = 0;
  newTab.document.title = '图片预览';
  newTab.document.body.innerHTML = `
    <div style="${stylebody}">
      <img
        src="${img}" 
        style="${styleImg}"/>
    </div>
  `;
};
