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
	var johny;

	var mapa = new Array("                                                                                                                                    ",
						 "                                       #                                                                                            ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                   ######                                                                                           ",
						 "                            ######         #####                                                                                    ",
						 "                   ######                                                                                                           ",
						 "       ######                                                                                                                       ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                   ######                                                                                           ",
						 "                            ######         #####                                                                                    ",
						 "                   ######                                                                                                           ",
						 "       ######                                                                                                                       ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "                                                                                                                                    ",
						 "        # #  #    #     #    #                                                                                                      ",
						 "----------------------------------------------------------------------------------------------------------------------------------- ",
						 "----------------------------------------------------------------------------------------------------------------------------------- ",
						 "----------------------------------------------------------------------------------------------------------------------------------- ",
						 );
	

	var motorjogo = new MotorJogo();
	motorjogo.init(ctx);


    function initEndHandler(ev){

        addEventListener("keydown",kh);
		addEventListener("keyup",kh);

		johny = new MainChar(20,450,50,90,ev.johnyArray[0]);
		var level1 = new Nivel(ev.background,ev.platArray,mapa,johny);

		level1.initialiseMap();
		level1.drawMap(ctx);
        startAnim(ctx, motorjogo, level1,johny);
    }
    
    var kh = function(ev)
    {
		console.log(johny);
        motorjogo.canvasKeyHandler(ev, johny);
    }
}

function startAnim(ctx, motorjogo, level,johny)
{
    motorjogo.draw(ctx, level, johny);
    animLoop(ctx, motorjogo, level,johny);	
}

function animLoop(ctx, motorjogo, level,johny)
{	
	var al = function(time)
	{
		animLoop(ctx, motorjogo, level,johny);
	}

	var reqID = window.requestAnimationFrame(al);
	
	motorjogo.render(ctx, reqID, level, johny);
}
