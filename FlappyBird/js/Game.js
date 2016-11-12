
// 游戏类
(function(){

    window.Game = Class.extend({

        init : function(option){  // 初始化游戏

            var self = this;
            // 1.内部参数
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");//上下文
            this.pipeDir = -1;
            this.canvasW = this.canvas.clientWidth;
            this.canvasH = this.canvas.clientHeight;
            this.fps = option.fps || 60; //帧率
            this.timer = null;
            this.allImageObj = {};  //全部图片集合
            this.isGameOver = false;


            // 2.游戏元素类
            // 2.1 帧率
            this.frames = new Frames();
            // 2.2 本地资源管理
            this.nativeSource = new NativeSource();
            this.nativeSource.loadImage("r.json",function(allImageObj,allImageCount,loadImageCount){

                // 图片加载完成
                if (allImageCount == loadImageCount ) {
                    self.allImageObj = allImageObj;
                    self.run();
                }
            });

            // 2.3 管道pipe
            this.pipeArr = [];



        },

        run : function(){  // 运行游戏

            var self = this;
            self.timer = setInterval(function(){ //循环执行
                self.runLoop();
            },1000/self.fps);

             // 2.绘制背景
            // 2.1 绘制房子
            this.house = new Background({
                img : this.allImageObj["fangzi"],
                y   : this.canvasH - 256 -100,
              width : 300,
             height : 256,
             speed  : 2
            });

            // 2.2 绘制树
            this.tree = new Background({
                img : this.allImageObj["shu"],
                y   : this.canvasH  -216 - 48,
              width : 300,
             height : 216,
             speed  : 3
            });

            // 2.3 绘制地板
            this.floor = new Background({
                img : this.allImageObj["diban"],
                y   : this.canvasH - 48,
              width : 48,
             height : 48,
             speed  : 4
            });

            // 2.4 绘制小鸟
            this.bird = new Bird();
            this.bird.clickListen();

        },

        runLoop : function(){ // 游戏循环执行

            // 1.帧数相关
            this.frames.update();
            this.frames.render();

            // 2. 更新绘制背景
            this.house.update();
            this.house.render();
            this.tree.update();
            this.tree.render();
            this.floor.update();
            this.floor.render();

            // 3.更新绘制管道
            // 3.1 每过70帧绘制一个pipe
            if(!this.isGameOver && this.frames.totalFrames % 50 == 0){
                this.pipeDir *= -1;
                var pipe = new Pipe({
                    dir : this.pipeDir
                });
                this.pipeArr.push(pipe); //新建管道放入数组避免被清屏
            }

            this.pipeArr.forEach(function(item,index){
                item.update();
                item.render();
            });


            // 更新小鸟状态
            this.bird.update();
            this.bird.render();
        },

        pause : function(){
            clearInterval(this.timer);
        },

        gameOver : function(){

            this.isGameOver = true;
            //停止所有动画
            this.house.pause();
            this.tree.pause();
            this.floor.pause();

            this.pipeArr.forEach(function(item,index){
                item.pause();
            });

            //鸟死了
            this.bird.isDead = true;
        }
    });

})();
