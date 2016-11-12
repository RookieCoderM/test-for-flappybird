


// 一只小小鸟
(function(){

    window.Bird = Class.extend({

        init : function(option){
            this.x = game.canvasW * 0.5;
            this.y = 100;
            this.width = 85;
            this.height =60;
            this.wingsDir = 0; //翅膀方向 0 1 2
            this.wingsRate = 5; //每5帧更新一下翅膀状态
            this.state = 0; // 0 下落  1 向上飞
            this.gravityH = 0; //下落高度
            this.rotateAngle = 0     // 旋转角度
            this.dropFrame=game.frames.totalFrames;//下落时帧数
            this.air = 1; //空气阻力
            this.isDead = false;
            this.deadAnimationIndex = 0; // 洒热血动画索引
        },

        render : function(){

            // 抛鸟头 洒热血
            if(this.isDead){

                var sWidth = 325,sHeight = 138;
                var col = this.deadAnimationIndex % 5,
                    row = parseInt(this.deadAnimationIndex / 5);
                game.ctx.drawImage(game.allImageObj["blood"], col*sWidth,row*sHeight,sWidth,sHeight,this.x-100,this.y,sWidth,sHeight);

                // 绘制游戏结束
                  game.ctx.drawImage(game.allImageObj["gameover"], (game.canvasW - 626)* 0.5, (game.canvasH - 144)* 0.5);
                  return;

            }
            // 旋转
            game.ctx.save();
            game.ctx.translate(this.x+this.width*0.5, this.y+this.height*0.5)
            game.ctx.rotate(this.rotateAngle*Math.PI/180);
            game.ctx.translate(-(this.x+this.width*0.5), -(this.y+this.height*0.5));
            // 绘制翅膀
            game.ctx.drawImage(game.allImageObj["bird"],this.  wingsDir*this.width,0,this.width,this.height,this.  x,this.y,this.width,this.height);
            game.ctx.restore();
        },

        update : function(){
            // 每隔一段时间更新翅膀
            if(game.frames.totalFrames % this.wingsRate == 0){
                this.wingsDir ++;
                this.wingsDir > 2 && (this.wingsDir=0)
            }

            // 模拟自由落体
            if(this.state == 0){
                this.rotateAngle++;
                this.gravityH = 0.01*Math.pow(game.frames.totalFrames - this.dropFrame,2);

            }else if(this.state == 1){

                this.rotateAngle = -30;
                this.air++;  //越往上阻力越大
                this.gravityH = -15 + this.air;
                if( this.gravityH ==0){  //达到最高点
                    this.state = 0;  //改变状态
                    this.dropFrame = game.frames.totalFrames;
                }
            }

            this.y += this.gravityH;
            //封顶
            this.y < 0 && (this.y = 0);

            //蹦到地板
            if(this.y > game.canvasH - this.height-48){
                game.gameOver();
            }

            if(this.isDead){
                this.deadAnimationIndex ++;
                if (this.deadAnimationIndex==30) {
                    //血洒完 游戏全部结束
                    game.pause();
                }

                return;
            }
        },

        clickListen : function(){
            var self = this;
           //监听画布点击事件
            game.canvas.addEventListener("mousedown",function(){
                // 改变小鸟飞行状态
                self.state = 1;
                self.air = 1; //每次点击需要重置空气阻力
            });
        }
    });

})();
