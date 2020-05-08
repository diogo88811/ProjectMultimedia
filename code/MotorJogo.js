
"use strict";

class MotorJogo{

	constructor(){
		this.aux = 0;
	}
	
	//Carregar imagens
	
	init(ctx){
		var nLoad = 0;
		var totLoad = 12;
		var bullet;
		var background;
		var coin;
		var platArray = new Array(2);
		var johnyArray = new Array(2);
		var enemy = new Array(1);
		var img;

		//carregar imagens e criar sprites

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny";
		img.src = "../resources/johny/johny1.png";  //dá ordem de carregamento da imagem
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny2";
		img.src = "../resources/johny/johny2.png"; 

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny3";
		img.src = "../resources/johny/johny3.png"; 

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny4";
		img.src = "../resources/johny/johny4.png"; 

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny5";
		img.src = "../resources/johny/johny5.png";
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="johny6";
		img.src = "../resources/johny/johny6.png"; 

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="bullet";
		img.src = "../resources/bullet/fire.png";
		
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
		img.id="ground";
		img.src = "../resources/platform/ground.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="enemy";
		img.src = "../resources/enemy/enemy1.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coin";
		img.src = "../resources/coin/coin.png";
		

		function imgLoadedHandler(ev)
		{
			var img = ev.target;
			
			switch(img.id) {

				case "johny":
					johnyArray[0] = img;
					break;
				case "johny2":
					johnyArray[1] = img;
					break;
				case "johny3":
					johnyArray[2] = img;
					break;
				case "johny4":
					johnyArray[3] = img;
					break;
				case "johny5":
					johnyArray[4] = img;
					break;
				case "johny6":
					johnyArray[5] = img;
					break;
				case "bullet":
					bullet = img;
					break;
				case "platform":
					platArray[0] = img;
					break;
				 case "ground":
					platArray[1] = img;
				 	break;
				case "background":
					background = img;
					break;
				case "coin":
					coin = img;
					break;
				case "enemy":
					console.log("entrei case enemy");
					enemy[0] = img;
					break;
			}

			nLoad++;		

			if (nLoad == totLoad){
				var ev2 = new Event("initend");
				ev2.platArray = platArray;
				ev2.johnyArray = johnyArray;
				ev2.background = background;
				ev2.bullet = bullet;
				ev2.coin = coin;
				ev2.enemy = enemy;
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
				if(keyState == true){
					johny.dispara();
				}
				break;
		}
	}
	
	//apagar sprites
	clear(ctx){
		ctx.clearRect(0, 0, 800, 600);
	}

	//resedenho, actualizações, ...
	render(ctx, reqID, level,johny){

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		
		johny.playerMove(level);
		johny.animation();

		for(let i = 0; i < level.plataformas.length; i++ ){
            var dir = johny.colCheckPlat(level.plataformas[i]);
            if (dir === "l" || dir === "r") {
            } else if (dir === "b") {
				johny.jumping = false;
            } else if (dir === "t") {
				johny.jumping = true;
            }
        }
		
		//update
		johny.updateBullets();
		
		
		//draw
		this.clear(ctx);
		level.drawMap(ctx);
		johny.draw(ctx);
		johny.drawBullets(ctx,johny.bullets);

	}

}
