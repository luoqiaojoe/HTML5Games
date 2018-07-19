var w=32;
var h=32;
var curMap; //当前地图数据数组，初始与CurLevel相同，游戏中改变
var oldMap; //保存上次人物移动前地图数据数组
var CurLevel;//当前级地图数据，游戏中不变，用来判断游戏是否结束
var iCurLevel=0;//当前是第几关
var curMan;//当前小人图片
var UseTime=0;//当前关用时，单位：秒
var MoveTimes=0;//移动次数 
var mycanvas=document.getElementById('myCanvas');
var context = mycanvas.getContext('2d');
var block=document.getElementById("block");
var box=document.getElementById("box");
var wall=document.getElementById("wall");
var ball=document.getElementById("ball");
var redbox=document.getElementById("redbox");
var pdown=document.getElementById("pdown");
var pup=document.getElementById("pup");
var pleft=document.getElementById("pleft");
var pright=document.getElementById("pright");
var msg=document.getElementById("msg");

function Point(x,y)
{
    this.x=x;
    this.y=y;
}

var per_position=new Point(5,5);
function init()
{
    initLevel();
    showMoveInfo();
}

function initLevel()
{
    curMap = copyArray(levels[iCurLevel]);
    oldMap = copyArray(curMap);
    CurLevel=copyArray(levels[iCurLevel]);
    curMan=pdown;
    //InitMap();         //画通道，平铺方块
    DrawMap(curMap);    //画箱子、墙、人物、目的地信息
	
}
			 

//画通道，平铺方块
 function InitMap()
{	
    for(var i =0;i<CurLevel.length;i++){
	for(var j=0;j<CurLevel[i].length;j++){
             context.drawImage(block,w*i,h*j,w,h);
        }
    }    	
}
function DrawMap(level)
{
	//context.clearRect ( 0 , 0 , w*16 , h*16 ); 
        InitMap();          //画通道，平铺方块	
	for(i=0;i<level.length;i++)//行号
	{
		for(j=0;j<level[i].length;j++)//列号
		{
			var pic=block;
			switch(level[i][j])
			{
				case 0:
					pic=block;
					break;
				case 1:
					pic=wall;
					break;
				case 2:
					pic=ball;
					break;
				case 3:
					pic=box;
					break;
				case 5:
					pic=redbox;
					break;
				case 4:
				pic=curMan;
				per_position.x=j;
				per_position.y=i;
				break;
			}
			context.drawImage(pic,w*j-(pic.width-w)/2,h*(i)-(pic.height-h),pic.width,pic.height);
			
		}
	}	
}

function go(dir)
{
	var p1;
	var p2;
				
	switch(dir)
	{
		case "left":
		    curMan = pleft; //人物图片为向左走的图片
		    p1=new Point(per_position.x-1,per_position.y);
		    p2=new Point(per_position.x-2,per_position.y);
		    break;
		case "right":
		    curMan = pright; //人物图片为向右走的图片
		    p1=new Point(per_position.x+1,per_position.y);
		    p2=new Point(per_position.x+2,per_position.y);
		    break;
		case "up":
		    curMan=pup;//人物图片为向上走的图片
		    p1=new Point(per_position.x,per_position.y-1);
		    p2=new Point(per_position.x,per_position.y-2);
		    break;

		case "down":
		    curMan = pdown; //人物图片为向下走的图片
		    p1=new Point(per_position.x,per_position.y+1);
		    p2=new Point(per_position.x,per_position.y+2);
		    break;
	}
	if(TryGo(p1,p2))//如果能够移动
	{
		this.MoveTimes++;//次数加1
		showMoveInfo(); //显示移动次数信息
	}
	//InitMap();
	DrawMap(curMap);
				
	if(CheckFinish())
	{
		alert("恭喜过关。");
		NextLevel(1);//开始下一关
	}
}
function TryGo(p1,p2) //判断是否可以移动
{
	if(p1.x<0) return false;
	if(p1.y<0) return false;
	if(p1.y>=curMap.length) return false;
	if(p1.x>=curMap[0].length) return false;
				
	if(curMap[p1.y][p1.x]==1)return false;//如果是墙，不能通行
	if(curMap[p1.y][p1.x]==3 ||curMap[p1.y][p1.x]==5)//如果是箱子，继续判断前一格
	{
		if(curMap[p2.y][p2.x]==1 || curMap[p2.y][p2.x]==3 ||
				 curMap[p2.y][p2.x]==5)//前一格如果是墙或箱子都不能前进
			return false;
		if(curMap[p2.y][p2.x]==0 || curMap[p2.y][p2.x]==2)//如果P2为通道或者目的地
		{	
			oldMap = copyArray(curMap);		//记录现在地图
			//箱子前进一格
			curMap[p2.y][p2.x]=3; 
			//如果原始地图是目的地或者是放到目的地箱子
			if(CurLevel[p2.y][p2.x]==2 ||CurLevel[p2.y][p2.x]==5) 
				curMap[p2.y][p2.x]=5;
		}
	}
	canReDo = true;
	//工人前进一格
	curMap[p1.y][p1.x]=4;
	//处理工人原来位置是否显示目的地还是通道平地
	var v=CurLevel[per_position.y][per_position.x];	//获取工人原来位置原始地图信息
	if(v==2|| v==5)  //如果原来是目的地
		curMap[per_position.y][per_position.x]=2
	else
		curMap[per_position.y][per_position.x]=0;//显示通道平地

	per_position=p1;//记录位置
	return true;
}
			
//判断是否完成本关
function CheckFinish()
{
	for(var i=0;i<curMap.length;i++)//行号
	{
		for(var j=0;j<curMap[i].length;j++)//列号
		{
			if(CurLevel[i][j]==2 && curMap[i][j]!=5 || CurLevel[i][j]==5 && curMap[i][j]!=5)//如果目标位置上没放上箱子，则还没结束
			{
				return false;
			}
		}
	}
	return true;
}
function DoKeyDown(event)//判断用户按键获取移动方向
{
	switch(event.keyCode)				
	{
		case 37://left
			go('left');
                        msg.innerHTML="left";
			break;
		case 38://up
			go('up');
			break;
		case 39://right
			go('right');
			break;
		case 40://down
			go('down');
			break;
	}
}

function NextLevel(i)//初始化下i关
{
	iCurLevel=iCurLevel+i;
	if(iCurLevel<0)
	{
		iCurLevel=0;
		return;
	}
	var len=levels.length;
	if(iCurLevel>len-1)
	{
		iCurLevel=len-1;
		return;
	}
	initLevel();				
	UseTime=0;
	MoveTimes=0;
	showMoveInfo();
}

var showHelp=false;
function DoHelp()
{
	showHelp=!showHelp;
	if(showHelp)
	{
		msg.innerHTML="用键盘上的上、下、左、右键移动小人，把箱子全部推到小球的位置即可过关。箱子只可向前推，不能往后拉，并且小人一次只能推动一个箱子。";
	}
	else
		showMoveInfo();
}
function showMoveInfo()
{
    msg.innerHTML="第"+(iCurLevel+1)+"关 移动次数："+MoveTimes;
    showHelp=false;
}
var canReDo = false;
function Redo() {
    if (canReDo == false)//不能撤销
        return;
    //恢复上次地图
    curMap = copyArray(oldMap);
    for (var i = 0; i < curMap.length; i++)//行号
    {
        for (var j = 0; j < curMap[i].length; j++)//列号
        {
            if (curMap[i][j] == 4)//如果此处是人
            {
                per_position = new Point(j,i);
            }
        }
    }
    this.MoveTimes--; //次数减1
    canReDo = false;
    showMoveInfo(); //显示移动次数信息
    //InitMap(); //画通道，平铺方块
    DrawMap(curMap); //画箱子、墙、人物、目的地信息
}
//克隆二维数组
function copyArray(arr)
{
	var b=[];
	for(i=0;i<arr.length;i++)
	{	
		b[i]=arr[i].concat();
	}
	return b;
}