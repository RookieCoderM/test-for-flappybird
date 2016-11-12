
// 为了计算实际帧率和总帧数
(function(){

    window.Frames = Class.extend({

        init : function(){ //初始化

            this.totalFrames = 0; //总帧数
            this.curFrames = 0;   //某时刻当\前帧数
            this.realFrames = 0;  //实际帧率
            this.startTime = new Date(); //记录开始时间
        },

        render : function(){ //在屏幕上绘制帧率

            game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
            game.ctx.fillText("FPS / "+this.realFrames, 15,15);
            game.ctx.fillText("FNO / "+this.totalFrames, 15,30);
        },

        update : function(){  // 更新当前实际帧率

            var curTime = new Date();
            this.totalFrames++;

            if(curTime - this.startTime >= 1000){  //时间了1s

                this.realFrames = this.totalFrames - this.curFrames; // 终点 - 起点 = 增量
                //开始下一个 1s周期 更新起始点数据
                this.curFrames = this.totalFrames;
                this.startTime = curTime;
            }

        }

    });

})();
