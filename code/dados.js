"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{

    window.addEventListener("message", messageHandler);
    var main;
    var start = document.getElementById("start");
    var playerName = document.getElementById("inputBox");
    var backBtn = document.getElementById("backButton");

    start.addEventListener("click",buttonHandler);
    backBtn.addEventListener("click",buttonHandler);


    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case start:
                if(playerName.value.length == 0){
                    console.log("Caixa de texto vazia");
                }
                else{
                    main.postMessage(playerName.value,"*"); break;
                }
                /*main.postMessage("play","*");*/ break;
            case backBtn: 
                main.postMessage("back","*"); break;
        }
    }

    function messageHandler(ev) {
        main = ev.source
        console.log(ev.data);
	}

}