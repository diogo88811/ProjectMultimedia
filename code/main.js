"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var loop = document.getElementsByTagName("audio")[0];
	var volume = 0;
	var frm;

	frm = document.getElementsByTagName("iframe")[0];
	frm.addEventListener("load",frameLoadHandler);
	window.addEventListener("message", messageHandler);
	
	showPage("menu");

	function frameLoadHandler(ev){
		var frm = ev.target;
		frm.contentWindow.postMessage(volume,"*");
	}

	function messageHandler(ev) {
		console.log(ev.data);
		if(ev.data == "dados"){
			showPage("dados");
		}
		else if(ev.data == "ranking"){
			showPage("ranking");
		}
		else if(ev.data == "options"){
			volume = ""+(loop.volume*10);
			showPage("options");
		}
		else if(ev.data == "help"){
			showPage("ajuda");
		}
		else if(ev.data == "credits"){
			showPage("creditos");
		}
		else if(ev.data == "exit"){
			console.log("Fechar");
		}
		else if(ev.data == "back"){
			showPage("menu");
		}
		else if(ev.data == "musicUp"){
			if(volume < 10){
				loop.play();
				volume = loop.volume * 10 + 2;
			}
			loop.volume = (volume/10);	
		}
		else if(ev.data == "musicDown"){
			if(volume > 0){
				volume = loop.volume * 10 - 2;
			}
			loop.volume = (volume/10);
		}
		else if(ev.data == "soundUp"){
		}
		else if(ev.data == "soundDown"){
	
		}
		else{
			loop.pause();
			volume = ev.data;
			showPage("jogar");
		}
	}
}


//---- Navegação e gestão de janelas

function showPage(pageName)
{
	hidePage();
	//carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = "../html/" + pageName + ".html";
	
}

function hidePage()  //não é necessário (excepto se páginas diferentes tivessem zonas de navegação diferentes)
{
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = "";
}