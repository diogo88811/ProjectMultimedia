"use strict";


(function()
{	
	window.addEventListener("load", main);
}());


function main(){

    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
    var spArray;  //sprite array
	canvas.addEventListener("initend", initEndHandler);
	

    var motorjogo = new MotorJogo();
	motorjogo.init(ctx);


    function initEndHandler(ev){

        addEventListener("keydown",kdh);
        addEventListener("keyup",kuh);

		spArray = ev.spArray;
		
			
		//var level1 = new Nivel(spArray);
       
        startAnim(ctx,spArray,motorjogo);
    }
    
    var kdh = function(ev)
    {
        canvasKeyDownHandler(ev, spArray);
    }

    var kuh = function(ev)
    {
        canvasKeyUpHandler(ev, spArray);
    }
}

function startAnim(ctx, spArray, motorjogo)
{
    motorjogo.draw(ctx, spArray);
    animLoop(ctx, spArray, motorjogo);	
}

function animLoop(ctx, spArray, motorjogo)
{	
	var al = function(time)
	{
		animLoop(ctx,spArray,motorjogo);
	}

	var reqID = window.requestAnimationFrame(al);
	
	motorjogo.render(ctx, reqID, spArray);
}

function canvasKeyDownHandler(ev, spArray)
{
	var sp = spArray[0];
	switch(ev.code){
		case "ArrowLeft":
			sp.left = true;
			break;
		case "ArrowUp":
			sp.up = true;
			break;
		case "ArrowRight":
			sp.right = true;
			break;
		case "Space":
			sp.jump1 = true;
			break;
	}
}

function canvasKeyUpHandler(ev, spArray)
{
	var sp = spArray[0];
	switch(ev.code){
		case "ArrowLeft":
			sp.left = false;
			break;
		case "ArrowUp":
			sp.up = false;
			break;
		case "ArrowRight":
			sp.right = false;
			break;

	}
}