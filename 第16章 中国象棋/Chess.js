    //棋子类
	var REDPLAYER = 1;// 红子为REDPLAYER，黑子为BLACKPLAYER
	var BLACKPLAYER = 0;

	var mycanvas = document.getElementById('myCanvas');
	var context = mycanvas.getContext('2d');
	/*构造函数
	*参数chesspos指定棋子的位置，参数player指定棋手角色的类型
    *参数chessName指定棋子的类型
	*/
    function Chess(player, chessName, chesspos) {
			this.player = player;      // 红子为REDPLAYER，黑子为BLACKPLAYER
			this.chessName = chessName;// 帅、士...
			this.pos = chesspos;       // 在棋盘中位置
			this.x = this.pos.x * 76-60;           //像素坐标
			this.y = this.pos.y * 76-60;

			
		// 初始化棋子图案		
		if (player ==REDPLAYER) {// 红方棋子
			if (chessName=="帅")
				this.setPic("res/帅.png");
			else if (chessName=="仕")
				this.setPic("res/士.png");
			else if (chessName=="相")
				this.setPic("res/相.png");
			else if (chessName=="马")
				this.setPic("res/马.png");
			else if (chessName=="车")
				this.setPic("res/车.png");
			else if (chessName=="炮")
				this.setPic("res/炮.png");
			else if (chessName=="兵")
				this.setPic("res/兵.png");
		} 
		else{// 黑方棋子
			if (chessName=="将")
				this.setPic("res/将1.png");
			else if(chessName=="士")
			    this.setPic("res/仕1.png");
			else if (chessName=="象")
				this.setPic("res/象1.png");
			else if (chessName=="马")
				this.setPic("res/马1.png");
			else if (chessName=="车")
				this.setPic("res/车1.png");
			else if (chessName=="炮")
				this.setPic("res/炮1.png");
			else if (chessName=="卒")
				this.setPic("res/卒1.png");
		}
      
	}
    Chess.prototype.setPic = function (p) // 设置棋子图片
	{
	    this.pic = p;
    }
    Chess.prototype.showPic2 = function (context) // 显示棋子
    {
        var image = new Image();
        image.src = this.pic;
        image.onload = function () {//图片加载完成时显示到画板
            context.drawImage(image, this.x, this.y);
        }
    }
    Chess.prototype.showPic = function (context) // 显示棋子
    {
        if (this.player == REDPLAYER) {// 红方棋子
            var image1 = document.getElementById("Img" + this.chessName);
            context.drawImage(image1, this.x, this.y);
        } else {
            var image2 = document.getElementById("Img" + this.chessName + "1"); //+"1"
            context.drawImage(image2, this.x, this.y);
        }

    }
    Chess.prototype.SetPos = function (x, y) // 设置棋子位置
	{
		this.pos.x = x;
		this.pos.y = y;
		this.x = this.pos.x * 76 - 60;
		this.y = this.pos.y * 76 - 60;
    }
    Chess.prototype.ReversePos = function () // 棋子位置对调
	{
		this.pos.x = 10 - pos.x;
		this.pos.y = 11 - pos.y;
		this.x = this.pos.x * 76 - 60;
		this.y = this.pos.y * 76 - 60;
    }
    Chess.prototype.drawSelectedChess = function (context) {// 画选中棋子的示意边框线
        //this.graphics.lineStyle(3,0xFF);
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.beginPath();  //  开始绘图路径
        context.rect(this.x - 2, this.y - 2, 65, 65);
        context.stroke();
	}

