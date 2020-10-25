"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
    window.addEventListener("message", messageHandler);
    var main;
    var backBtn = document.getElementById("backButton");
    var musicDown = document.getElementById("musicDown");
    var musicUp = document.getElementById("musicUp");
    var musicImg = document.getElementById("bars1");

    backBtn.addEventListener("click",buttonHandler);
    musicDown.addEventListener("click",buttonHandler);
    musicUp.addEventListener("click",buttonHandler);

    var volume;

    function messageHandler(ev) {
        main = ev.source
        volume = parseInt(ev.data);
        console.log(volume);
        musicImg.src = "../resources/images/volume" + volume +".png";
	}
    

    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case backBtn:
                main.postMessage("back","*"); break;

            case musicUp:
                main.postMessage("musicUp","*");
                if(volume < 10){
                    volume += 2;
                }
                if(volume == 10){
                    musicUp.disabled = true;
                }
                else{
                    musicDown.disabled = false;
                    musicUp.disabled = false;
                }
                musicImg.src = "../resources/images/volume" + volume +".png";
                main.postMessage("musicUp","*");
                break;

            case musicDown:
                if(volume > 0){
                    volume -= 2;
                }
                if(volume == 0){
                    musicDown.disabled = true;
                }
                else{
                    musicUp.disabled = false;
                    musicDown.disabled = false;
                }
                musicImg.src = "../resources/images/volume" + volume +".png";
                main.postMessage("musicDown","*");
                break;
        }
    }

}