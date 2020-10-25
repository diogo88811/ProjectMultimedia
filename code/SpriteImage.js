"use strict";

class SpriteImage{

	constructor(x, y, width, height, img)
	{
        //posiçao inicial
        this.xIni = x;
        this.yIni = y;
		//posição e movimento
		this.x = x;
		this.y = y;
		this.width = width;
        this.height = height;


		//imagem
		this.img = img;
		this.imgData = this.getImageData(img);	
    }

    getImageData(img){
        var canvas = document.createElement("canvas");
        canvas.height = this.height;
        canvas.width = this.width;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0,this.width,this.height)

        return ctx.getImageData(0,0,this.width,this.height);
    }

    draw(ctx){  
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

    mouseOverBoundingBox(ev){
        var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
        var my = ev.offsetY;

        var pixelNum = (Math.round(mx - this.x) + Math.round(my-this.y) * this.width) * 4;

        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height && this.imgData.data[pixelNum + 3] != 0){
            return true;
        }
        else
            return false;
    }

    
    intersectPixelCheck(s2){
		
		//limites do espaço de interseção
		var xMin = Math.max(this.x, s2.x);
		var xMax = Math.min(this.x + this.width, s2.x + s2.width);
		var	yMin = Math.max(this.y, s2.y);
		var yMax = Math.min(this.y + this.height, s2.y + s2.height);

		for(let y = yMin; y<=yMax; y++){
			for(let x = xMin; x<=xMax; x++){

				var xLocal = Math.round(x - this.x);
				var yLocal = Math.round(y - this.y);

				var pixImg1 = (xLocal + yLocal * this.width) * 4 + 3; 
				var pixImg2 = (Math.round(x-s2.x) + Math.round(y-s2.y) * s2.width)* 4 + 3;

				if(this.imgData.data[pixImg1] != 0 && s2.imgData.data[pixImg2] != 0){
					return true;
				}
			}
		}
		return false;
	}
}

class Colectable extends SpriteImage{

    constructor(x,y,width,height,img,corteX, corteY, maxSize, incremeto){
        super(x,y,width,height,img);
        this.cordenada = 0;
        this.contador = 1;
        this.corteX = corteX;
        this.corteY = corteY;
        this.maxSize = maxSize
        this.incremento = incremeto;

    }

    // Função de desenho dos coletaveis
    draw(ctx){
        if(this.contador % 11 == 0){ // 11 em 11 frames vai andar na imagem das moedas para a frente
            this.cordenada += this.incremento; // incremento dentro da imagem coin
            if(this.cordenada >= this.maxSize){
                this.cordenada = 0;
                this.contador = 0;
            }
        }
        ctx.drawImage(this.img,this.cordenada,0,this.corteX,this.corteY,this.x,this.y,this.width,this.height);
        this.contador++;
    }
    
    update(velocity){
        this.x -= velocity;
    }
}

class Bullet extends SpriteImage{

    constructor(x, y, width, height, img, direction){
        super(x,y,width,height,img);
        this.direction = direction;
        this.speed = 12;
    }

    // Movimentação das balas
    update(){
        if(this.direction == true){ // se a direction == true significa que está a apontar para a direita
            this.x += this.speed;
        }
        else{
            this.x -= this.speed;
        }
    }

    // Desenho das balas
    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}

class Enemy extends SpriteImage{

    constructor(x,y,width,height,img,limit,speed, enemy, enemyInv, canJump, velocity){
        super(x,y,width,height,img);
        this.limit = limit;
        this.speed = speed;
        this.counter= 1;  // posicao inicial
        this.enemy = enemy;
        this.enemyInv = enemyInv;
        this.contador = 0;
        this.index = 0;
        this.index1 = 0;
        this.canJump = canJump;
        this.velocityIni = velocity;
        this.velocity = velocity;
    }

    // Desenho dos enimigos
    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

    // Update quando o Johny se movimenta
    update(velocity){
        this.x -= velocity;
    }

    // Movimenta os enimigos para trás e para a frente
    walk(){
        /* - se o counter for positivo anda para a frente, se for negativo anda para trás
           - verifica se o speed é diferente de zero porque há enimigos que andam e outros que não        
           - finalmente há um contador para o numero de imagens, se for par, muda a imagem e cria a animação
           - ao chegar ao limite coloca couter a -1 para virar o enimigo
        */
        if(this.counter > 0){
            if(this.speed != 0){
                if(this.contador % 2 == 0){
                    this.img = this.enemy[this.index++];
                    if(this.index == this.enemy.length){
                        this.index = 0;
                        this.contador = 0;
                    }
                }
                this.contador++;
            }

            this.x+=this.speed;
            this.counter+=this.speed;
            if(this.counter >= this.limit){
                this.counter=-1;
            }
        }
        else{
            if(this.speed != 0){
                if(this.contador % 2 == 0){
                    this.img = this.enemyInv[this.index1++];
                    if(this.index1 == this.enemyInv.length){
                        this.index1 = 0;
                        this.contador = 0;
                    }
                }
                this.contador++;
            }

            this.counter-= this.speed;
            this.x-=this.speed;
            if(this.counter <=-this.limit){
                this.counter=1;
            }
        }
    }

    // Salto dos enimigos
    jump(){
        if(this.canJump){
            if(this.y >= this.yIni){
                this.velocity = -this.velocityIni;
            }
            this.y += this.velocity;
            this.velocity += 1;
        }
    }
}

class MainChar extends SpriteImage
{
    constructor(x,y,width,height,img, bulletImg, johnyArray, johnyIdleArray, johnyIdleInv, johnyArrayInv, gameSounds){
        super(x,y,width,height,img);
        this.left = false;
        this.right = false;
        this.up = false;
        this.jumping = false;
        this.direction = true; // true -> virado para a direita     false-> virado para a esquerda
        this.dead = false;
        this.finish = false;
        this.velocity = 0.6;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.bulletimg = bulletImg;
        this.bullets = [];
        this.johnyArray = johnyArray;
        this.johnyIdleArray = johnyIdleArray;
        this.contador = 0;
        this.index = 0;
        this.index1 = 0;
        this.lifes = 10;
        this.coinsCount = 0;
        this.johnyIdleInv = johnyIdleInv;
        this.johnyArrayInv = johnyArrayInv;
        this.pos = 0;
        this.index2 = 0;
        this.index3 = 0;
        this.gameSounds = gameSounds;   
        this.bulletCount = 50;
    }

    //Percorre o array das balas para alterar a posição
	updateBullets(){
		if(this.bullets.length != 0){ 
			this.bullets[0].update();
			if(this.bullets[0].x > 790 || this.bullets[0].x < 0){ // se a bala chegar ao inicio ou fim da canvas é eliminada
				this.bullets.pop();
			}
		}
	}

	//Percorre o array das balas e desenha-as
	drawBullets(ctx){
		if(this.bullets.length != 0){
			this.bullets[0].draw(ctx);
		}
    }
    
    // Movimento da personagem principal
    playerMove(level){

        // this.up verifica se carrega na tecla e this.jumping não está a meio de um salto
        if(this.up && this.jumping == false){
            this.yVelocity = -30;
            this.jumping = true;
        }

        if(this.left){
            this.xVelocity -= 0.5;
        }

        if(this.right){
            this.xVelocity += 0.5;
        }

        this.yVelocity += 1.2;
        this.y += this.yVelocity;
        if(this.x >= 300 && this.xVelocity > 0){
            level.updateMap(this.xVelocity);
        }
        else if(this.xVelocity < 0 && this.x <= 0){
            this.xVelocity = 0;
        }
        else{
            this.x += this.xVelocity;
        }

        this.xVelocity *= 0.9;
        this.yVelocity *= 0.92;
    }

    // verificação da colisão entre a personagem e as plataformas
    colCheckPlat(plat){

        var vX = (this.x +(this.width / 2)) - (plat.x + (plat.width / 2));
        var vY = (this.y +(this.height / 2)) - (plat.y + (plat.height / 2));
        var hWidths = (this.width / 2) + (plat.width /2);
        var hHeights = (this.height / 2) + (plat.height /2); 
        var colDir = null;

        if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights){
            var oX = hWidths - Math.abs(vX);
            var oY = hHeights - Math.abs(vY);

            if (oX >= oY){
                if (vY > 0){
                    colDir = "t";
                    this.y += oY;
                    this.jumping = false;
                    this.yVelocity = 0;
                } 
                else{
                    colDir = "b";
                    this.y -= oY;
                }
            } 
            else{
                if (vX > 0){
                    colDir = "l";
                    this.x += oX;
                } 
                else{
                    colDir = "r";
                    this.x -= oX;
                }
            }

        }
        return colDir;
    }

    animation(){
        if(this.right == true){
            this.direction = true;
            if(this.contador % 5 == 0){
                this.img = this.johnyArray[this.index++];
                if(this.index == this.johnyArray.length){
                    this.index = 0;
                    this.contador = 0;
                }
            }
            this.contador++;
        }
        else if(this.left == true){
            // temos de usar diferentes var index !
            this.direction = false;
            if(this.contador % 5 == 0){
                this.img = this.johnyArrayInv[this.index2++];
                if(this.index2 == this.johnyArrayInv.length){
                    this.index2 = 0;
                    this.contador = 0
                }
            }
            this.contador++;
        }
        else if(this.direction){
            // temos de usar diferentes var index !
            if(this.contador % 4 == 0){
                this.img = this.johnyIdleArray[this.index1++];
                if(this.index1 == this.johnyIdleArray.length){
                    this.index1 = 0;
                    this.contador = 0;
                }
            }
            this.contador++;
        }
        else if(!this.direction){
            if(this.contador % 4 == 0){
                this.img = this.johnyIdleInv[this.index3++];
                if(this.index3 == this.johnyIdleInv.length){
                    this.index3 = 0;
                    this.contador = 0;
                }
            }
            this.contador++;
        }
    }

    // trata de disparar
    dispara(){
        if(this.bullets.length == 0 && this.bulletCount != 0){ // verifica se não existe nenhuma bala na canvas e se a personagem ainda tem balas
            this.gameSounds[2].currentTime = 0.5;
            this.gameSounds[2].play();
            this.bulletCount--;
            this.bullets.push(new Bullet(this.x + Math.round(this.width/2), Math.round(this.y - 15 + this.height/2), 40,40,this.bulletimg, this.direction));
        }
    }

    bulletExists(){
        if(this.bullets.length != 0){
            return true;
        }
        return false;
    }

    // Para saber se a personagem caiu do mapa
    fallingMap(){
        if(this.y > 500){
            this.gameSounds[5].play();
        }
        if(this.y>3500){
            return true;
        }
        else{
            return false;
        }
    }

    // se a personagem morrer coloca a variavel dead a true
    death(level, player){
        if(level.johnyEnemyColision() || this.fallingMap()){
            this.lifes -= 1;
            player.death();
            level.restart(player);
        }
		if(this.lifes == 0){
            this.dead = true;
        }
    }

    finito(){
        this.finish = true;
    }

    // controla o volume da musica e dos sons
    /* 
        music == true -> controla musica                  up == true -> aumentar volume
        music == false -> controla os sons                up == true -> baixar volume
    */
    audioControl(music,up){
        var volume;
        
        if(music){
            volume = this.gameSounds[0].volume * 10;
            if(up && volume < 10){
                volume += 1;
                this.gameSounds[0].volume = (volume/10);
            }
            else if(!up && volume > 0){
                volume -= 1;
                this.gameSounds[0].volume = (volume/10);
            }
        }
        else{
            volume = this.gameSounds[1].volume * 10;
            if(up && volume < 10){
                volume += 1;
                for(let i = 1; i<this.gameSounds.length; i++){
                    this.gameSounds[i].volume = (volume/10);
                }
            }
            else if(!up && volume > 0){
                volume -= 1;
                for(let i = 1; i<this.gameSounds.length; i++){
                    this.gameSounds[i].volume = (volume/10);
                }
            }
            this.gameSounds[1].play();
        }
    }
}

class Plat extends SpriteImage{

    constructor(x, y, width, height, img, sx, sy, swidth, sheigh, isMovable, speed){
        super(x, y, width, height, img);
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheigh = sheigh;
        this.isMovable= isMovable;
        this.speed = speed;
    }

    draw(ctx){  
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheigh,this.x,this.y,this.width,this.height);
    }

    update(velocity){
        this.x -= velocity;
    }

    move(){
        if(this.isMovable){
            if(this.y >= this.yIni || this.y <= this.yIni - 150){
                this.speed = -this.speed;
            }
            this.y = this.y + this.speed;
        }
    }
}