function summary(d){
  let s = "";
  if (d.diameter)
    s += d.diameter;
  else if (d.width)
    s += d.width;
  else
    return "";
    
  if (d.height)
    s += "x" + d.height;
  else if (d.length)
    s += "x" + d.length;
  else 
    return "";
    
  return s;
}

function property(name, value, icon = './icons/defaultIcon.png'){
  if(value)
    return `
<div class="property"><div><img style="background-image:url('${icon}')"><p>${name}: </p></div><span>${value}</span></div>`;
  else
    return ``;
}

function imageBox(src){
  return `
<div class="image-box">
  <img src="${src}">
  <br>
  <div class = "image-buttons">
    <button>O</button>
    <button>X</button>
    <button>X</button>
    <button>X</button>
    <button>X</button>
  </div>
</div>`;
}

function result(title, images, dimentions, link){
  let imgElems = "";
  for (let i = 0; i < images.length; i++){
    imgElems += imageBox(images[i]);
  }
  let propertyElems =
    property("Диаметр", dimentions.diameter, './icons/diameter.png') +
    property("Ширина", dimentions.width, './icons/width.png') +
    property("Длина", dimentions.length, './icons/length.png') +
    property("Высота", dimentions.height, './icons/height.png') +
    property("Глубина", dimentions.depth, './icons/depth.png');
  let summaryTxt = summary(dimentions);
  return `
<a class="result-title-link" href="${link}">${title}</a>
<div class=result-flex>
  <div class="properties-box">
    <p class="summary">${summaryTxt}</p>
    ${propertyElems}
  </div>
  ${imgElems}
</div>`;
}

function resultPlaceholder(name = ""){
  return `
<p class="result-title">UwU</p>
<div class=result-flex>
  <div class="properties-box">
    <p class="summary">Здесь могла быть ваша реклама...</p>
    
  </div>
</div>
`
}

export {result, resultPlaceholder};