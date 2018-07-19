		var KONG = 0;//空位置KONG
		var BLACK = 2;//黑色棋子
		var WHITE = 1;//白色棋子
		var N = 0;//空位置
		var B = 2;//有黑色棋子（人的棋）
		var W = 1;//有白色棋子（电脑的棋）
		var S = 3;//需要下子的位置
		//数组Chess存储棋谱
		var Chess  =  [	
			//一个棋子的情况
			[   N,	N,	N,	S,	B ],
			[   B,	S,	N,	N,	N ],
			[   N,	N,	N,	S,	B ],	
			[   N,	B,	S,	N,	N ],		
			[   N,	N,	S,	B,	N ],
			[   N,	N,	B,	S,	N ],
			[   N,	N,	N,	S,	W ],
			[   W,	S,	N,	N,	N ],
			[   N,	N,	N,	S,	W ],	
			[   N,	W,	S,	N,	N ],		
			[   N,	N,	S,	W,	N ],
			[   N,	N,	W,	S,	N ],
			//两个棋子的情况
			[ B,	B,	S,	N,	N ],
			[ N,	N,	S,	B,	B ],
			[ B,	S,	B,	N,	N ],
			[ N,	N,	B,	S,	B ],
			[ N,	B,	S,	B,	N ],
			[ N,	B,	B,	S,	N ],
			[ N,	S,	B,	B,	N ],
			[ W,	W,	S,	N,	N ],
			[ N,	N,	S,	W,	W ],
			[ W,	S,	W,	N,	N ],
			[ N,	N,	W,	S,	W ],
			[ N,	W,	S,	W,	N ],
			[ N,	W,	W,	S,	N ],
			[ N,	S,	W,	W,	N ],
			//三个棋子的情况
			[N,	S,	B,	B,	B ],
			[B,	B,	B,	S,	N ],
			[N,	B,	B,	B,	S ],	
			[N,	B,	S,	B,	B ],
			[B,	B,	S,	B,	N ],
			[N,	S,	W,	W,	W ],
			[W,	W,	W,	S,	N ],
			[N,	W,	W,	W,	S ],	
			[N,	W,	S,	W,	W ],
			[W,	W,	S,	W,	N ],
			//四个棋子的情况
			[   S, 	B,  B,  B,  B 	],	
			[   B, 	S,  B,  B,  B 	],
			[   B,  B,  S,	B,  B 	],
			[   B,  B,  B, 	S,  B 	],
			[   B,  B,  B,  B,  S 	],
			[   S,  W,  W,  W,  W 	],	
			[   W, 	S,  W,  W,  W 	],
			[   W,  W,  S, 	W,  W 	],
			[   W,  W,  W, 	S,  W 	],
			[   W,  W,  W,  W,  S 	]];
		 var m_nCurCol = -1;//电脑最近一次下棋位置的列号
		 var m_nCurRow = -1;//电脑最近一次下棋位置的行号

		function Point(x,y)
		{ 
		   this.x=x;
		   this.y=y;
		}

		//获取电脑下子位置
		 function GetComputerPos()//Point
	        {
			return  new Point(m_nCurCol,m_nCurRow);
		}
		//电脑的输入，参数grid为棋盘格子
		 function Input(grid){//grid是Array
			var rowSel,colSel,nLevel;
			var index,nLevel;
			var j;
			m_nCurCol = -1;//存储临时的选择位置
			m_nCurRow = -1;
			nLevel = -1;//存储临时选择的棋谱级别
			var bFind;//是否符合棋谱的标志
			for (var row = 0; row < 15; row ++)
			{//遍历棋盘的所有行
				for (var col = 0; col < 15; col ++)
				{//遍历棋盘的所有列
					for (var i = Chess.length - 1; i >= 0; i --)
					{//遍历所有级别的棋谱
					//查看从当前棋子开始的横向五个棋子是否符合该级别的棋谱
						if ( col + 4 < 15 )
						{
							rowSel = -1;
							colSel = -1;
							bFind = true;
							for ( j = 0; j < 5; j ++)
							{
								index = grid[col + j][row];
								if ( index == KONG )
								{//如果该位置没有棋子，对应的棋谱位置上只能是S或N
									if (Chess[i][j] == S)
									{//如果是S，则保存位置
										rowSel = row;
										colSel = col + j;
									}
									else if ( Chess[i][j] != N )
									{//不是S也不是N，则不符合这个棋谱，结束循环
										bFind = false;
										break;
									}
								}
								if ( index == BLACK && Chess[i][j] != B )
								{//如果是黑色棋，对应的棋谱位置上应是B，否则结束循环
									bFind = false;
									break;
								}
								if ( index == WHITE && Chess[i][j] != W )
								{//如果是白色棋，对应的棋谱位置上应是W，否则结束循环
									bFind = false;
									break;
								}
							}
							if ( bFind && i > nLevel )
							{//如果符合此棋谱，且该棋谱比上次找到棋谱的级别高
								nLevel = i;//保存级别
								m_nCurCol = colSel;//保存位置
								m_nCurRow = rowSel;
								break;//遍历其他级别的棋谱
							}
						}

						//查看从当前棋子开始的纵向五个棋子是否符合该级别的棋谱
						if ( row + 4 < 15 )
						{
							rowSel = -1;
							colSel = -1;
							bFind = true;
							for (j = 0; j < 5; j ++)
							{
								index = grid[col][row + j];
								if ( index == KONG )
								{//如果该位置没有棋子，对应的棋谱位置上只能是S或N
									if (Chess[i][j] == S)
									{//如果是S，则保存位置
										rowSel = row + j;
										colSel = col;
									}
									else if ( Chess[i][j] != N )
									{//不是S也不是N，则不符合这个棋谱，结束循环
										bFind = false;
										break;
									}
								}
								if ( index == BLACK )
								{//如果是黑色棋，对应的棋谱位置上应是B，否则结束循环
									if (Chess[i][j] != B)
									{
										bFind = false;
										break;
									}
								}
								if ( index == WHITE && Chess[i][j] != W )
								{//如果是白色棋，对应的棋谱位置上应是W，否则结束循环
									bFind = false;
									break;
								}
							}
							if ( bFind && i > nLevel )
							{//如果符合此棋谱，且该棋谱比上次找到棋谱的级别高
								nLevel = i;//保存级别
								m_nCurCol = colSel;//保存位置
								m_nCurRow = rowSel;
								break;//遍历其他级别的棋谱
							}
						}

						//查看从当前棋子开始的斜45度向下的五个棋子是否符合该级别的棋谱
						if ( col - 4 >= 0 && row + 4 < 15 )
						{
							rowSel = -1;
							colSel = -1;
							bFind = true;
							for (j = 0; j < 5; j ++)
							{
								index = grid[col - j][row + j];
								if ( index == KONG )
								{//如果该位置没有棋子，对应的棋谱位置上只能是S或N
									if (Chess[i][j] == S)
									{//如果是S，则保存位置
										rowSel = row + j;
										colSel = col - j;
									}
									else if ( Chess[i][j] != N )
									{//不是S也不是N，则不符合这个棋谱，结束循环
										bFind = false;
										break;
									}
								}
								if ( index == BLACK && Chess[i][j] != B )
								{//如果是黑色棋，对应的棋谱位置上应是B，否则结束循环
									bFind = false;
									break;
								}
								if ( index == WHITE && Chess[i][j] != W )
								{//如果是白色棋，对应的棋谱位置上应是W，否则结束循环
									bFind = false;
									break;
								}
							}
							if ( bFind && i > nLevel )
							{//如果符合此棋谱，且该棋谱比上次找到棋谱的级别高
								nLevel = i;//保存级别
								m_nCurCol = colSel;//保存位置
								m_nCurRow = rowSel;
								break;//遍历其他级别的棋谱
							}
						}

						//斜135度的五个棋子
						if ( col + 4 < 15 && row + 4 < 15 )
						{//查看从当前棋子开始的斜135度向下的五个棋子是否符合该级别的棋谱
							rowSel = -1;
							colSel = -1;
							bFind = true;
							for (j = 0; j < 5; j ++)
							{
								index = grid[col + j][row + j];
								if ( index == KONG )
								{//如果该位置没有棋子，对应的棋谱位置上只能是S或N
									if (Chess[i][j] == S)
									{//如果是S，则保存位置
										rowSel = row + j;
										colSel = col + j;
									}
									else if ( Chess[i][j] != N )
									{//不是S也不是N，则不符合这个棋谱，结束循环
										bFind = false;
										break;
									}
								}
								if ( index == BLACK && Chess[i][j] != B )
								{//如果是黑色棋，对应的棋谱位置上应是B，否则结束循环
									bFind = false;
									break;
								}
								if ( index == WHITE && Chess[i][j] != W )
								{//如果是白色棋，对应的棋谱位置上应是W，否则结束循环
									bFind = false;
									break;
								}
							}
							if ( bFind && i > nLevel )
							{//如果符合此棋谱，且该棋谱比上次找到棋谱的级别高
								nLevel = i;//保存级别
								m_nCurCol = colSel;//保存位置
								m_nCurRow = rowSel;
								break;//遍历其他级别的棋谱
							}
						}
					}
				}
			}
			if ( m_nCurRow != -1 )
			{//如果选择了一个最佳位置
				grid[m_nCurCol][m_nCurRow]= WHITE ;
				return true;
			}
			//如果所有棋谱都不符合,则随便找一个空位置
			while(true)
			{
				var col;
				var row;
				col=int(Math.random()*15);
				row=int(Math.random()*15);
				if (grid[col][row] == KONG)
				{
					grid[col][row] = WHITE ;
					m_nCurCol = col;
					m_nCurRow = row;
					return true;
				}
			}
			return false;
		}
