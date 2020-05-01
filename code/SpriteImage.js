"use strict";

class SpriteImage
{
	constructor(x, y, w, h, img)
	{
		//posição e movimento
		this.x = x;
		this.y = y;
		this.width = w;
        this.height = h;

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
    constructor(x,y,w,h,img)
    {
        super(x,y,w,h,img);
    }
}

class Enenmy extends SpriteImage
{
    constructor(x,y,w,h,img,speed)
    {
        super(x,y,w,h,img);
        this.speed = speed;
    }
}

class MainChar extends SpriteImage
{
    constructor(x,y,w,h,img)
    {
        super(x,y,w,h,img);
        this.left = false;
        this.right = false;
        this.up = false;
        this.canJump = true;
        this.jumping = false;
        this.velocity = 0.6;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    playerMove(array)
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

        this.yVelocity += 1.5;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        for(let i=0; i< array.length; i++){
            array[i].update(this.xVelocity);
        }
        this.xVelocity *= 0.9;
        this.yVelocity *= 0.92;

		if(this.y > 440){
            this.jumping = false;
            this.y = 440;
            this.yVelocity = 0;
        }
    }

    colCheckPlat(plat)
    {
        var vX = (this.x +(this.width / 2)) - (plat.x + (plat.width / 2));
        var vY = (this.y +(this.height / 2)) - (plat.y + (plat.height / 2));
        var hWidths = (this.width / 2) + (plat.width /2);
        var hHeights = (this.height / 2) + (plat.height /2); 
        var colDir = null;
        console.log("entrei na func");
        console.log(Math.abs(vX));
        console.log(hWidths);

        console.log(Math.abs(vY));
        console.log(hHeights);

        if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) 
        {
            var oX = hWidths - Math.abs(vX);
            var oY = hHeights - Math.abs(vY);
            console.log("entrei no if crl");
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    this.y += oY;
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
    
    
}

class Plat extends SpriteImage
{
    constructor(x, y, w, h, img)
    {
        super(x, y, w, h, img);
    }

    draw(ctx)
    {  
        ctx.drawImage(this.img,0,0,19,20,this.x,this.y,this.width,this.height);
    }

    update(velocity){
        this.x -= velocity;
    }

}