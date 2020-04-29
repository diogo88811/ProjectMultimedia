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
        this.jump1 = false;
    }
    
    gravity(){
        //this.velocity += this.velocity * 0.3;
        this.y += 0.1 * 50;

        if (this.y >= 360){
            this.y = 360;
            //this.velocity = 0.5;
        }
    
    }

    jump(){
        //this.velocity -= this.velocity* 0.1;
        //this.y -= 50*this.velocity;
        this.y -= 50*0.1;

        if(this.y <= 200){
            //this.velocity = 0.5;
            this.jump1 = false;
        }
    }

    playerMove(cw,ch)
	{	

		if(this.left && this.x > 0)
		{
			this.x -= this.speed;
		}

		if(this.right && this.x < cw){
			if (this.x + this.width + 5 > cw)
				this.x = cw - this.width;
			else
				this.x = this.x + this.speed;
		}

		if(this.down && this.y < ch)
		{
			if (this.y + this.height + 5 > ch)
				this.y = ch - this.height;
			else
				this.y = this.y + this-this.speed;
		}

		if(this.up && this.y > 0){
            this.jump = true;
        }
        
        if(this.jump1 == true){
            this.jump();
            console.log("saltou");
        }

        if(this.jump1 == false){
            this.gravity();
        }

    }

    
    
}

class Plat extends SpriteImage
{
    constructor(x, y, w, h, img)
    {
        super(x, y, w, h, img);
    }

}