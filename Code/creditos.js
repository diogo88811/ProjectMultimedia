"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{

    var backBtn = document.getElementById("backButton");

    backBtn.addEventListener("click",buttonHandler);

    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case backBtn: 
                parent.postMessage("back","*"); break;
        }
    }

}