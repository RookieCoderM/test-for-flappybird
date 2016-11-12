
//管理本地资源文件
(function(){

    window.NativeSource = Class.extend({

        init : function(){ // 初始化

            this.allImageObj = {};
            this.loadImageCount = 0; // 已加载图片数量
        },

        loadImage : function(url,callback){ // 获取图片数据

            var self = this;
            var xhr = new XMLHttpRequest();  //ajax

            xhr.open("get",url)
            xhr.send();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){ //完成请求

                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){ //成功

                        var imageArr = JSON.parse(xhr.responseText).images;

                        var allImageCount = imageArr.length;
                        // 遍历数组 创建image对象
                        imageArr.forEach(function(item,index){

                            var image = new Image();
                            image.src = item.src;
                            image.onload = function(){
                                self.loadImageCount++;
                                self.allImageObj[item.name] = this; // name : image

                                callback(self.allImageObj,allImageCount,self.loadImageCount);
                            }
                        });
                    }
                }
            }
        }

    });

})();
