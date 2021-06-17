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

function property(name, value){
  if(value)
    return `
<div class="property"><div><img><p>${name}: </p></div><span>${value}</span></div>`;
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

function result(images, dimentions){
  let imgElems = "";
  for (let i = 0; i < images.length; i++){
    imgElems += imageBox(images[i]);
  }
  let propertyElems =
    property("Диаметр", dimentions.diameter) +
    property("Ширина", dimentions.width) +
    property("Длина", dimentions.length) +
    property("Высота", dimentions.height) +
    property("Глубина", dimentions.depth);
  let summaryTxt = summary(dimentions);
  return `
<div class="properties-box">
  <p class="summary">${summaryTxt}</p>
  ${propertyElems}
</div>
  ${imgElems}`;
}

function resultPlaceholder(name = ""){
  return `
<div class="properties-box">
  <p class="summary">Загрузка...</p>
  
</div>
`
}

export {result, resultPlaceholder};