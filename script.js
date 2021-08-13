'use strict'
import {result, resultPlaceholder} from './templates.js';

async function fetchInfo(url){
  let body;
  body = await fetch('https://void-case.ru:600/api/lips?link=' + url);
  if (body.status != 200) //Implement error displaying?
    return;
  let productInfo = await body.json();
  return productInfo;
}

function formatInput(str){
  let lines = str.split('\n');
  let numberStartRegex = RegExp('^\d* -');
  let displayI = 1;
  for (let i = 0; i < lines.length; i++){
    if (numberStartRegex.test(lines[i])){
      displayI = parseInt(lines[i][0]) + 1;
      continue;
    }
    if (!findLink(lines[i]))
      continue;
    lines[i] = displayI + ' - ' + lines[i];
    displayI += 1;
  }
  return lines;
}

function findLink(str){
  let urlRegex = new RegExp('https?://[^ \n]*/', 'g');
  let link;
  link = urlRegex.exec(str)
  if (link != null){
    return link[0];
  }
  return null;
}

async function processLink(url){
  if (!url) return;
  // This adds a placeholder to preserve the order of results
  let index = results.children.length;
  let resultRef = document.createElement('div');
  resultRef.classList.add('result');
  resultRef.innerHTML = resultPlaceholder();
  results.appendChild(resultRef);
  
  let info = await fetchInfo(url);
  results.children[index].innerHTML = result(
    (index + 1) + ' - "' +info.name + '"',
    info.images,
    {
      diameter: info.dimentions.diameter,
      width: info.dimentions.width,
      length: info.dimentions.length,
      height: info.dimentions.height,
      depth: info.dimentions.depth
    },
    url
  );
}

function test(){
  linksInput.value = `https://donplafon.ru/products/podvesnoj_svetilnik_arlight_elementa_032777/
https://donplafon.ru/products/podvesnoy_svetilnik_slv_aixlight_r_long_159081/
https://donplafon.ru/products/spot_markslojd_boston_082091/
https://donplafon.ru/products/spot_arte_lamp_73_a9154ap_1wh/`;

  
  processLink('https://donplafon.ru/products/podvesnoy_svetilnik_slv_aixlight_r_long_159081/');
  processLink('https://donplafon.ru/products/podvesnaya_lyustra_ilamp_miami_p2337-6_nic/');
  processLink('https://donplafon.ru/products/nastennyj_svetilnik_ilamp_panorama_10090_1w_bk/');
  processLink('https://donplafon.ru/products/ulichnyy_svetilnik_arte_lamp_pegasus_a3151pa_1bn/');
  processLink('https://donplafon.ru/products/ulichnyy_nastennyy_svetilnik_favourite_hunt_2081_1w/');
  processLink('https://donplafon.ru/products/rozetka_legrand_valena_mekh_in_matic_16a_250v_s_z_bezvintovoy_zazhim_753021/');
  processLink('https://donplafon.ru/products/stabilizator_napryazheniya_07383_uniel_5000va_rs-1_5000ws/');
  processLink('https://donplafon.ru/products/prozhektor_svetodiodnyy_novotech_armin_30w_357528/');
  
}

evaluateButton.addEventListener('click', ()=>{
  //todo: add an option to make this not happen
  results.innerHTML = '';
  let lines = formatInput(linksInput.value);
    linksInput.value = '';
    for (let i = 0; i < lines.length; i++){
      linksInput.value += lines[i] + '\n';
      processLink(findLink(lines[i]))
    }
});