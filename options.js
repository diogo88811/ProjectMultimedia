"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{

    var backBtn = document.getElementById("backButton");
    var musicDown = document.getElementById("musicDown");
    var musicUp = document.getElementById("musicUp");
    var soundDown = document.getElementById("soundDown");
    var soundUp = document.getElementById("soundUp");
    var musicImg = document.getElementById("bars1");
    var soundImg = document.getElementById("bars2");

    backBtn.addEventListener("click",buttonHandler);
    musicDown.addEventListener("click",buttonHandler);
    musicUp.addEventListener("click",buttonHandler);
    soundDown.addEventListener("click",buttonHandler);
    soundUp.addEventListener("click",buttonHandler);

    var volume = 8;
    

    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case backBtn:
                parent.postMessage("back","*"); break;

            case musicUp:
                parent.postMessage("musicUp","*");
                volume += 2;
                if(volume >= 10){
                    musicUp.disabled = true;
                    musicUp.style.opacity = 0.3;
                    console.log(volume)
                }
                else{
                    musicDown.disabled = false;
                    musicDown.style.opacity = 1;
                    console.log(volume)
                }
                musicImg.src = "../resources/images/volume" + volume +".png";
                break;

            case musicDown:
                parent.postMessage("musicDown","*");
                volume -= 2;
                if(volume <= 0){
                    musicDown.disabled = true;
                    musicDown.style.opacity = 0.3;
                    console.log(volume)
                }
                else{
                    musicUp.disabled = false;
                    musicUp.style.opacity = 1;
                    console.log(volume)
                } 
                musicImg.src = "../resources/images/volume" + volume +".png";
                break;

            case soundUp:
                parent.postMessage("soundUp","*"); break;

            case soundDown:
                parent.postMessage("soundDown","*"); break;
        }
    }

}