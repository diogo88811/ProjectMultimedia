
"use strict";

class MotorJogo{
	//Carregar imagens
	
	init(ctx){
		var nLoad = 0;
		var totLoad = 4;
		var spArray = new Array(2);
		var img; 

		//carregar imagens e criar sprites
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny";
		img.src = "../resources/johny/johny1.png";  //dá ordem de carregamento da imagem
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="platform";
		img.src = "../resources/platform/plat1.png";

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
					sp = new MainChar(20,400,50,100,img,5,false,false,false);
					spArray[0] = sp;
					break;
				case "platform":
					sp = new Plat(200, 400, 200, 70, img);
					spArray[1] = sp;
					break;
				// case "plat2":
				// 	spArray[2] = i;
				// 	break;
				case "background":
					var xInit = canvas.width/2 - img.width/2;
					ctx.drawImage(img,0,0);
					break;
			}

			nLoad++;		

			if (nLoad == totLoad){
				var ev2 = new Event("initend");
				ev2.spArray = spArray;
				ctx.canvas.dispatchEvent(ev2);
			}
		}	
	}

	//desenhar sprites
	draw(ctx, spArray){
		var dim = spArray.length;
		
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
	render(ctx, reqID, spArray){

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

		var sp = spArray[0];
		
		sp.playerMove(cw,ch);
		
		if(spArray[1].intersectPixelCheck(sp)){
			console.log("caralho");
			sp.y = spArray[1].y - sp.height;
			sp.jump1 = false;
		}

		this.clear(ctx);
		this.draw(ctx,spArray);
	}

}
