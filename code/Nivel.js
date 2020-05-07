"use strict";

class Nivel
{
    constructor(background,spArray, mapa, johny){
        this.spArray = spArray;
        this.mapa = mapa;
        this.plataformas = [];
        this.johny = johny;
        this.background = background;
    }


    initialiseMap() {
        var y,x;
        for(y=0; y<this.mapa.length; y++) {
            var start = null, end = null;
            for(x=0; x<this.mapa[y].length; x++) {
                if(start==null && (this.mapa[y].charAt(x) == '-' || this.mapa[y].charAt(x) == '#')) { 
                    start = x;
                }
                if (start != null && this.mapa[y].charAt(x) == ' ') {
                    end = x - 1;
                }
                if (start != null && x==this.mapa[y].length -1) {
                    end = x;
                }
                if (start != null && end != null) {
                    var plat = new Plat(start*20,y*20,(end-start+1)*20,20,this.spArray[0]);
                    this.plataformas.push(plat);
                    start = end = null;
                }
                
            }   
        }
    }

    drawMap(ctx){
        ctx.drawImage(this.background,0,0,800,600);
        for(let i = 0; i< this.plataformas.length; i++){
            this.plataformas[i].draw(ctx);
        }
    }

    
    
    // setImgArray(imgArray){
    //     this.imgArray = imgArray
    //     console.log("1" + imgArray[0]);
    //     this.johny = new MainChar(20,400,50,100,this.imgArray[0],5,false,false,false);
    //     console.log("2" + this.johny);
    // }

    // level1(){
    //     console.log("3" + this.johny)
    //     this.spArray[0] = new MainChar(20,400,50,100,this.imgArray[0],5,false,false,false);
    //     this.spArray[1] = new Plat(500,300,200,40,this.imgArray[1]);
    //     this.spArray[2] = new Plat(250,350,200,40,this.imgArray[2]);
    // }
}

