"use strict"
import {result, resultPlaceholder} from "./templates.js";

async function fetchInfo(url){
  let body;
  body = await fetch("https://void-case.ru:600/api/lips?link=" + url);
  if (body.status != 200) //Implement error displaying?
    return;
  let productInfo = await body.json();
  return productInfo;
}

function findLinks(str){
  let urlRegex = new RegExp("https?://[^ \n]*/", 'g');
  let links = [];
  let link;
  while (link = urlRegex.exec(str), link != null){
    links.push(link[0]);
  }
  return links;
}

async function processLink(url){
  // This adds a placeholder to preserve the order of results
  let index = results.children.length;
  let resultRef = document.createElement('div');
  resultRef.classList.add("result");
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
  processLink("https://donplafon.ru/products/podvesnoy_svetilnik_slv_aixlight_r_long_159081/");
  processLink("https://donplafon.ru/products/podvesnaya_lyustra_ilamp_miami_p2337-6_nic/");
  processLink("https://donplafon.ru/products/nastennyj_svetilnik_ilamp_panorama_10090_1w_bk/");
  processLink("https://donplafon.ru/products/ulichnyy_svetilnik_arte_lamp_pegasus_a3151pa_1bn/");
  processLink("https://donplafon.ru/products/ulichnyy_nastennyy_svetilnik_favourite_hunt_2081_1w/");
  processLink("https://donplafon.ru/products/rozetka_legrand_valena_mekh_in_matic_16a_250v_s_z_bezvintovoy_zazhim_753021/");
  processLink("https://donplafon.ru/products/stabilizator_napryazheniya_07383_uniel_5000va_rs-1_5000ws/");
  processLink("https://donplafon.ru/products/prozhektor_svetodiodnyy_novotech_armin_30w_357528/");
}

evaluateButton.addEventListener("click", ()=>{
  let links = findLinks(linksInput.value);
  links.forEach(processLink);
});

test();