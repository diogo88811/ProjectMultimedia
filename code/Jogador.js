"use strict";

class Jogador{
    constructor(name, score) 
    {
        this.name = name;
        this.score = score;
        this.coins = 0;
    }

    setName(name){
        this.name = name;
    }
    
    coin(){
        this.score += 17;
    }

    level(){
        this.score += 487;
    }

    kill(){
        this.score += 53;
    }

    death(){
        this.score -= 198;
    }

    setCoins(coins){
        this.coins += coins;
    }

    finalScore(time, lifes){
        if(time < 180000){
            this.score+=5000;
        }
        else if(time >= 180000 && time < 600000){
            this.score +=2500;
        }
        else{
            this.score += 1000;
        }
        this.score += 200*lifes;
    }

}
