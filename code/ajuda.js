"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
    window.addEventListener("message", messageHandler);
    var backBtn = document.getElementById("backButton");
    var main;
    backBtn.addEventListener("click",buttonHandler);

    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case backBtn: 
                main.postMessage("back","*"); break;
        }
    }

    function messageHandler(ev) {
        main = ev.source
        console.log(ev.data);
	}
}