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
    var p = document.getElementsByTagName("p");

    backBtn.addEventListener("click",buttonHandler);

    var table = getHighScoreTable();

    for(let i=0; i<table.length; i++){
        p[i].innerHTML = i+1 + "º" + " " + table[i].name + " " + table[i].score;
    }

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

	// Passa os resultados guardados na local storage para uma tabel
	function getHighScoreTable() {
		var scoreTable = new Array();
		
		for(var i=0; i<10; i++) {
			var storageName = "score" + i;
			var scoreRecord = localStorage.getItem(storageName);

			if(scoreRecord == null) {
				break;
			} 
			var name = scoreRecord.split("~")[0];
			var score = scoreRecord.split("~")[1];
			scoreTable.push(new Jogador(name, score));
		}
		return scoreTable;
	}