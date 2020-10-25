
"use strict";

class MotorJogo{

	constructor(player){
		//Pause Variables
		this.paused = false;
		this.startPause = 0;
		this.stopPause = 0;
		this.totalPause = 0;
		this.gameTime = 0;
		this.control = false;
		this.player = player;
		this.aux = 0;
	}
	
	//Carregar imagens
	init(ctx){
		var nLoad = 0;
		var totLoad = 74;
		var bullet;
		var background = new Array(3);
		var coin;
		var platArray = new Array(2);
		var johnyArray = new Array(6);
		var johnyIdleArray = new Array(8);
		var pauseIcons = new Array(3);
		var johnyIdleInv = new Array(8);
		var johnyInvArray = new Array(6);
		var gameSounds = new Array(8);
		var enemy = new Array(17);
        var enemyInv = new Array(17);
		var img;
		var heart;
		var star;
		var fireCount;

		// Audios
		var audio = new Audio();
        audio.src = "../resources/audio/soundTrack.mp3";
		audio.loop = true;
		gameSounds[0] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/jump.mp4";
		audio.loop = false;
		gameSounds[1] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/fireball.wav";
		audio.loop = false;
		gameSounds[2] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/hitSound.wav";
		audio.loop = false;
		gameSounds[3] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/pain.mp3";
		audio.loop = false;
		gameSounds[4] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/fall.wav";
		audio.loop = false;
		gameSounds[5] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/gameOver.mp3";
		audio.loop = false;
		gameSounds[6] = audio;

		var audio = new Audio();
        audio.src = "../resources/audio/coin.ogg";
		audio.loop = false;
		gameSounds[7] = audio;

		// JOHNY RUNING IMAGES
        for(let i=1; i<7; i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id = "johny" + i;
            img.src = "../resources/johny/run/johny" + i + ".png"; 
		}
		
		// JOHNY RUNING FLIP IMAGES
		for(let i=1; i<7; i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id = "johnyInv" + i;
            img.src = "../resources/johny/run/johny" + i +"Inv"+ ".png"; 
		}

		// JOHNY IDLE IMAGES
        for(let i=1; i<9; i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id = "johny" + i + "IDLE";
            img.src =  "../resources/johny/idle/johny" + i + ".png"; 
		}
		
		//JOHNY IDLE FLIP IMAGES
        for(let i=1; i<9; i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id = "johny" + i + "IDLEINV";
            img.src =  "../resources/johny/idle/johny" + i +"IdleInv"+ ".png"; 
		}
		
		//Enemies walking images
		for(let i = 1; i<18;i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id="enemy"+i;
            img.src = "../resources/enemy/Golem"+ i +".png";
        }

        //Enemies flip walking images
        for(let i = 1; i<18;i++){
            img = new Image();
            img.addEventListener("load", imgLoadedHandler);
            img.id="InvEnemy"+i;
            img.src = "../resources/enemy/Golem"+ i +"Inv.png";
        }
		
		// PAUSE ICONS
		img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="plusIcon";
        img.src = "../resources/buttons/plusIcon.png";

        img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="minusIcon";
        img.src = "../resources/buttons/minusIcon.png";

        img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="home";
        img.src = "../resources/buttons/homeIcon.png";

        img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="heart";
        img.src = "../resources/info/heart.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="bullet";
		img.src = "../resources/bullet/fire.png";
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="platform";
		img.src = "../resources/platform/ground.png";

		img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="background1";
		img.src = "../resources/background/back1.png";
		
		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="background2";
		img.src = "../resources/background/back2.png";

		img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id="background3";
		img.src = "../resources/background/back3.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coin";
		img.src = "../resources/coin/coin.png";

		img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="star";
		img.src = "../resources/finalFlag.png";

		img = new Image();
        img.addEventListener("load", imgLoadedHandler);
        img.id = "fireCount";
        img.src = "../resources/bullet/fireCount.png";
		

		function imgLoadedHandler(ev){
			var img = ev.target;
			
			switch(img.id) {

				case "johny1":
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
				case "johny1IDLE":
					johnyIdleArray[0] = img;
					break;
				case "johny2IDLE":
					johnyIdleArray[1] = img;
					break;
				case "johny3IDLE":
					johnyIdleArray[2] = img;
					break;
				case "johny4IDLE":
					johnyIdleArray[3] = img;
					break;
				case "johny5IDLE":
					johnyIdleArray[4] = img;
					break;
				case "johny6IDLE":
					johnyIdleArray[5] = img;
					break;
				case "johny7IDLE":
					johnyIdleArray[6] = img;
					break;
				case "johny8IDLE":
					johnyIdleArray[7] = img;
					break;
				case "bullet":
					bullet = img;
					break;
				case "platform":
					platArray[0] = img;
					break;
				case "background1":
					background[0] = img;
					break;
				case "background2":
					background[1] = img;
					break;
				case "background3":
					background[2] = img;
					break;
				case "coin":
					coin = img;
					break;
				case "heart":
					heart = img;
					break;
				case "plusIcon":
                    pauseIcons[0] = img;
                    break;
                case "minusIcon":
                    pauseIcons[1] = img;
                    break;
                case "home":
                    pauseIcons[2] = img;
					break;
				case "johny1IDLEINV":
                    johnyIdleInv[0] = img;
                    break;
                case "johny2IDLEINV":
                    johnyIdleInv[1] = img;
                    break;
                case "johny3IDLEINV":
                    johnyIdleInv[2] = img;
                    break;
                case "johny4IDLEINV":
                    johnyIdleInv[3] = img;
                    break;
                case "johny5IDLEINV":
                    johnyIdleInv[4] = img;
                    break;
                case "johny6IDLEINV":
                    johnyIdleInv[5] = img;
                    break;
                case "johny7IDLEINV":
                    johnyIdleInv[6] = img;
                    break;
                case "johny8IDLEINV":
                    johnyIdleInv[7] = img;
                    break;
                case "johnyInv1":
                    johnyInvArray[0] = img;
                    break;
                case "johnyInv2":
                    johnyInvArray[1] = img;
                    break;
                case "johnyInv3":
                    johnyInvArray[2] = img;
                    break;
                case "johnyInv4":
                    johnyInvArray[3] = img;
                    break;
                case "johnyInv5":
                    johnyInvArray[4] = img;
                    break;
                case "johnyInv6":
                    johnyInvArray[5] = img;
					break;
				case "InvEnemy1":
					enemyInv[0] = img;
					break;
				case "InvEnemy2":
					enemyInv[1] = img;
					break;
				case "InvEnemy3":
					enemyInv[2] = img;
					break;
				case "InvEnemy4":
					enemyInv[3] = img;
					break;
				case "InvEnemy5":
					enemyInv[4] = img;
					break;
				case "InvEnemy6":
					enemyInv[5] = img;
					break;
				case "InvEnemy7":
					enemyInv[6] = img;
					break;
				case "InvEnemy8":
					enemyInv[7] = img;
					break;
				case "InvEnemy9":
					enemyInv[8] = img;
					break;
				case "InvEnemy10":
					enemyInv[9] = img;
					break;
				case "InvEnemy11":
					enemyInv[10] = img;
					break;
				case "InvEnemy12":
					enemyInv[11] = img;
					break;
				case "InvEnemy13":
					enemyInv[12] = img;
					break;
				case "InvEnemy14":
					enemyInv[13] = img;
					break;
				case "InvEnemy15":
					enemyInv[14] = img;
					break;
				case "InvEnemy16":
					enemyInv[15] = img;
					break;
				case "InvEnemy17":
					enemyInv[16] = img;
					break;
				case "enemy1":
					enemy[0] = img;
					break;
				case "enemy2":
					enemy[1] = img;
					break;
				case "enemy3":
					enemy[2] = img;
					break;
				case "enemy4":
					enemy[3] = img;
					break;
				case "enemy5":
					enemy[4] = img;
					break;
				case "enemy6":
					enemy[5] = img;
					break;
				case "enemy7":
					enemy[6] = img;
					break;
				case "enemy8":
					enemy[7] = img;
					break;
				case "enemy9":
					enemy[8] = img;
					break;
				case "enemy10":
					enemy[9] = img;
					break;
				case "enemy11":
					enemy[10] = img;
					break;
				case "enemy12":
					enemy[11] = img;
					break;
				case "enemy13":
					enemy[12] = img;
					break;
				case "enemy14":
					enemy[13] = img;
					break;
				case "enemy15":
					enemy[14] = img;
					break;
				case "enemy16":
					enemy[15] = img;
					break;
				case "enemy17":
					enemy[16] = img;
					break;
				case "star":
					star = img;
					break;
				case "fireCount":
					fireCount = img;
					break;
			}

			nLoad++;
			ctx.fillStyle = "white";
			ctx.font = "bold 40px Bahnschrift";
			ctx.clearRect(0, 0, 800, 600);
			ctx.fillText("LOADING",320,290);		

			if (nLoad == totLoad){
				var ev2 = new Event("initend");
				ev2.platArray = platArray;
				ev2.johnyArray = johnyArray;
				ev2.johnyIdleArray = johnyIdleArray;
				ev2.background = background;
				ev2.bullet = bullet;
				ev2.coin = coin;
				ev2.enemy = enemy;
				ev2.heart = heart;
				ev2.pauseIcons = pauseIcons;
				ev2.johnyInvArray = johnyInvArray;
				ev2.johnyIdleInv = johnyIdleInv;
				ev2.gameSounds = gameSounds;
				ev2.enemyInv = enemyInv;
				ev2.star = star;
				ev2.fireCount = fireCount;
				ctx.canvas.dispatchEvent(ev2);
			}
		}	
	}

	//handler para as teclas
	canvasKeyHandler(ev, johny){
		var keyState = (ev.type == "keydown")?true:false;

		switch(ev.code){
			case "Escape":
				if(keyState == true){
					if(this.paused == false){
						this.paused = true;
					}
					else{
						this.paused = false;
						this.control = true;
					}	
				}
				break;
			case "ArrowLeft":
				johny.left = keyState;
				johny.direction = false; 
				break;
			case "ArrowUp":
				johny.gameSounds[1].play();
				johny.up = keyState;
				break;
			case "ArrowRight":
				johny.right = keyState;
				johny.direction = true;
				break;
			case "Space":
				if(keyState == true){
					johny.dispara();
				}
				break;
		}
	}

	// Handler para clicks no menu pausa
	canvasClickHandler(ev, johny, level, mainPage){
		if(this.paused == true){
			if(level.arrayPause[0].mouseOverBoundingBox(ev)){
				johny.audioControl(true, true);
			}
			else if(level.arrayPause[1].mouseOverBoundingBox(ev)){
				johny.audioControl(true, false);
			}
			else if(level.arrayPause[2].mouseOverBoundingBox(ev)){
				johny.audioControl(false, true);
			}
			else if(level.arrayPause[3].mouseOverBoundingBox(ev)){
				johny.audioControl(false, false);
			}
			else if(level.arrayPause[4].mouseOverBoundingBox(ev)){
				mainPage.postMessage("back","*");
			}
		}
		else if(johny.dead || johny.finish){
			if(level.arrayPause[4].mouseOverBoundingBox(ev)){
				mainPage.postMessage("back","*");
			}
		}
    }
	
	//apagar sprites
	clear(ctx){
		ctx.clearRect(0, 0, 800, 600);
	}

	// Passa os resultados guardados na local storage para uma tabel
	getHighScoreTable() {
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
	
	// Passa os resultados da tabela para a localStorage
	setHighScoreTable(table) {
		for (var i = 0; i < 10; i++) {
			// Se a tabela já tiver 10 elementos, ao adicionar uma nova pontuação ela pode passar a 11
			if (i >= table.length) break;
	
			var storageName = "score" + i;
			var name = table[i].name;
			var score = table[i].score;
	
			// O valor vai ser o nome do jogador e a pontuação
			localStorage.setItem(storageName, name +"~"+ score);
		}
	}
	
	// Adiciona os high scores à tabela
	addHighScore(name, score) {
		var table = this.getHighScoreTable();
	
		for(var i=0; i<table.length; i++) {
			if(score >= table[i].score) {
				var record = new Jogador(name, score);
				table.splice(i, 0, record);
				return table;
			}
		}
		if (table.length <= 10) {
			table.push(new Jogador(name, score));
		}
		return table;
	}
	
	//resedenho, actualizações, ...
	render(ctx, reqID, level, johny, dt, bol){

		this.gameTime = dt - this.totalPause; // Ao valor total de tempo decorrido subtraimos o somatório do tempo de pausas

		// JOGO PAUSADO
		if(this.paused == true || johny.dead == true || bol == true){
            this.stopPause = dt;
            if(this.aux==0 && !johny.dead && bol != true){ // Entra aqui se for pausa  / AUX serve para garantir que só entra uma vez;
				level.pause(ctx);
				this.aux=1;
            }
            else if(this.aux==0 && johny.dead){ // Entra aqui se for gameOver
				level.gameOver(ctx, this.player);
                this.aux=1;
			}
			else if(bol == true && this.aux == 0){ // Entra aqui se o jogo tiver sido concluido
				this.player.finalScore(this.gameTime, johny.lifes);
				var table = this.addHighScore(this.player.name, this.player.score);
				this.setHighScoreTable(table);
				johny.finito();
				level.endGame(ctx,this.player);
				this.aux=1;
			}
		}
		// JOGO NÃO PAUSADO
		else{
			//updates
			johny.playerMove(level);
			johny.animation();
			johny.updateBullets();
			level.enemiesMovement();
			level.platMovement();

			//collisions
			level.johnyPlatformsCollision();
			level.johnyCoinCollision(this.player);
			level.bulletEnemyCollision(this.player);
			level.bulletPlatformColision();
			johny.death(level, this.player);
			
			//draw
			this.clear(ctx);
			level.drawMap(ctx,this.gameTime);
			johny.draw(ctx);
			johny.drawBullets(ctx);

			if(this.control == true){
				this.totalPause += (this.stopPause - this.startPause);
				this.control = false;
			}
			this.startPause = dt;
			this.aux = 0;
		}
	}

}
