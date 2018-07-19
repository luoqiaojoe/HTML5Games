
         var REDPLAYER = 1;
	     var BLACKPLAYER = 0;

         var chess = new Array();// 所有棋子的数组
	     var Map  = new Array(); //棋盘的棋子布局数组[9 + 1][10 + 1]
	     var m_LastCard;  //用户上次选定的棋子
	     var localPlayer = REDPLAYER; // localPlayer记录自己是红方还是黑方
	     
         
         var mycanvas=document.getElementById('myCanvas');
         var context = mycanvas.getContext('2d');

         var qipan=document.getElementById("qipan");//棋盘
         var shuai=document.getElementById("Info1");//红方走提示图形
         var jiang=document.getElementById("Info2");//黑方走提示图形
         var message_txt = document.getElementById("message_txt");
         //棋盘坐标点类
         function Point(x, y) {
             this.x = x;
             this.y = y;
         }
           
         function init(){
			//创建棋子布局数组Map[9 + 1][10 + 1]
			Map= new Array();
			var x,y;
			for (x = 0; x <=9+1; x++) {
				var temp= new Array();
				for (y = 0; y <=10+1; y++) {
					temp.push(-1);//此处无棋子
				}
				Map.push(temp);
			}
			initChess();//加载32个棋子Sprite，初始棋子布局
            
			shuai.setAttribute("visible",true);  //红帅显示，表示红方走
			jiang.setAttribute("visible",false);  //黑将不显示
			//监听鼠标单击事件
			mycanvas.addEventListener("mousedown", doMouseDown, false);        }
        function getPointOnCanvas(canvas, x, y) {            var bbox = canvas.getBoundingClientRect();            return { x: x - bbox.left * (canvas.width / bbox.width),                y: y - bbox.top * (canvas.height / bbox.height)            };
        }
        function doMouseDown(event) {
            var x = event.pageX;
            var y = event.pageY;
            var canvas = event.target;
            var loc = getPointOnCanvas(canvas, x, y);
            console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
            stageClick(loc);

        }
		//resetGame()重置游戏
		function resetGame() {
			cls_map();
			//清空所有棋子的数组chess
			for(var i = chess.length-1; i>=0; i-- ) //
			{
				 //注意不能for(i=0 ; i<chess.length; i++)
     			 var c = chess[i];	//Chess		
			     if(c!=null)
				 {
					 //this.removeChild(c); 	//将棋子c从场景中删除
					 chess.splice(i,1); 	//将棋子c从到数组中删除
				 }
			}
			initChess();//初始棋子布局
			shuai.setAttribute("visible", true);  //红帅显示，表示红方走
			jiang.setAttribute("visible", false);  //黑将不显示
			localPlayer = REDPLAYER;
		}
		
		function cls_map() {
			var i, j;
			for (i = 1; i <= 9; i++) {
				for (j = 1; j <= 10; j++) {
					Map[i][j] = -1;//此处无棋子
			}
			}
		}
		
		//改变玩家角色
		function reversePlayer() {
			if ( localPlayer == BLACKPLAYER){
				localPlayer = REDPLAYER;
				shuai.setAttribute("visible", true);  //红帅显示，表示红方走
				jiang.setAttribute("visible", false);  //黑将不显示
			}
			else{
				localPlayer = BLACKPLAYER;
				shuai.setAttribute("visible", false);  //红帅不显示
				jiang.setAttribute("visible", true);   //黑将显示，表示黑方走
			}
		}
		

		//棋盘上单击
		function stageClick(event) {
			// 目标处没棋子，移动棋子
			var  tempx,tempy;
			tempx = parseInt(Math.floor((event.x+60) / 76));
			tempy = parseInt(Math.floor((event.y+60) / 76));
            
			message_txt.innerHTML="x"+tempx+"y"+tempy;
			//防止超出范围
			if (tempx > 9 || tempy > 10 || tempx < 1 || tempy < 1)
			{
				message_txt.innerHTML="超出棋盘范围";
			    return;
			}
			if( m_LastCard == null ) //如果之前没有选择任何棋子
			{
			    if (Map[tempx][tempy] != -1) {
                    var c=chess[Map[tempx][tempy]];
                    if(!isMyChess(c)){
                        message_txt.innerHTML = "请选择自己的棋子";
			            return;
                    }
			        m_LastCard = chess[Map[tempx][tempy]];
			        m_LastCard.drawSelectedChess(context);  //对选中的棋子画示意边框
			    }
			    else
			        return;
			}
            else if( IsAbleToPut(m_LastCard, tempx, tempy)){
				//移动棋子
				var idx, idx2; 		// 保存第一次和第二次被单击棋子的索引号
				var x1, y1; 		// 第1次被单击棋子在棋盘原坐标
				x1 = m_LastCard.pos.x;
                y1 = m_LastCard.pos.y;
				var x2, y2; 		// 第2次被单击棋子在棋盘坐标
				x2=tempx;	y2=tempy;
				idx = Map[x1][y1];
				idx2 = Map[x2][y2];
				Map[x1][y1] = -1;
				Map[x2][y2] = idx;
				message_txt.innerHTML = "x2:" + x2 + "y2:" + y2;
				chess[idx].SetPos(x2, y2);
				//判断被吃的是对方的将否
				if (idx2 == 0) // 0---"将"				
					message_txt.innerHTML = "红方赢了";
				if (idx2 == 16) // 16--"帅"
					message_txt.innerHTML = "黑方赢了";
				//m_LastCard.setScale(0.55); 	//取消该棋子的选中状态
				m_LastCard = null;
				Draw();//重画棋盘和棋子
				reversePlayer();			//改变玩家角色
			}else {
				// 错误走棋
				message_txt.innerHTML = "不符合走棋规则222";				
			}
		}	

		
		// 布置棋子，黑上，红下
		function initChess() {//创建32个棋子
			// 布置黑方棋子chess[0]--chess[15]
			var c;//Chess
			c=new Chess(BLACKPLAYER, "将", new Point(5, 1));
			chess.push(c);//将黑"将"棋子添加到数组
			Map[5][1] = 0;
			c= new Chess(BLACKPLAYER, "士", new Point(4, 1));
			chess.push(c);//将黑"士"棋子添加到数组
			Map[4][1] = 1;
			c= new Chess(BLACKPLAYER, "士", new Point(6, 1));
			chess.push(c);
			Map[6][1] = 2;
			c = new Chess(BLACKPLAYER, "象", new Point(3, 1));
			chess.push(c);
			Map[3][1] = 3;
			c= new Chess(BLACKPLAYER, "象", new Point(7, 1));
			chess.push(c);
			Map[7][1] = 4;
			c= new Chess(BLACKPLAYER, "马", new Point(2, 1));
			chess.push(c);
			Map[2][1] = 5;
			c= new Chess(BLACKPLAYER, "马", new Point(8, 1));
			chess.push(c);
			Map[8][1] = 6;

			c = new Chess(BLACKPLAYER, "车", new Point(1, 1));
			chess.push(c);
			Map[1][1] = 7;
			c = new Chess(BLACKPLAYER, "车", new Point(9, 1));
			chess.push(c);
			Map[9][1] = 8;

			c = new Chess(BLACKPLAYER, "炮", new Point(2, 3));
			chess.push(c);
			Map[2][3] = 9;
			c = new Chess(BLACKPLAYER, "炮", new Point(8, 3));
			chess.push(c);
			Map[8][3] = 10;

			var i;
			for (i = 0; i <= 4; i++) {
				c = new Chess(BLACKPLAYER, "卒", new Point(1 + i * 2, 4));
				chess.push(c);
				Map[1 + i * 2][4] = 11 + i;
			}

			// 布置红方棋子chess[16]--chess[31]
			c= new Chess(REDPLAYER, "帅", new Point(5, 10));
			chess.push(c);//将红"帅"棋子添加到数组
			Map[5][10] = 16;
			c = new Chess(REDPLAYER, "仕", new Point(4, 10));
			chess.push(c);//将红"仕"棋子添加到数组
			Map[4][10] = 17;
			c = new Chess(REDPLAYER, "仕", new Point(6, 10));
			chess.push(c);
			Map[6][10] = 18;
			c = new Chess(REDPLAYER, "相", new Point(3, 10));
			chess.push(c);
			Map[3][10] = 19;
			c = new Chess(REDPLAYER, "相", new Point(7, 10));
			chess.push(c);
			Map[7][10] = 20;
			c = new Chess(REDPLAYER, "马", new Point(2, 10));
			chess.push(c);
			Map[2][10] = 21;
			c = new Chess(REDPLAYER, "马", new Point(8, 10));
			chess.push(c);
			Map[8][10] = 22;

			c = new Chess(REDPLAYER, "车", new Point(1, 10));
			chess.push(c);
			Map[1][10] = 23;
			c = new Chess(REDPLAYER, "车", new Point(9, 10));
			chess.push(c);
			Map[9][10] = 24;

			c = new Chess(REDPLAYER, "炮", new Point(2, 8));
			chess.push(c);
			Map[2][8] = 25;
			c = new Chess(REDPLAYER, "炮", new Point(8, 8));
			chess.push(c);
			Map[8][8] = 26;

			for (i = 0; i <= 4; i++) {
				c = new Chess(REDPLAYER, "兵", new Point(1 + i * 2, 7));
				chess.push(c);
				Map[1 + i * 2][7] = 27 + i;
			}
			console.log(chess);
			DrawALL();
		}
		function DrawALL() {
		    context.drawImage(qipan, 0, 0);	
		    for (i = 0; i < 32; i++) {
		        chess[i].showPic(context); //将棋子添加到场景
		    }
		    /*var pic = new Image();
		    pic.src = "res/卒1.png"
            pic.onload = function () {//图片加载完成时显示到画板
		        context.drawImage(pic, 120, 0);
		    }*/
		}
		function Draw() {
		    context.drawImage(qipan, 0, 0);
            var i, j;
			for (i = 1; i <= 9; i++)  
				for (j = 1; j <= 10; j++)  
					if(Map[i][j] != -1)//此处有棋子
			             chess[Map[i][j]].showPic(context); //将棋子添加到场景
		}

		function isMyChess(c) {//Chess
			if (c.player != localPlayer) {
			   message_txt.innerHTML="单击成对方棋子了!"
			   return false;			   
			}
			return true;
		}
//		//棋子上单击
//		 function chessClicked(event){
//			message_txt.innerHTML="";
//			var c =(event.currentTarget); 		//获取用户点选的棋子对象
//			//selectChess(e);				
//			// 画选中棋子的示意边框线
//			//c.drawSelectedChess();			
//			//this.graphics.lineStyle(3,0xFF);
//			//graphics.drawRect(c.pos.x*40, c.pos.y*40 ,  38,  38);
//			if( m_LastCard == null && !isMyChess(c)) {
//				message_txt.innerHTML="请选择自己的棋子";
//				event.stopPropagation();
//				return;
//			}			
//			if( m_LastCard == null ) 
//			{//如果之前没有选择任何棋子
//				m_LastCard = c; 					    //选中张棋子
//				m_LastCard.drawSelectedChess(context);  //对选中的棋子进行缩放
//			}
//			else if( c == m_LastCard ) 
//			{//如果此次选中的棋子与之前选择的棋子是同一棋子
//				m_LastCard.setScale( 0.55 ); 				//取消该棋子的选中状态
//				m_LastCard = null;
//			}
//			else if(isMyChess(c))
//			{
//				//重新选中自己的棋子								
//				m_LastCard.setScale( 0.55 ); 		//取消该棋子的选中状态
//				m_LastCard = c ;
//				m_LastCard.setScale( 0.65 ); 		//当前选中的棋子作为之前选择的棋子
//				
//			}
//			else if( !isMyChess(c) &&IsAbleToPut(m_LastCard, c.pos.x, c.pos.y))
//			{
//				var idx, idx2; // 保存第一次和第二次被单击棋子的索引号
//				var x1, y1; // 第1次被单击棋子在棋盘原坐标
//				x1=m_LastCard.pos.x;	y1=m_LastCard.pos.y;
//				var x2, y2; // 第2次被单击棋子在棋盘坐标
//				x2=c.pos.x;	y2=c.pos.y;
//				
//				c.visible = false;				
//				idx = Map[x1][y1];
//				idx2 = Map[x2][y2];
//				Map[x1][y1] = -1;
//				Map[x2][y2] = idx;
//				chess[idx].SetPos(x2, y2);
//				m_LastCard.setScale(0.55); 			//取消该棋子的选中状态
//				m_LastCard = null;
//				
//				//判断被吃的是对方的将否
//				if (idx2 == 0) // 0---"将"				
//					message_txt.innerHTML = "红方赢了";
//				if (idx2 == 16) // 16--"帅"
//					message_txt.innerHTML = "黑方赢了";
//				reversePlayer();					//改变玩家角色
//			}else {
//				// 错误走棋
//				message_txt.innerHTML = "不符合走棋规则111";
//				//否则选中新的棋子，继续监听用户操作
//				m_LastCard.setScale( 0.55 ); 		//取消该棋子的选中状态
//				m_LastCard = null ;				
//			}
//			event.stopPropagation();
//		}
		
		
	// IsAbleToPut(firstchess:Chess, x, y)实现判断是否能走棋返回逻辑值，这代码最复杂。
	 function  IsAbleToPut(firstchess , x, y) {
		var i, j, c,t ;
		var oldx, oldy; // 在棋盘原坐标
		oldx = firstchess.pos.x;
		oldy = firstchess.pos.y;
		var qi_name = firstchess.chessName;
		if (qi_name==("将") || qi_name==("帅")) {
			if ((x - oldx) * (y - oldy) != 0) {
				return false;
			}
			if (Math.abs(x - oldx) > 1 || Math.abs(y - oldy) > 1) {
				return false;
			}
			if (x < 4 || x > 6 || (y > 3 && y < 8)) {
				return false;
			}
			return true;
		}
		if (qi_name==("士") || qi_name==("仕")) {
			if ((x - oldx) * (y - oldy) == 0) {
				return false;
			}
			if (Math.abs(x - oldx) > 1 || Math.abs(y - oldy) > 1) {
				return false;
			}
			if (x < 4 || x > 6 || (y > 3 && y < 8)) {
				return false;
			}
			return true;
		}

		if (qi_name==("象") || qi_name==("相")) {
			if ((x - oldx) * (y - oldy) == 0) {
				return false;
			}
			if (Math.abs(x - oldx) != 2 || Math.abs(y - oldy) != 2) {
				return false;
			}
			if (y < 6 &&qi_name=="相") {//红相，应该在棋盘下方
				return false;
			}
			if (y > 5 &&qi_name=="象") {//黑象，应该在棋盘上方
				return false;
			}
			i = 0; // i,j必须有初始值
			j = 0;
			if (x - oldx == 2) {
				i = x - 1;
			}
			if (x - oldx == -2) {
				i = x + 1;
			}
			if (y - oldy == 2) {
				j = y - 1;
			}
			if (y - oldy == -2) {
				j = y + 1;
			}
			if (Map[i][j] != -1) {
				return false;
			}
			return true;
		}
		if (qi_name==("马") || qi_name==("马")) {
			if (Math.abs(x - oldx) * Math.abs(y - oldy) != 2) {
				return false;
			}
			if (x - oldx == 2) {
				if (Map[x - 1][oldy] != -1) {
					return false;
				}
			}
			if (x - oldx == -2) {
				if (Map[x + 1][oldy] != -1) {
					return false;
				}
			}
			if (y - oldy == 2) {
				if (Map[oldx][y - 1] != -1) {
					return false;
				}
			}
			if (y - oldy == -2) {
				if (Map[oldx][y + 1] != -1) {
					return false;
				}
			}
			return true;
		}
		if (qi_name==("车") || qi_name==("车")) {
			// 判断是否直线
			if ((x - oldx) * (y - oldy) != 0) {
				return false;
			}
			// 判断是否隔有棋子
			if (x != oldx) {
				if (oldx > x) {
					t = x;
					x = oldx;
					oldx = t;
				}
				for (i = oldx; i <= x; i += 1) {
					if (i != x && i != oldx) {
						if (Map[i][y] != -1) {
							return false;
						}
					}
				}
			}
			if (y != oldy) {
				if (oldy > y) {
					t = y;
					y = oldy;
					oldy = t;
				}
				for (j = oldy; j <= y; j += 1) {
					if (j != y && j != oldy) {
						if (Map[x][j] != -1) {
							return false;
						}
					}
				}
			}
			return true;
		}
		if (qi_name==("炮") || qi_name==("炮")) {
			var  swapflagx = false;
			var  swapflagy = false;
			if ((x - oldx) * (y - oldy) != 0) {
				return false;
			}
			c = 0;
			if (x != oldx) {
				if (oldx > x) {
					t = x;
					x = oldx;
					oldx = t;
					swapflagx = true;
				}
				for (i = oldx; i <= x; i += 1) {
					if (i != x && i != oldx) {
						if (Map[i][y] != -1) {
							c = c + 1;
						}
					}
				}
			}
			if (y != oldy) {
				if (oldy > y) {
					t = y;
					y = oldy;
					oldy = t;
					swapflagy = true;
				}
				for (j = oldy; j <= y; j += 1) {
					if (j != y && j != oldy) {
						if (Map[x][j] != -1) {
							c = c + 1;
						}
					}
				}
			}
			if (c > 1) // 与目标处间隔1个以上棋子
			{
				return false;
			}
			if (c == 0) // 与目标处无间隔棋子
			{
				if (swapflagx == true) {
					t = x;
					x = oldx;
					oldx = t;
				}
				if (swapflagy == true) {
					t = y;
					y = oldy;
					oldy = t;
				}
				if (Map[x][y] != -1) {
					return false;
				}
			}
			if (c == 1) // 与目标处间隔1个棋子
			{
				if (swapflagx == true) {
					t = x;
					x = oldx;
					oldx = t;
				}
				if (swapflagy == true) {
					t = y;
					y = oldy;
					oldy = t;
				}
				if (Map[x][y] == -1) // 如果目标处无棋子，则不能走此步
				{
					return false;
				}
			}
			return true;
		}
		if (qi_name==("卒") || qi_name==("兵")) {
			if ((x - oldx) * (y - oldy) != 0) {
				return false;
			}
			if (Math.abs(x - oldx) > 1 || Math.abs(y - oldy) > 1) {
				return false;
			}
			
			if (qi_name==("兵")) {
				if (y >= 6 && (x - oldx) != 0) {//没过河且横走
				  return false;
				}
				if (y - oldy > 0) {//后退
				  return false;
				}
			}
			if (qi_name==("卒")){
				if (y <= 5 && (x - oldx) != 0) {//没过河且横走
				  return false;
				}
				if (y - oldy < 0) {//后退
				  return false;
				}
			}
			return true;
		}
		return false;
	}
		
