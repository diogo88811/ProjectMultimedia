"use strict";

class Nivel
{
    constructor(background,coin,spArray, mapa, johny, enemyImg){
        this.spArray = spArray;
        this.mapa = mapa;
        this.plataformas = [];
        this.johny = johny;
        this.background = background;
        this.coinImg = coin;
        this.coins = [];
        this.enemyImg = enemyImg;
        this.enemies = []
    }


    initialiseMap() {
        var y,x;
        for(y=0; y<this.mapa.length; y++) {
            var start = null, end = null;
            for(x=0; x<this.mapa[y].length; x++) {
                if(start==null && this.mapa[y].charAt(x) == '#') { 
                    start = x;
                }
                if(start == null && this.mapa[y].charAt(x) == '-'){
                    start = x;
                }
                if (start != null && this.mapa[y].charAt(x) == ' ') {
                    end = x - 1;
                }
                if (start != null && x==this.mapa[y].length -1) {
                    end = x;
                }
                if (start != null && end != null) {
                    this.plataformas.push(new Plat(start*20,y*20,(end-start+1)*20,20,this.spArray[1]));
                    start = end = null;
                }
                if(this.mapa[y].charAt(x) == 'C'){
                    this.coins.push(new Colectable (x*20,y*20,20,20,this.coinImg));
                }
                if(this.mapa[y].charAt(x) == 'E'){
                    this.enemies.push(new Enemy (x*20,y*20,20,20,this.enemyImg));
                }
                
            }   
        }
    }

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
    }

    drawMap(ctx){
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
    }
}

