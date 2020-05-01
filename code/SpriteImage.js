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

    getImageData(img)
    {
        var canvas = document.createElement("canvas");
        canvas.height = this.height;
        canvas.width = this.width;


        var ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0,this.width,this.height)

        return ctx.getImageData(0,0,this.width,this.height);
    }

    draw(ctx)
    {  
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
    constructor(x,y,w,h,img,speed,left,right,up)
    {
        super(x,y,w,h,img);
        this.speed = speed;
        this.left = left;
        this.right = right;
        this.up = up;
        this.canJump = true;
        this.jump1 = false;
        this.velocity = 0.6;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    
    // gravity(){
    //     this.velocity += this.velocity * 0.1;
    //     this.y += this.velocity * 50;

    //     if (this.y >= 360){
    //         this.y = 360;
    //         this.velocity = 0.6;
    //         this.canJump = true;
    //     }
    
    // }

    // jump(){
    //     this.velocity -= this.velocity* 0.2;
    //     this.y -= 50*this.velocity;

    //     console.log(this.velocity);
    //     if(this.velocity <= 0.01){
    //         this.velocity = 0.6;
    //         this.jump1 = false;
    //     }
    // }

    playerMove(cw,ch)
	{	
        if(this.up && this.jumping == false){
            this.yVelocity = -40;
            this.jumping = true;
        }

		if(this.left){
            this.xVelocity -= 0.7;
        }

		if(this.right){
            this.xVelocity += 0.7;
        }

        this.yVelocity += 1.5;
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.xVelocity *= 0.9;
        this.yVelocity *= 0.99;

		if(this.y > 360){
            this.jumping = false;
            this.y = 360;
            this.yVelocity = 0;
        }
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

}