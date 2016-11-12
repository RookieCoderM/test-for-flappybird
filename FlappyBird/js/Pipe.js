
// 创建管道
(function(){

    window.Pipe = Class.extend({

        init : function(option){
            this.speed = 6;
            this.dir = option.dir;
            this.sWidth = 148;
            this.x = game.canvasW;
            this.sHeight = _.random(100,game.canvasH*0.5);
            this.y =  this.dir==1?0:(game.canvasH-this.sHeight-48);
        },

        render : function(){
            if(this.dir==1){
                game.ctx.drawImage(game.allImageObj["pipe1"],0,1664-this.sHeight,this.sWidth,this.sHeight,this.x,this.y,this.sWidth,this.sHeight);
            }else if(this.dir==-1){
                game.ctx.drawImage(game.allImageObj["pipe0"],0,0,this.sWidth,this.sHeight,this.x,this.y,this.sWidth,this.sHeight);
            }

        },

        update : function(){
            this.x -= this.speed;
            if (this.x < - this.sWidth) {
                game.pipeArr = _.without(game.pipeArr,this);
            }

            // 小鸟和管道碰撞检测 先判断x是否在管道范围内
            if(game.bird.x > this.x - game.bird.width && game.bird.x < this.x + this.sWidth){
                if (this.dir==1 && game.bird.y < this.sHeight) {
                    game.gameOver();
                }else if(this.dir==-1 && game.bird.y > this.y-game.bird.height){

                    game.gameOver();
                }
            }

        },

        pause : function(){
            this.speed = 0;
        }
    });
})();
