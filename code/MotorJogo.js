
"use strict";

class MotorJogo{
	//Carregar imagens
	
	init(ctx){
		var nLoad = 0;
		var totLoad = 4;
		var imgArray = new Array(3);
		var img; 

		//carregar imagens e criar sprites
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny";
		img.src = "../resources/johny/johny1.png";  //dá ordem de carregamento da imagem
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="platform";
		img.src = "../resources/platform/tile_sprite.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="background";
		img.src = "../resources/background/back1.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="plat2";
		img.src = "../resources/platform/plat2.png";

		function imgLoadedHandler(ev)
		{
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp;
			
			switch(img.id) {

				case "johny":
					imgArray[0] = img;
					break;
				case "platform":
					imgArray[1] = img;
					break;
				 case "plat2":
					imgArray[2] = img;
				 	break;
				case "background":
					var xInit = canvas.width/2 - img.width/2;
					ctx.drawImage(img,0,0);
					break;
			}

			nLoad++;		

			if (nLoad == totLoad){
				var ev2 = new Event("initend");
				ev2.imgArray = imgArray;
				ctx.canvas.dispatchEvent(ev2);
			}
		}	
	}

	//handler para as teclas
	canvasKeyHandler(ev, johny){
		var keyState = (ev.type == "keydown")?true:false;

		switch(ev.code){
			case "ArrowLeft":
				johny.left = keyState;
				break;
			case "ArrowUp":
				johny.up = keyState;
				break;
			case "ArrowRight":
				johny.right = keyState;
				break;
			case "Space":
				johny.jumping == true;
				break;
		}
	}
	//desenhar sprites
	draw(ctx, spArray, johny){
		var dim = spArray.length;
		johny.draw(ctx);
		//sp.draw(ctx);
		for (let i = 0; i < dim; i++){
			spArray[i].draw(ctx);
		}
	}

	//apagar sprites
	clear(ctx){
		ctx.clearRect(0, 0, 800, 600);
	}

	//-------------------------------------------------------------
	//--- controlo da animação: coração da aplicação!!!
	//-------------------------------------------------------------

	//resedenho, actualizações, ...
	render(ctx, reqID, level,johny){

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;


		var spArray = level.plataformas;

		console.log(level.spArray);
		console.log("ole" + level.johny)
		
		johny.playerMove(cw,ch);
		
		// for(let i = 1; i<spArray.length; i++){
		// 	if(spArray[i].intersectPixelCheck(spArray[0])){
		// 		console.log("caralho");
		// 		spArray[0].y = spArray[1].y - spArray[0].height;
		// 		spArray[0].jump1 = false;
		// 	}
		// }

		for(let i = 0; i < spArray.length; i++ ){
			var dir = johny.colCheckPlat(spArray[i]);
			console.log(dir)
			if (dir === "l" || dir === "r") {
				console.log("letf and right");
			} else if (dir === "b") {
				console.log("botom");
			} else if (dir === "t") {
				console.log("top");
			}
		}
		
		this.clear(ctx);
		johny.draw(ctx);
		level.drawMap(ctx);
		//this.draw(ctx,spArray);
	}

}
