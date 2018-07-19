
function initGame()
{
	var canv=document.getElementById("box");
    cxt =canv.getContext("2d");
	initCards();
	console.log(cards.length);
	LoadImage();
	LoadAudio();
}

function LoadImage()
{
	cardbg_img = new Image();cardbg_img.src = "png/card_bg.png";
	img_hu = new Image(); img_hu.src = "png/bt_hu.png";
	img_hu1 = new Image(); img_hu1.src = "png/bt_hu1.png";
	img_peng = new Image();img_peng.src = "png/bt_peng.png";
	img_peng1 = new Image();img_peng1.src = "png/bt_peng1.png";
	img_gang = new Image();img_gang.src = "png/bt_gang.png";
	img_gang1 = new Image();img_gang1.src = "png/bt_gang1.png";
	img_zhuang = new Image();img_zhuang.src = "png/zhuang.png";
	
}

function LoadAudio()
{
   mp3_getcard = new Audio("mp3/getcard.mp3"); 
   mp3_click = new Audio("mp3/click.mp3");
   mp3_peng = new Audio("mp3/gpeng.mp3");
   mp3_gang = new Audio("mp3/ggang.mp3");
   mp3_zimo = new Audio("mp3/gzimo.mp3");
   mp3_fangpao = new Audio("mp3/gfangpao.mp3");
}

function card(t,v,img,ado)
{
	this.type= t;
	this.value = v;
	this.img = img;
	this.ado = ado;
	this.draw = function(x ,y) {
		cxt.drawImage(this.img,x,y);
	}
	this.drawex = function(x ,y,w,h) {
		cxt.drawImage(this.img,x,y,w,h);
	}
	this.drawbg = function (x,y){
		cxt.drawImage(cardbg_img,x,y);
	}
	this.play = function(){
		this.ado.play();
	}

}

function getCard(type,value)
{
	var imgurl = "png/"+type+"_"+value+".png";
	var image = new Image();
	image.src = imgurl;

	var ado = new Audio("mp3/"+type+"_"+value+".mp3");
	var card_T = new card(type,value,image,ado);
	return card_T;
}

function initCards()
{
	var i;
	for(i=0;i<4;i++)
	{	
		var j;
		for( j=1;j<10;j++)
		{
			if(i==3 && j>7 )
				break;

			var card_T = getCard(i,j);
			cards.push(card_T,card_T,card_T,card_T);
		}
	}
}
////////////////////////////////////////////////////////////////////////////////
function TestGame()
{
	
}

/////////////////////////////////////////////////////////////////////////////////
function mouseClick(x,y)
{

	if (game_s == game_s_human1 )
	{	
		if( x>1100 &&x<1250 && y>600 && y < 630)
		{	
			if ( x<1140 )
			{	if (can_peng)
				{	
					Peng_Card();
				}
			}		
			else if ( x>1150 && x<1190 )
			{	
				if (can_gang) 
				{	
					if (computer.outcard !=null)
					{	
						if (Check_Gang(player,3,computer.outcard) )
						{	
							Do_Gang(player,3,computer.outcard);
							player.is_menqing = false
							computer.outedlist.pop();
							Mo_Card();
						}
					}
				}	
			}
			else if( x>1200 && x<1240 )
			{	
				if(can_hu) 
				{	
					Hu_Card();
				}		

			}
			else
			{

			}
		}
		else if(x<1000)
		{	
			Mo_Card( );
		}
		else
		{
		
		}
	}	
	else if( game_s == game_s_human2 )	
	{	
		if( x>1100 &&x<1250 && y>600 && y < 630)
		{	
			if( x>1150 && x < 1190 )
			{	
				if (can_gang) 
				{	
					if (player.mocard!=null)
					{	if (Check_Gang(player,2,player.mocard) )
						{	
							Do_Gang(player,2,player.mocard);
							Mo_Card();
								
						}	
					}	
					if (Check_Gang(player,1,null))
					{	
						Do_Gang(player,1,null);
						Mo_Card();
					}
				}
			}	
			else if( x>1200 && x < 1240)
			{	
				if( can_hu) 
				{
					ZiHu_Card();
				}
						
			}
			else
			{
			}
		   
	   }
	   else if( y>640 && y<=748 )
	   {	
			var m=player.blacklist.length;
			if (x>20 && x < (m*80 + 20) )
			{	
				console.log(clickpos);	
				clickpos = Math.floor((x-20)/80);
				console.log(clickpos);	
				mp3_click.play();
			}
	   }	
	   else if(x<1000 )
	   {	
			if( clickpos >= 0 && clickpos< player.blacklist.length)
			{
				Show_Card(clickpos);
				mp3_getcard.play();
			}
		}
		else
		{

		}
	}	
	else if( game_s == game_s_mainmenu )	
	{
	}
	else if( game_s == game_s_changecard)
	{
			if (y>640 && y<748 && x>=20 && x<=(20 + 80 * player.blacklist.length) ) 
			{	
				var cpos = Math.floor((x-20)/80);
				console.log(cpos);
				
				if (changecard[cpos]== 0 )
					changecard[cpos]=1
				else
					changecard[cpos]=0
				mp3_click.play();
			}
	
			if( x>350 && x < 1050 && y>300 && y<600 )
			{	
				mp3_getcard.play();
				Chang_Card();
			}	
			
	}
	else if (game_s == game_s_nohu) 
	{	
		game_s = game_s_sessioninit;
	}
	else if(game_s == game_s_sessionend) 
	{	
		game_s = game_s_sessioninit;
	}	


}
/////////////////////////////////////////////////////////////////////////////////
function RunGame()
{	
	//console.log("state:"+game_s);
	if(game_s == game_s_com1 )
	{
		
		can_peng = false;
		can_gang = false;
		can_hu = false;
		Com_Process();
		
	}
	else if (game_s == game_s_com2 )
	{	
		Com_Showcard();
	}
	else if (game_s == game_s_human1 )
	{	
		if( Check_Peng(player,computer.outcard) ) 
		{
			can_peng = true;
		}
		if (Check_Gang(player,3,computer.outcard))
		{	
			can_gang = true;
		}
		if( Check_Hu(player,computer.outcard) )
		{	can_hu = true;
		}
	}	
	else if (game_s == game_s_human2)	
	{
		can_peng = false;
	}	
	else if( game_s == game_s_sessioninit )
	{	
		InitSession();
		game_s = game_s_sendcard;
	}
	else if( game_s == game_s_sendcard )
	{	
		SendCard();
	}	
	else if (game_s == game_s_score )
	{	
		Score_Session();
	}
	
}

function InitSession()
{
	//清空列表和计数	
	desktop.cardlist.length=0;
	desktop.outedlist.length=0;
	desktop.sealist.length=0;
	desktop.outcount = 0

	if (winner != null) 
	{
		zhuang = winner.id;
	}
	winner = null;
	loser = null;
	is_qing = false;
	is_hun = false;
	is_menqing = false;
	xxs = 0;
	zipai = 0;
	gangpai = 0;
	sscore = 0;
	clickpos = 0;
//
	player.whitelist.length=0;
	player.blacklist.length=0;
	player.outedlist.length=0;
	player.mocard=null;
	player.outcard=null;
	player.is_menqing=true;
//	
	computer.whitelist.length=0;
	computer.blacklist.length=0;
	computer.outedlist.length=0;
	computer.mocard=null;
	computer.outcard=null;
	computer.is_menqing=true;
//
	can_peng = false;
	can_gang = false;
	can_hu = false;
	
	
	for(var i=0;i<136;i++) 
	{	
		desktop.cardlist.push(cards[i]);
	}
	
	for(var i=0;i<136;i++)
	{	var n = Math.floor(Math.random()*135);
			
		tempcard = desktop.cardlist[n];
		desktop.cardlist[n]=desktop.cardlist[i];
		desktop.cardlist[i]=tempcard;
	}

//
	console.log("===============================");
		
	for(var i= 0;i<16;i++)
	{	
		var tempcard = desktop.cardlist.pop();

		desktop.sealist.push(tempcard);
		//console.log(desktop.cardlist.length);
		//console.log(desktop.sealist.length);
	}
}

function SendCard()
{
	sendticks = sendticks+1;
	if (sendticks==1 || sendticks==3 || sendticks==5 )
	{
		for(var i= 0;i<4;i++ )
		{	
			var tempcard = desktop.cardlist.pop();
			player.blacklist.push(tempcard);
			var tempcard = desktop.cardlist.pop();
			computer.blacklist.push(tempcard);
			
		}
		mp3_getcard.play();
	}
	else if (sendticks == 7 )
	{	
		var tempcard = desktop.cardlist.pop();
		player.blacklist.push(tempcard);
		var tempcard = desktop.cardlist.pop();
		computer.blacklist.push(tempcard);
		if (zhuang==1)
		{	
			var tempcard = desktop.cardlist.pop();
			computer.blacklist.push(tempcard);
		}
		else if( zhuang == 2)
		{	
			var tempcard = desktop.cardlist.pop();
			player.blacklist.push(tempcard);
		}
		
		mp3_getcard.play();
	}
	else if (sendticks == 9 )
	{
		Sort_List(player.blacklist);
		Sort_List(computer.blacklist);
		
		if (computer.gold <1000)
			Com_ChangcardEx(true,6,4);	
		else if (computer.gold <2000 )
			Com_ChangcardEx(true,6,3);	
		else if (computer.gold <5000 )
			Com_ChangcardEx(true,6,2);	
		else
			Com_ChangcardEx(true,6,1);	
		
		mp3_getcard.play();
		
		for(var i=1;i<14;i++)
		{	
			changecard[i] = 0;
		}
		game_s = game_s_changecard;
		sendticks = 0 ;
	}
}	

function Chang_Card()
{
	var max=13;
	if(zhuang ==2 )
	{
		max=14;
	}

	for(var i=0;i<max;i++)
	{	
		if( changecard[i] == 1 )
		{	
			tempcard=player.blacklist[i];
			player.blacklist[i] = desktop.cardlist.shift();
			desktop.cardlist.push(tempcard);
			changecard[i]=0;
		}
	}
	
	Sort_List(player.blacklist)
	
	if (zhuang ==1 )
	{	
		game_s=game_s_com2;
	}
	else if( zhuang == 2) 
	{	
		clickpos = player.blacklist.length;
		game_s = game_s_human2;
	}
}

function Mo_Card()
{
	var temp= desktop.cardlist.shift();
	player.mocard = temp;
	desktop.outcount += 1;
	mp3_getcard.play();
	if(Check_Gang(player,2,temp)) 
	{	
		can_gang = true;
	}
	else
	{	
		can_gang = false;
	}

	if(Check_Hu(player,temp))
	{
		can_hu = true;
	}
	else
	{	
		can_hu = false;
	}
	
	player.blacklist.push(temp);

	if (Check_Gang(player,1,null))
	{	
		can_gang = true
	}
	clickpos = player.blacklist.length-1;
	game_s = game_s_human2;
}

function Show_Card( pos)
{
	
	if (Check_Session()) 
		return; 
	
	var temp = player.blacklist[pos];
	player.blacklist.splice(pos,1);

	player.outcard = temp;
	player.mocard = null;
	player.outedlist.push(temp);
	desktop.outedlist.push(temp);
	Sort_List(player.blacklist);
	game_s = game_s_com1;
}

function Peng_Card(){
	if( computer.outcard!=null) 
	{	if( Check_Peng(player,computer.outcard) )
		{	Do_Peng(player,computer.outcard)
			player.is_menqing = false;
			computer.outedlist.pop();
			clickpos=player.blacklist.length-1;
			game_s=game_s_human2;
			can_hu = false;
			can_gang = false;
		}
	}
}



function Hu_Card()
{
	if (computer.outcard !=null )
	{	
		if( Check_Hu(player,computer.outcard) )
		{
			player.is_menqing = false;
			computer.outedlist.pop();
			player.blacklist.push( computer.outcard);
			Sort_List(player.blacklist);
		
			winner = player;
			loser = computer;
			game_s = game_s_score;
		}
	}
}

function ZiHu_Card()
{
	if( Check_Hu(player,null)) 
	{	
		Sort_List(player.blacklist);
		winner = player;
		loser = computer;
		game_s = game_s_score;	
	}	
	
}

function Check_Session( )
{
	if (desktop.outcount >64 )
	{	
		game_s = game_s_nohu;
		return true;
	}
	else
	{
		return false;
	}
}

function Score_Session()
{
	scoreticks ++;
	if( scoreticks == 1 ) 
	{
		if(winner.is_menqing)
		{
			xxs += 1;
			is_menqing= true;
			
		}
	}
	else if (scoreticks == 2 )
	{			
		clses = 0;
		for(var  i =0;i<4;i++) 
		{	
			tcls[i]=0;
			tcls[i]=Clscount_List(winner.blacklist,i);
			tcls[i]=tcls[i]+Clscount_List(winner.whitelist,i);
			if(tcls[i]>0) 
				clses ++;
			
		}
		if( clses == 1 )
		{	
			xxs += 3;
			is_qing = true;
		}
		else if (clses == 2 && tcls[3] > 0 )
		{	is_hun = true;
			xxs += 1;
			
		}
	}
	else if (scoreticks == 3)
	{	
		
		var zcard=null;
		for (var i = 0;i<winner.blacklist.length;i++)
		{	
			if( winner.blacklist[i].type == 3 )
			{	if( zcard == null)
				{
					zcard = winner.blacklist[i];
					if( Count_Card(winner.blacklist,zcard)>= 3 )
					{
						zipai = zipai + 1;
					}
				}
				if( winner.blacklist[i].value!= zcard.value)
				{	
					zcard = winner.blacklist[i];
					if( Count_Card(winner.blacklist,zcard)>= 3 )
					{	
						zipai = zipai + 1;							
					}
				}
			}
		}
			
		for(var i = 0;i<winner.whitelist.length;i++)
		{	if( winner.whitelist[i].type == 3 )
			{	
				if (zcard == null )
				{		
					zcard = winner.whitelist[i];
					if (Count_Card(winner.whitelist,zcard)>= 3 )
					{	
						zipai = zipai + 1;
					}
				}
				if( winner.whitelist[i].value != zcard.value )
				{	
					zcard = winner.whitelist[i];
					if( Count_Card(winner.whitelist,zcard)>= 3)
					{	
						zipai = zipai + 1;
					}
				}
			}
		}
		
		xxs += zipai;
	
	}
	else if (scoreticks == 4)
	{	
		
		var gangcard = null;
		
		for( var i=0; i< winner.whitelist.length;i++ )
		{	
			if (gangcard == null)
			{	
				gangcard = winner.whitelist[i];
				if( Count_Card(winner.whitelist,gangcard)== 4 )
				{	
					gangpai ++;
					
				}
			}
			if( winner.whitelist[i].type != gangcard.type || winner.whitelist[i].value!= gangcard.value)
			{	
				gangcard = winner.whitelist[i];
				if (Count_Card(winner.whitelist,gangcard)== 4)
				{	
					gangpai++;
					
				}
					
			}
				
		}
		xxs  += gangpai;
		
	}
	else if( scoreticks == 5 )
	{	
		xxx = Math.pow(2,xxs);
		sscore = 100*xxx;
	}
	else if( scoreticks > 8)
	{	
		winner.gold = winner.gold + sscore;
		loser.gold = loser.gold - sscore;
		scoreticks = 0;
		game_s = game_s_sessionend;
	}
}

function Com_ChangcardEx(bRandom,maxtimes,mintimes)
{	var ttimes;
	if (bRandom )
	{	
		ttimes = Math.floor(Math.random()*( maxtimes-mintimes) )+ mintimes;
	}
	else
	{	ttimes = maxtimes;
	}

	for(var i =0;i<ttimes;i++)
	{	
		Com_Changcard();
	}
		
}

function Com_Changcard()
{
	for(var i=0;i<14;i++) 
	{	
		mark[i]=0;
	}

	for(var i=0;i<3;i++)
	{
		if( Clscount_List(computer.blacklist,i)< 3 )
			clsmark[i]=1;
		else
			clsmark[i]=0;
	}
	//字牌不换
	clsmark[3] =0;
	
	for(var i=0; i<computer.blacklist.length;i++)
	{
		if( clsmark[computer.blacklist[i].type]==1) 
			mark[i]=1;
	}
	
	for(var j=0;j<computer.blacklist.length;j++) 
	{	
		if (mark[j]==0)
		{	var n=j-1;
			var m=j+1;
			if( n>0 )
			{	
				if( computer.blacklist[n].type==computer.blacklist[n].type )
				{	if (computer.blacklist[n].value==computer.blacklist[j].value )
					{	mark[j]=0;
						m=20 ;		
					}
					else if (computer.blacklist[n].value+1 ==computer.blacklist[j].value)
					{	mark[j]=0;
						m=20 ;	
					}							
					else
					{	
						mark[j]=1;	
					}
				}
			}
			
			if( m< computer.blacklist.length )
			{	
				if( computer.blacklist[j].type == computer.blacklist[m].type)
				{	if( computer.blacklist[j].value==computer.blacklist[m].value)
					{	mark[j]=0;	}
					else if( computer.blacklist[j].value+1 ==computer.blacklist[m].value )
					{	mark[j]=0;	}	
					else
					{	mark[j]=1;	}
					
				}
				
			}
		}
	
	}
	
	
	for(var i=0;i<computer.blacklist.length;i++) 
	{	if( mark[i] == 1) 
		{	
			var tempcard=computer.blacklist[i];
			computer.blacklist[i] = desktop.cardlist.shift();
			desktop.cardlist.push(tempcard);
		}
	}
		
	Sort_List(computer.blacklist);
}


function Com_Process()
{
	if( player.outcard != null )
	{	
		if( Check_Hu(computer,player.outcard) )
		{	
			mp3_fangpao.play();
			player.outedlist.pop();
			computer.blacklist.push(player.outcard);
			Sort_List(computer.blacklist);
			computer.is_menqing = false;
			winner = computer;
			loser = player;
			game_s = game_s_score;
			return ;
		}
		else if( Check_Gang(computer,3,player.outcard) )
		{	mp3_gang.play()
			Do_Gang(computer,3,player.outcard);
			computer.is_menqing = false;
			player.outedlist.pop();
		}	
		else if (Check_Peng(computer,player.outcard))
		{	mp3_peng.play()
			Do_Peng(computer,player.outcard);
			computer.is_menqing = false;
			player.outedlist.pop();
			game_s = game_s_com2;
			return;
		}	
	}
	var temp=desktop.cardlist.shift();
	mp3_getcard.play();
	desktop.outcount = desktop.outcount + 1;
	computer.mocard=temp;
	computer.blacklist.push(temp);
	Sort_List(computer.blacklist);
	game_s = game_s_com2;
}

function Com_Showcard()
{
	if (Check_Hu(computer,null) )
	{	
		mp3_zimo.play()
		winner = computer;
		loser = player;
		game_s = game_s_score;
	}
	else if (Check_Session())
	{
	}
	else if( Check_Gang(computer,1,computer.mocard) )
	{	mp3_gang.play()
		Do_Gang(computer,1,computer.mocard);
		
		var temp=desktop.cardlist.shift();
		
		mp3_getcard.play();
		computer.mocard=temp;
		computer.blacklist.push(temp);
		Sort_List(computer.blacklist);
	}
	else if (Check_Gang(computer,2,computer.mocard) )
	{	mp3_gang.play();
		Do_Gang(computer,2,computer.mocard);
		
		temp=desktop.cardlist.shift();
		
		mp3_getcard.play();
		computer.mocard=temp;
		computer.blacklist.push(temp);
		Sort_List(computer.blacklist);
	}
	else
	{	var m = Showpos(computer.blacklist);
		var ctemp = computer.blacklist[m];
		computer.blacklist.splice(m,1);
		ctemp.play()
		computer.outcard=ctemp;
		computer.outedlist.push(ctemp);
		desktop.outedlist.push(ctemp);
		computer.mocard=null;
		game_s = game_s_human1;
	}
}


function Check_Peng(p,xcard)
{
	if (xcard ==null ) 
	{	
		return false;
	}
	var count = 0;
		
	for (var i=0;i<p.blacklist.length;i++) 
	{	
		if( p.blacklist[i].type == xcard.type && p.blacklist[i].value == xcard.value )
		{	
			count = count +1;
		}
	}
	
	if( count >=2 ) 
	{	
		return true;
	}
	else
	{	
		return false;
	}
	
}

function Do_Peng(p,xcard)
{	
	var count = 0;
	i=0;
	
	p.whitelist.push(xcard);
	while ( i < p.blacklist.length )
	{
		if ( p.blacklist[i].type == xcard.type && p.blacklist[i].value == xcard.value)
		{	if( count <2 )
			{	count++;
				var tempcard=p.blacklist[i];
				p.whitelist.push(tempcard);
				p.blacklist.splice(i,1);
			}
			else
			{	
				break;
			}	
		}
		else
		{	
			i++;
		}
	}
	Sort_List(p.whitelist);
}


function Check_Gang(p,tp,xcard)
{
	if( tp == 1 )
	{	if (xcard != null) 
		{	if (Count_Card(p.blacklist,xcard) == 4 )
				return true;
			else
				return false;
			
		}
		else
		{	
			for (var i=0;i<p.blacklist.length;i++)
			{	
				if(Count_Card(p.blacklist,p.blacklist[i]) == 4 )
					return true;
				
			}
			return false;
		}
	}
	else if (tp == 2 )
	{	
		if( xcard == null )
			return false;
		else
		{	
			if (Count_Card(p.whitelist,xcard) == 3 )
				return true;
			else
				return false;
			
		}
	}
	else if( tp == 3 )
	{	
		if ( xcard == null )
			return false;
		else
		{	
			if( Count_Card(p.blacklist,xcard) == 3 )
				return true;
			else
				return false;
			
		}
	}
}

function Do_Gang(p,tp,xcard)
{
	var r;
	var count; 
		
	if (tp == 1 )
	{	
		if( xcard == null)
		{	
			for(var i=0;i<p.blacklist.length;i++)
			{	
				if (Count_Card(p.blacklist,p.blacklist[i]) == 4 )
				{	xcard = p.blacklist[i];
					break;
				}
			}
		}
		if (xcard != null)
		{	//print("杠"..xcard.name)
			count =0;
			r = 0;
			while( r < p.blacklist.length)
			{	
				if( p.blacklist[r].type == xcard.type && p.blacklist[r].value == xcard.value )
				{	if (count < 4 )
					{	
						var temp=p.blacklist[r];
						p.blacklist.splice(r,1);
						p.whitelist.push(temp);
						count++;
					}
					else
					{	break;
					
					}
				}	
				else
				{	
					r++;
				}
			}
		}		
		
	}	
	else if( tp == 2 )
	{	
		if (xcard != null )
		{	
			//print("杠"..xcard.name)
			r = 0;
			while( r < p.blacklist.length)
			{	
				if (p.blacklist[r].type == xcard.type && p.blacklist[r].value == xcard.value )
				{
					var temp=p.blacklist[r];
					p.blacklist.splice(r,1);
					p.whitelist.push(temp);
					break;
				}
				else
					r++;
			}
		}
	}
	else if( tp == 3 )
	{	
		if (xcard != null) 
		{	
			count =0;
			r = 0;
			p.whitelist.push(xcard);
			while (r < p.blacklist.length) 
			{	if( p.blacklist[r].type == xcard.type && p.blacklist[r].value == xcard.value)
				{	
					if (count < 3 )
					{	
						var temp= p.blacklist[r];
						p.blacklist.splice(r,1);
						p.whitelist.push(temp);
						count=count+1;
					}
					else
						break;
				}
				else
				{
					r++;
				}
			}
		
		}
	}
	Sort_List(p.whitelist);
}

function Check_Hu(p,xcard)
{
	for(var j=0;j<38;j++ )
	{	
		mk[j]=0;
	}
		
	for(var i=0;i< p.blacklist.length ;i++)
	{	
		k= p.blacklist[i].value + (p.blacklist[i].type)*10;
		mk[k]=mk[k]+1;
	}
	
	if (xcard!=null)
	{	k=xcard.value+(xcard.type)*10;
		mk[k]=mk[k]+1;
	}
	jiang=0;
	if( Is_Hu( ) ) 
	{	
		return true; 
	}
	else if( Is_Qidui()) 	
	{	
		return true;
	
	}
	else
	{	
		return false;
	}
	
}

function Mk_Count( )
{	var ret=0; 
	for(var j=0;j<38; j++)
	{	
		ret=mk[j]+ret;
	}
	return ret; 	
}

function Is_Hu()
{
	var ii=0;
	if (Mk_Count()==0)
	{	
		return true;
	}
	
	for(var i=0;i<38;i++) 
	{	
		if( mk[i]>0 )
		{	ii=i;
			break;
		}
	}	
	

	if (mk[ii] >= 3 )
	{	
		mk[ii]=mk[ii]-3;
		if( Is_Hu()) 
		{	
			return true;
		}
		mk[ii]=mk[ii]+3;
	}
	if( jiang==0 && mk[ii]>=2 )
	{	jiang=1;
		mk[ii]=mk[ii]-2;
		if (Is_Hu()) 
		{	return true;}
		mk[ii]=mk[ii]+2;
		jiang = 0;
	}
	if( ii>30)
	{
		return false;
	}
	
	if( ii%10!= 8 && ii%10!= 9 && mk[ii+1]>0 && mk[ii+2] >0 )  
	{	mk[ii]=mk[ii]-1;
		mk[ii+1]=mk[ii+1]-1;
		mk[ii+2]=mk[ii+2]-1;
	
        if (Is_Hu()) 
		{	
			return true;  
		}
		
		mk[ii]=mk[ii]+1;
		mk[ii+1]=mk[ii+1]+1;
		mk[ii+2]=mk[ii+2]+1;               
	}
	
	return false
}

function Is_Qidui()
{
	var ps = 0;
	for(var i=0;i<38;i++)  
	{	
		if(mk[i]>0) 
		{	
			if( mk[i] == 2)
			{	
				ps = ps +1;
			}
			else if( mk[i] == 4) 
			{	ps = ps + 2;
			
			}
			else
			{	
				return false;
			}	
		}
	}	
	
	if( ps == 7 )
		return true;
	else
		return false;
	
}












////////////////////////////////////////////////////////////////////////////////
function draw_cardbg(x,y)
{
	cxt.drawImage(cardbg_img,x,y);
}

function display()
{
	// clear sc
	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
	show();
	
}

function show()
{
	if(game_s >= game_s_sendcard && game_s <= game_s_score)
	{	
		//player.outedlist
		for (var i=0;i<player.outedlist.length;i++)
		{
			if(i<16)
				player.outedlist[i].draw(20 + i*80,390);
			else
				player.outedlist[i].draw(20 + (i-16)*80,500);

		}
		//player.blacklist
		for (var i=0;i<player.blacklist.length;i++)
		{
			if (game_s == game_s_human2 && i == clickpos)
				player.blacklist[i].draw(20 + i*80,620);
			else
				player.blacklist[i].draw(20 + i*80,640);
		}
		//player.whitelist
		var wxoff = Math.floor(player.blacklist.length/3) * 3 +2;
		for (var i=0;i<player.whitelist.length;i++)
		{
			
			player.whitelist[i].draw(60 + wxoff *80 + i*80,650);
		}
	
		//computer.whitelist
		for (var i=0;i<computer.whitelist.length;i++)
		{
			computer.whitelist[i].draw(20 + i*80,10);
		}
		//computer.blacklist
		for (var i=0;i<computer.blacklist.length;i++)
		{
			if (game_s >= game_s_seamo && game_s <= game_s_score) 
				computer.blacklist[i].draw( 60+ computer.whitelist.length *80 + i*80 ,20);
			else
				computer.blacklist[i].drawbg( 60+ computer.whitelist.length *80 + i*80 ,20);
				//computer.blacklist[i].draw( 60+ computer.whitelist.length *80 + i*80 ,20);
		}
		//computer.outedlist
		try
		{
			for (var i=0;i<computer.outedlist.length;i++)
			{
				if(i<16)
					computer.outedlist[i].draw( 20+ i*80 ,140);
				else
					computer.outedlist[i].draw( 20+ (i-16)*80 ,250);
				
			}
		}
		catch(err)
		{
			console.log(err);
			console.log("i:"+i);
			console.log("len:"+computer.outedlist.length);
		}
		finally
		{
		}
		if(game_s>game_s_changecard && game_s < game_s_seamo )
		{
			cxt.drawImage(img_peng1,1100,600);
			cxt.drawImage(img_gang1,1150,600);
			cxt.drawImage(img_hu1,1200,600);
		
		}

	}
	if (game_s == game_s_human1 )
	{	
		
		if(can_peng) 
		{	cxt.drawImage(img_peng,1100,600);
		}
		if(can_gang)
		{	cxt.drawImage(img_gang,1150,600);
		}
		if(can_hu)
		{	cxt.drawImage(img_hu,1200,600);
		}
	}
	else if( game_s == game_s_human2)
	{	
		if (can_gang )
		{
			cxt.drawImage(img_gang,1150,600);
		}
		if (can_hu )
		{	
			cxt.drawImage(img_hu,1200,600);
		}
	}
	else if (game_s == game_s_changecard)
    {
		
		for(var i=0;i<player.blacklist.length;i++) 
		{	
			if (changecard[i]==1) 
			{	
				player.blacklist[i].drawbg(20+i*80,640);
			}	
		}
		cxt.fillStyle="#909090";
		cxt.fillRect(350,300,700,300);
		cxt.fillStyle="#0000f0";
		cxt.font = "60px 宋体";
		cxt.fillText("请点击选择你要换的牌",400,400);
		cxt.fillText("然后点击此处结束",400,500);
	
	
	}
	else if (game_s == game_s_mainmenu)
	{	
		//img_bt_start:draw(140,40,120,30)
		//img_bt_resume:draw(140,110,120,30)
		//img_bt_exit:draw(140,180,120,30)
	}
	else if (game_s == game_s_select )
	{

	}
	else if( game_s == game_s_nohu )
	{	
		cxt.fillStyle="#909090";
		cxt.fillRect(350,200,700,450);

		cxt.fillStyle="#f000f0";
		cxt.font = "180px 宋体";
		cxt.fillText("流局",400,400);
		
	}	
	else if (game_s == game_s_info )
	{	
		//img_info
	}
	else if (game_s == game_s_score || game_s == game_s_sessionend )
	{	
		cxt.fillStyle="#b0b0b0";
		cxt.fillRect(350,120,700,500);

		cxt.fillStyle="#f000f0";
		cxt.font = "50px 宋体";
		if(is_menqing) 
		{	
			cxt.fillText("门清 1 翻",400,200);
		}
		else
		{	
			cxt.fillText("门清 0 翻",400,200);
		}
		if (is_qing)
		{	
			cxt.fillText("清一色 3 翻",400,280);
		}
		else if (is_hun)
		{	
			cxt.fillText("混一色 1 翻",400,280);
		}
		else
		{
			cxt.fillText("清（混）一色 0 翻",400,280);
		}
		cxt.fillText("字牌 "+ zipai+" 翻",400,360);
		cxt.fillText("杠牌 "+ gangpai+" 翻",400,440);
		cxt.fillText("共计 "+ xxs + " 翻",400,520);
		cxt.fillStyle="#f0f000";
		if(winner.id==2)
			cxt.fillText("本局你共赢了 "+sscore +"金币" ,400,590);
		else
			cxt.fillText("本局你输掉了 "+sscore +"金币" ,400,590);
		

	}
	if ( (game_s >= game_s_sendcard && game_s <= game_s_score) )
	{	
		cxt.fillStyle="#ffff00";
		cxt.font = "30px Arial";
		cxt.fillText("$"+computer.gold,1250,50);
		cxt.fillText("$"+player.gold,1250,670);
		if (zhuang == 1 )
		{
			cxt.drawImage(img_zhuang,1200,20);
		}
		else if ( zhuang == 2 )
		{	
			cxt.drawImage(img_zhuang,1200,650);
		}
			
	}

}