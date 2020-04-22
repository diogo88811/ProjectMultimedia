"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{

    var playBtn = document.getElementById("jogar");
    var rankingBtn = document.getElementById("ranking");
    var optionsBtn = document.getElementById("opcoes");
    var helpBtn = document.getElementById("ajuda");
    var creditsBtn = document.getElementById("creditos");
    var exitBtn = document.getElementById("sair");

    playBtn.addEventListener("click",buttonHandler);
    rankingBtn.addEventListener("click",buttonHandler);
    optionsBtn.addEventListener("click",buttonHandler);
    helpBtn.addEventListener("click",buttonHandler);
    creditsBtn.addEventListener("click",buttonHandler);
    exitBtn.addEventListener("click",buttonHandler);

    function buttonHandler(ev){

        switch(ev.currentTarget){
    
            case playBtn: 
                parent.postMessage("play","*"); break;
    
            case rankingBtn: 
                parent.postMessage("ranking","*"); break;
    
            case optionsBtn: 
                parent.postMessage("options","*"); break;
    
            case helpBtn: 
                parent.postMessage("help","*"); break;
    
            case creditsBtn: 
                parent.postMessage("credits","*"); break;
    
            case exitBtn: 
                parent.postMessage("exit","*"); break;
        }
    }

}

function messageHandler(ev) {
    
    console.log("No menu:" + ev.sorce);
    console.log(ev.data);

}