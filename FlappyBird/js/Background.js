
//加载背景素材
(function(){

    window.Background = Class.extend({

        init : function(option){ // 初始化
            this.img = option.img;
            this.x = 0;
            this.y = option.y || 0;
            this.width = option.width;
            this.height = option.height;
            this.speed = option.speed || 1;
        },

        render : function(){ // 绘制背景

            //绘制个数
            var num = parseInt(game.canvasW / this.width) + 1;
            for(var i = 0;i < num*2 ; i++){
                game.ctx.drawImage(this.img, this.x+i*this.width, this.y,this.width,this.height);
            }


        },

        update : function(){ // 更新背景
            this.x -= this.speed;
            if(this.x < - this.width){
                this.x = 0
            }
        },

        pause : function(){
            this.speed = 0;
        }

    });

})();
