"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main()
{

	window.addEventListener("message", messageHandler);
	
	showPage("menu");
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



//ADD CODE

function messageHandler(ev) {

	if(ev.data == "play"){
		//showPage("jogar");
	}
	else if(ev.data == "ranking"){
		//showPage("ranking");
	}
	else if(ev.data == "options"){
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
}