		//常量
		 var BLACK = 1;
		 var WHITE = 2;
		 var KONG  = 0;
         var w=80;
         var h=80;
		 var qizi =new Array();//构造一个qizi[][]二维数组用来存储棋子状态
		 var curQizi  = BLACK;// 当前走棋方
		
         var mycanvas=document.getElementById('myCanvas');
         var context = mycanvas.getContext('2d');
         var whitestone=document.getElementById("whitestone");//白棋图片
         var blackstone=document.getElementById("blackstone");//黑棋图片
         var qipan=document.getElementById("qi_pan1");//棋盘
         var info=document.getElementById("Info2");//提示图形
         var message_txt=document.getElementById("message_txt");
		 
         function init(){
             initLevel();// 棋盘上初始4个棋子
             showMoveInfo();
             mycanvas.addEventListener("mousedown",doMouseDown,false); 
         }
         function getPointOnCanvas(canvas, x, y) { 
             var bbox = canvas.getBoundingClientRect(); 
             return { x: x - bbox.left * (canvas.width / bbox.width),
                      y: y - bbox.top * (canvas.height / bbox.height)};
         }
         function doMouseDown(event) { 
             var x = event.pageX; 
             var y = event.pageY; 
             var canvas = event.target; 
             var loc = getPointOnCanvas(canvas, x, y); 
             console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")"); 
             clickQi(loc);
             
         }
         function showMoveInfo(){
             if (curQizi== BLACK)// 当前走棋方是黑棋
                  message_txt.innerHTML="该黑棋走子";
             else
                  message_txt.innerHTML="该白棋走子";
         }
         function initLevel() {
			//初始化界面
			var i,j;
			for (i=0; i<8; i++) {
				qizi[i]=new Array();
				for (j=0; j<8; j++) {
					qizi[i][j]=KONG;
				}
			}
			// 棋盘上初始4个棋子
			// 1为黑，2为白，0为无棋子
			qizi[3][3] = WHITE;
			
			qizi[4][4] = WHITE;
			
			qizi[3][4] = BLACK;
			
			qizi[4][3] = BLACK;		
			DrawMap();
			message_txt.innerHTML = "该黑棋走子";
		}
        //画棋盘和所有棋子
        function DrawMap( )
        {
            
	        context.clearRect ( 0 , 0 ,720 , 720); 
            //InitMap();          //画通道，平铺方块
            context.drawImage(qipan,0,0,qipan.width,qipan.height);	
	        for(i=0;i<qizi.length;i++)//行号
	        {
		        for(j=0;j<qizi[i].length;j++)//列号
		        {
			        var pic;
			        switch (qizi[i][j])
			        {
				        case 0:
					        break;
				        case 1:
				            pic = blackstone;
				            context.drawImage(pic, w * j, h * i, pic.width, pic.height);
					        break;
				        case 2:
				            pic = whitestone;
				            context.drawImage(pic, w * j, h * i, pic.width, pic.height);
					        break;

			        }
		        }
	        }	
        }
        function DoHelp() {
			showCanPosition();//显示可以落子的位置

		}
		 function showCanPosition() {
			//显示可以落子的位置
			var i,j;
			var n = 0;//可以落子的位置统计
			for (i = 0; i <= 7; i++) {
				for (j = 0; j <= 7; j++) {
					if (qizi[i][j] == 0 && Can_go(i, j)) {
						n = n + 1;
                        pic=info;
						context.drawImage(pic,w*j+20,h*i+20,pic.width,pic.height);;//显示提示图形
					}
				}
			}
			//hitTimer.start();
			//hitTimer.addEventListener(TimerEvent.TIMER, clsCanPosition);
		}
//		 function clsCanPosition(event) {
//			var i,j;
//			
//			for (i = 0; i <= 7; i++) {
//				for (j = 0; j <= 7; j++) {
//					if (qizi[i][j] == 0 && Can_go(i, j)) {						
//						qipan[8 * i + j].gotoAndStop(4);//显示空图形
//					}
//				}
//			}
//			hitTimer.removeEventListener(TimerEvent.TIMER, clsCanPosition);
//		}
		 function clickQi(thisQi) {
			var x1, y1;
			x1 = Math.round((thisQi.y - 40) / 80); //parseInt()丢弃小数部分, 保留整数部分
			y1 = Math.round((thisQi.x - 40) / 80);

			if (Can_go(x1, y1)) {// 判断当前位置是否可以放棋子
				//trace("can");
				qizi[x1][y1] = curQizi;
				FanALLQi(x1, y1);// 从左，左上，上，右上，右，右下，下，左下八个方向翻转对方的棋
				DrawMap();
				//判断对方是否有棋可走，如有交换走棋方
				if (curQizi==WHITE &&checkNext(BLACK) ||curQizi==BLACK &&checkNext(WHITE)) {
					if (curQizi==WHITE) {
						curQizi=BLACK;
						message_txt.innerHTML = "该黑棋走子";
					} else {
						curQizi=WHITE;
						message_txt.innerHTML = "该白棋走子";
					}
				} else if (checkNext(curQizi)) {
                       //判断自己是否有棋可走，如有，给出提示
                        message_txt.innerHTML = "对方无棋可走，请继续";
				} else {//双方都无棋可走，游戏结束，显示输赢信息
					isLoseWin();
				}//统计双方的棋子数量，显示输赢信息。
			}
            else {
                message_txt.innerHTML = "不能落子!";
			}
		}
		function Can_go( x1,  y1){
			//从左，左上，上，右上，右，右下，下，左下八个方向判断 
			if (CheckDirect(x1, y1, -1, 0) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, -1, -1) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, 0, -1) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, 1, -1) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, 1, 0) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, 1, 1) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, 0, 1) == true) {
				return true;
			}
			if (CheckDirect(x1, y1, -1, 1) == true) {
				return true;
			}
			return false;
		}
		function CheckDirect( x1,  y1,  dx,  dy){
			var x,y;
			var flag= false;
			x = x1 + dx;
			y = y1 + dy;
			while (InBoard(x, y) && !Ismychess(x, y) && qizi[x][y] != 0) {
				x += dx;
				y += dy;
				flag = true;//构成夹击之势 
			}
			if (InBoard(x, y) && Ismychess(x, y) && flag == true) {
				return true;//该方向落子有效 
			}
			return false;
		}
		function Ismychess(x,  y ) {
			if (qizi[x][y] == curQizi) {
				return true;
			} else {
				return false;
			}
		}

		 function DirectReverse(x1, y1, dx, dy) {
			var x, y;
			var flag= false;
			x = x1 + dx;
			y = y1 + dy;

			while (InBoard(x, y) && !Ismychess(x, y) && qizi[x][y] != 0) {
				x += dx;
				y += dy;
				flag = true;//构成夹击之势 
			}
			if (InBoard(x, y) && Ismychess(x, y) && flag == true) {
				do {
					x -= dx;
					y -= dy;
					if ((x != x1 || y != y1)) {
						FanQi(x, y);
					}
				} while ((x != x1 || y != y1));
			}
		}
		 function FanQi(x, y) {
			if (qizi[x][y] == BLACK) {
				qizi[x][y] = WHITE;	
			} 
            else {
				qizi[x][y] = BLACK;				
			}
		}
		 function FanALLQi(x1, y1) {
			//从左，左上，上，右上，右，右下，下，左下八个方向翻转 
			if (CheckDirect(x1, y1, -1, 0) == true) {
				DirectReverse(x1, y1, -1, 0);
			}
			if (CheckDirect(x1, y1, -1, -1) == true) {
				DirectReverse(x1, y1, -1, -1);
			}
			if (CheckDirect(x1, y1, 0, -1) == true) {
				DirectReverse(x1, y1, 0, -1);
			}
			if (CheckDirect(x1, y1, 1, -1) == true) {
				DirectReverse(x1, y1, 1, -1);
			}
			if (CheckDirect(x1, y1, 1, 0) == true) {
				DirectReverse(x1, y1, 1, 0);
			}
			if (CheckDirect(x1, y1, 1, 1) == true) {
				DirectReverse(x1, y1, 1, 1);
			}
			if (CheckDirect(x1, y1, 0, 1) == true) {
				DirectReverse(x1, y1, 0, 1);
			}
			if (CheckDirect(x1, y1, -1, 1) == true) {
				DirectReverse(x1, y1, -1, 1);
			}
		}
		//InBoard()判断（x,y）是否在棋盘界内，如果在界内则返回真，否则返回假。
		 function InBoard(x,y ){
			if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
				return true;
			} else {
				return false;
			}
		}
		// 显示输赢信息
		 function isLoseWin() {
			var whitenum = 0;
			var blacknum = 0;
			var n = 0,x,y;
			for (x = 0; x <= 8; x++) {
				for (y = 0; y <= 8; y++) {
					if (qizi[x][y] != 0) {
						n = n + 1;
						if (qizi[x][y] == 2) {
							whitenum += 1;
						}
						if (qizi[x][y] == 1) {
							blacknum += 1;
						}
					}
				}
			}
			if (blacknum > whitenum) {
			    message_txt.innerHTML = "游戏结束黑方胜利,黑方:" + String(blacknum) + "白方:" + String(whitenum);
			} else {
			    message_txt.innerHTML = "游戏结束白方胜利, 黑方:" + String(blacknum) + "白方:" + String(whitenum);
			}
		}
		/**
		 * 验证参数代表的走棋方是否还有棋可走
		 * @param i   代表走棋方，1为黑方，2为白方
		 * @return true/false
		 */
		 function checkNext(i){
            old=curQizi;
            curQizi=i;
			if ( Can_Num()>0) {
                curQizi=old;
				return true;
			} 
            else {
                curQizi=old;
				return false;
			}
		}
		 function Can_Num() {//统计可以落子的位置数
			var i, j, n = 0;
			for (i = 1; i <= 8; i++) {
				for (j = 1; j <= 8; j++) {
					if (Can_go(i, j)) {
						n = n + 1;
					}
				}
			}
			return n;//可以落子的位置个数 
         }
 
