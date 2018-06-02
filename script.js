"use strict";

document.addEventListener("DOMContentLoaded", startScript);

let sekunder = 1;
let tilTi = 1;
let antalKunder = 0;

function startScript() {
    console.log("Script klar")
    counter();
}

function counter() {
    // let timer = document.querySelector("#timer");
    // let timer2 = document.querySelector("#timer2");
    // if (sekunder != 1) {
    //     timer.innerHTML = `Der er nu gået ${sekunder} sekunder`
    //     timer2.innerHTML = `Refresh siden om: ${tilTi} sekunder`
    // } else {
    //     timer.innerHTML = `Der er nu gået ${sekunder} sekund`
    //     timer2.innerHTML = `Refresh siden om: ${tilTi} sekund`
    // }
    if (tilTi == 1) {
        applyItems()
        harold();
    }
    sekunder++;
    if (tilTi < 10) {
        tilTi++;
    } else {
        tilTi = 1;
    }

    setTimeout(function () {
        counter()
    }, 1000)
    return {
        sekunder,
        tilTi
    }
}

function applyItems() {
    let x = Promise.resolve(getJson())

    x.then(function (parm) {
        //console.log(parm)
        document.querySelector("#inQueue").innerHTML = `Der er nu  ${parm.inQueue} kunder der venter på øl`;
        console.log("Antal kunder", parm.inQueue)
        antalKunder = parm.inQueue;

        if (document.querySelector("#customers").children.length) {
        }
        let i;
        let list = document.querySelector("#customers");
        let list2 = document.querySelector("#bar")
        for (i = 0; antalKunder > i; i++) {

            //console.log("Antal div'er:", document.querySelector("#customers").children.length,"i:", i)
            if (i == 0) {
                // Get the element with id="customers"
                // As long as the element has a child node, remove it
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
                while (list2.hasChildNodes()) {
                    list2.removeChild(list2.firstChild);
                }
                addDivs(i);
            } else if (document.querySelector("#customers").children.length != i) {
                // Get the element with id="customers"
                // As long as the element has a child node, remove it
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
                while (list2.hasChildNodes()) {
                    list2.removeChild(list2.firstChild);
                }
                addDivs(i);
            } else {
                addDivs(i);
            }
        }
    })
}

function addDivs(parm) {
    document.querySelector("#customers").appendChild(document.createElement("div"));
    document.querySelector("#bar").appendChild(document.createElement("div"));
    setTimeout(function () {
        document.querySelector("#customers").children[parm].style.transform = `translate(${Math.random()*50}vw, ${Math.random()*30}vh)`;
        document.querySelector("#bar").children[parm].style.left = `${Math.random()*100}%`;
        document.querySelector("#bar").children[parm].style.bottom = `${Math.random()*1}%`;
    }, 10)
}

async function getJson() {
    let jsonData = await fetch("https://kea-alt-del.dk/kata-distortion/");
    let json = await jsonData.json();
    //console.log(inQueue)
    return json;
}


document.querySelector("#bar").addEventListener("click", function(e){
    console.log(e.target)
    if (e.target.classList.contains("active") != true){
    if (e.target.id != "bar"){
        //e.target.style.display = "none";
        document.querySelector("#customers").removeChild(document.querySelector("#customers").children[0])
        e.target.style.backgroundImage = "url('beer_empty.png')";
        e.target.style.zIndex = "1"
        e.target.classList.add("active");
        let antalKunderMinus = antalKunder-1;
        document.querySelector("#inQueue").innerHTML = `Der er nu  ${antalKunderMinus} kunder der venter på øl`;
        antalKunder--;
    }
    harold(antalKunder);
}


})

function harold(parm){
    if(parm == 0){
        document.querySelector("#harold").style.transform = "rotateZ(-15deg)"
    } else {
        document.querySelector("#harold").style.transform = "rotateZ(-50deg)"
    }
}