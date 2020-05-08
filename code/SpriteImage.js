"use strict";

class SpriteImage
{
	constructor(x, y, width, height, img)
	{
		//posição e movimento
		this.x = x;
		this.y = y;
		this.width = width;
        this.height = height;


		//imagem
		this.img = img;
		//this.imgData = this.getImageData(img);	
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
				var pixImg2 =  (Math.round(x-s2.x) + Math.round(y-s2.y) * s2.width)* 4 + 3;

				if(this.imgData.data[pixImg1] != 0 && s2.imgData.data[pixImg2] != 0){
					return true;
				}
			}
		}
		return false;
	}
}

class Colectable extends SpriteImage
{
    constructor(x,y,width,height,img)
    {
        super(x,y,width,height,img);
    }
    draw(ctx){
        ctx.drawImage(this.img,0,0,15,16,this.x,this.y,20,20);
    }
    update(velocity){
        this.x -= velocity;
    }
}

class Bullet extends SpriteImage
{
    constructor(x,y,width,height,img){
        super(x,y,width,height,img);
    }

    update(){
        this.x += 12;
    }

    draw(ctx){
        ctx.drawImage(this.img,0,0,512,512,this.x,this.y,50,50);
    }
}

class Enemy extends SpriteImage
{
    constructor(x,y,width,height,img)
    {
        super(x,y,width,height,img);
    }

    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y,100,70);
    }

    update(velocity){
        this.x -= velocity;
    }
}

class MainChar extends SpriteImage
{
    constructor(x,y,width,height,img, bulletImg, johnyArray)
    {
        super(x,y,width,height,img);
        this.left = false;
        this.right = false;
        this.up = false;
        this.jumping = false;
        this.velocity = 0.6;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.bulletimg = bulletImg;
        this.bullets = [];
        this.johnyArray = johnyArray;
        this.aux = 0;
    }

    //Percorre o array das balas para alterar a posição
	updateBullets(){
		if(this.bullets.length != 0){
			this.bullets[0].update();
			if(this.bullets[0].x > 790){
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

    playerMove(level)
    {
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

    colCheckPlat(plat)
    {
        var vX = (this.x +(this.width / 2)) - (plat.x + (plat.width / 2));
        var vY = (this.y +(this.height / 2)) - (plat.y + (plat.height / 2));
        var hWidths = (this.width / 2) + (plat.width /2);
        var hHeights = (this.height / 2) + (plat.height /2); 
        var colDir = null;

        if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
        {
            var oX = hWidths - Math.abs(vX);
            var oY = hHeights - Math.abs(vY);

            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    this.y += oY;
                    this.jumping = false;
                    this.yVelocity = 0;
                } else {
                    colDir = "b";
                    this.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    this.x += oX;
                } else {
                    colDir = "r";
                    this.x -= oX;
                }
            }

        }
        return colDir;
    }

    animation(){
        if(this.right==true){
			if(this.aux==0){
				this.img = this.johnyArray[0];
			}
			else if(this.aux == 5){
				this.img = this.johnyArray[1];
			}
			else if(this.aux == 10){
				this.img = this.johnyArray[2];
			}
			else if(this.aux == 15){
				this.img = this.johnyArray[3];
			}
			else if(this.aux == 20){
				this.img = this.johnyArray[4];
			}
			else if(this.aux == 25){
				this.img = this.johnyArray[5];
			}
			else if(this.aux > 30){
				this.aux=0;
			}
			this.aux++;
		}
		else{
			this.img = this.johnyArray[0];
		}
    }

    dispara(){
        if(this.bullets.length == 0){
            this.bullets.push(new Bullet(this.x + Math.round(this.width/2), Math.round(this.y - 15 + this.height/2), 20,20,this.bulletimg));
        }
    }
    
    
}

class Plat extends SpriteImage
{
    constructor(x, y, width, height, img)
    {
        super(x, y, width, height, img);
    }

    draw(ctx)
    {  
        ctx.drawImage(this.img,0,500,1000,1000,this.x,this.y,this.width,this.height);
    }

    update(velocity){
        this.x -= velocity;
    }

}