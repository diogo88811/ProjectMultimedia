"use strict";

class Nivel
{
    constructor(background,coin,spArray, mapa, johny, enemyImg, heart, pauseIcons, enemyInv, flagImg, bulletImg){
        this.spArray = spArray;
        this.mapa = mapa;
        this.johny = johny;
        this.background = background;
        this.coinImg = coin;
        this.plataformas = [];
        this.coins = [];
        this.enemies = [];
        this.enemyImg = enemyImg;
        this.heart = heart;
        this.pauseIcons = pauseIcons;
        this.enemyInv = enemyInv;
        this.arrayPause = new Array(5);
        this.flagImg = flagImg;
        this.flag;
        this.bulletImg = bulletImg;
    }

    // Função que dá inicio ao mapa
    initialiseMap() {
        var y,x;
        for(y=0; y<this.mapa.length; y++) {
            var start = null, end = null;
            var start2 = null, end2 = null;
            var start3 = null, end3 = null;
            for(x=0; x<this.mapa[y].length; x++) {
                if(start==null && this.mapa[y].charAt(x) == '#') { 
                    start = x;
                }
                if(start2==null && this.mapa[y].charAt(x) == '-') { 
                    start2 = x;
                }
                if(start3==null && this.mapa[y].charAt(x) == '*') { 
                    start3 = x;
                }
                if (start != null && (this.mapa[y].charAt(x) == ' ' || this.mapa[y].charAt(x) == '-'  || this.mapa[y].charAt(x) == '*')) {
                    end = x - 1;
                }
                if (start2 != null && (this.mapa[y].charAt(x) == ' ' || this.mapa[y].charAt(x) == '#'  || this.mapa[y].charAt(x) == '*')) {
                    end2 = x - 1;
                }
                if (start3 != null && (this.mapa[y].charAt(x) == ' ' || this.mapa[y].charAt(x) == '-'  || this.mapa[y].charAt(x) == '#')) {
                    end3 = x - 1;
                }
                if (start != null && x==this.mapa[y].length -1) {
                    end = x;
                }
                if (start2 != null && x==this.mapa[y].length -1) {
                    end2 = x;
                }
                if (start3 != null && x==this.mapa[y].length -1) {
                    end3 = x;
                }
                if (start != null && end != null) {
                    this.plataformas.push(new Plat(start*20,y*20,(end-start+1)*20,20,this.spArray[0], 500, 700, 1500, 400, false,0));
                    start = end = null;
                }
                if (start2 != null && end2 != null) {
                    this.plataformas.push(new Plat(start2*20,y*20,(end2-start2+1)*20,20,this.spArray[0], 0, 500, 1000, 500, false,0));
                    start2 = end2 = null;
                }
                if (start3 != null && end3 != null) {
                    
                    this.plataformas.push(new Plat(start3*20,y*20,(end3-start3+1)*20,20,this.spArray[0], 200, 1000, 400, 200, false,0));
                    start3 = end3 = null;
                }
                if(this.mapa[y].charAt(x) == 'C'){
                    this.coins.push(new Colectable (x*20,y*20,20,20,this.coinImg,15,16,60,15));
                }
                if(this.mapa[y].charAt(x) == 'E'){
                    this.enemies.push(new Enemy (x*20,y*20,85,85,this.enemyImg[0], 250, 5,this.enemyImg, this.enemyInv, false, 0));
                }
                if(this.mapa[y].charAt(x) == 'L'){
                    this.enemies.push(new Enemy (x*20,y*20,85,85,this.enemyImg[0], 400, 12,this.enemyImg, this.enemyInv, false, 0));
                }
                if(this.mapa[y].charAt(x) == 'S'){
                    this.enemies.push(new Enemy ((x*20) - 40 ,y*20,85,85,this.enemyInv[0], 0, 0,this.enemyImg, this.enemyInv, true, Math.floor(Math.random() * (23 - 20)) + 20));
                }
                if(this.mapa[y].charAt(x) == 'F'){
                    this.flag = new Colectable (x*20,y*20,90,120,this.flagImg,256,326,512,270);
                }
                if(this.mapa[y].charAt(x) == 'A'){
                    this.plataformas.push(new Plat(x*20,y*20,20,20,this.spArray[0], 0, 500, 1000, 500, true, Math.floor(Math.random() * (4 - 2)) + 2));
                }
                
            }   
        }
        //Inicializa também os botões para o menu pausa
        this.arrayPause[0] = new SpriteImage(520, 260, 50, 50, this.pauseIcons[0]); // + musica
        this.arrayPause[1] = new SpriteImage(430, 275, 50, 20, this.pauseIcons[1]); // - musica
        this.arrayPause[2] = new SpriteImage(520, 360, 50, 50, this.pauseIcons[0]); // + sons
        this.arrayPause[3] = new SpriteImage(430, 375, 50, 20, this.pauseIcons[1]); // - sons
        this.arrayPause[4] = new SpriteImage(50, 500, 50, 50, this.pauseIcons[2]); // home
    }

    // Percorre o array das moedas e verficas interseções
    johnyCoinCollision(player){
		for(let i=0; i<this.coins.length; i++){
			if(this.johny.intersectPixelCheck(this.coins[i])){
				this.coins.splice(i, 1);
				i = 0;
                this.johny.coinsCount++;
                this.johny.gameSounds[7].play();
                player.coin();
			}
		}
    }
    
    // Percorre o array das plataformas e verficas interseções
    johnyPlatformsCollision(){
		for(let i = 0; i < this.plataformas.length; i++ ){
            var dir = this.johny.colCheckPlat(this.plataformas[i]);
            if (dir === "l" || dir === "r") {
            } else if (dir === "b") {
				this.johny.jumping = false;
            } else if (dir === "t") {
				this.johny.jumping = true;
            }
		}
    }
    
    // Percorre o array das balas e dos enimigos e verfica as interseções
    bulletEnemyCollision(player){
		if(this.johny.bullets.length != 0){
			for(let i=0; i<this.enemies.length; i++){
				if(this.johny.bullets[0].intersectPixelCheck(this.enemies[i])){
					this.enemies.splice(i,1);
                    this.johny.bullets.pop();
                    this.johny.gameSounds[4].play();
                    player.kill();
					break;
				}
			}
		}
    }
    
    // Percorre o array das balas e das plataformas e verfica as interseções
    bulletPlatformColision(){
        if(this.johny.bullets.length!=0){
            for(let i=0; i<this.johny.bullets.length;i++){
                for(let k=0; k<this.plataformas.length; k++){
                    if(this.plataformas[k].intersectPixelCheck(this.johny.bullets[i])){
                        this.johny.bullets.pop();
                        break;
                    }
                }
            }
        }
    }

    johnyEnemyColision(){
        for(let i=0; i < this.enemies.length; i++){
            if(this.johny.intersectPixelCheck(this.enemies[i])){
                this.johny.gameSounds[4].play();
				return true;
            }
        }
        return false;
    }
    
    // Percorre elementos do mapa para adicionar movimento quando personagem anda
    updateMap(xVelocity){
        for(let i=0; i< this.plataformas.length; i++){
            this.plataformas[i].update(xVelocity);
        }
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].update(xVelocity);
        }
        for(let i=0; i< this.coins.length; i++){
            this.coins[i].update(xVelocity);
        }
        this.flag.update(xVelocity);
    }

    // Percorre array de enimigos para lhes adicionar próprio movimento
    enemiesMovement(){
        for(let i=0; i< this.enemies.length; i++){
            this.enemies[i].walk();
            this.enemies[i].jump();
        }
    }

    // percorre array de plataformas e dá movimento para cima e para baixo
    platMovement(){
        for(let i=0; i< this.plataformas.length; i++){
            this.plataformas[i].move();
        }
    }

    // Desenha todos os elementos pertencentes ao mapa
    drawMap(ctx,dt){
        ctx.drawImage(this.background,0,0,800,600);
        for(let i = 0; i< this.plataformas.length; i++){
            this.plataformas[i].draw(ctx);
        }
        for(let i = 0; i< this.enemies.length; i++){
            this.enemies[i].draw(ctx);
        }
        for(let i = 0; i< this.coins.length; i++){
            this.coins[i].draw(ctx);
        }
        this.flag.draw(ctx);
        ctx.fillStyle = "white";
        ctx.drawImage(this.heart, 10, 10, 50, 50);
        ctx.drawImage(this.coinImg, 0, 0, 15, 16, 10, 70, 50, 50);
        ctx.textAlign = "right";
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("x" + this.johny.lifes,120,50);
        ctx.fillText(this.johny.coinsCount,120,110);
        ctx.fillText(this.johny.bulletCount,120, 170);
        dt = Math.round(dt/1000);
        var minutes = Math.floor(dt / 60);
        var seconds = Math.round(dt - minutes * 60);
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        ctx.textAlign = "center";
        ctx.fillText(minutes + ":" + seconds,400,50);
        ctx.drawImage(this.bulletImg, 10, 130, 50, 50);
    }

    // Recomeça a mapa do inicio;
    restart(player){
        this.plataformas=[];
        this.enemies=[];
        this.coins=[];
        this.johny.coinsCount = player.coins;
        this.johny.bulletCount += 3;
        this.initialiseMap();
        this.johny.x = this.johny.xIni;
        this.johny.y = this.johny.yIni;
    }

    gameOver(ctx,player){
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 60px Bahnschrift";
        ctx.fillText("GAME OVER", 400,200);
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("Score: " + player.score, 400,300);
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("Thanks for playing", 400,500);
        ctx.fillText(player.name, 400,400);
        this.johny.gameSounds[6].play();
        this.arrayPause[4].draw(ctx);
    }

    endGame(ctx,player){
        console.log("end game");
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 60px Bahnschrift";
        ctx.fillText("CONGRATULATIONS !!", 400,200);
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("Score: " + player.score, 400,300);
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("Thanks for playing", 400,500);
        ctx.fillText(player.name, 400,400);
        this.johny.gameSounds[6].play();
        this.arrayPause[4].draw(ctx);
    }

    pause(ctx){
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.font = "bold 60px Bahnschrift";
        ctx.fillText("PAUSE", 310,200);
        ctx.font = "bold 40px Bahnschrift";
        ctx.fillText("MÚSICA", 230,300);
        ctx.fillText("SONS", 230,400);
        for(let i = 0; i < this.arrayPause.length; i++){
            this.arrayPause[i].draw(ctx);
        }
    }
}

