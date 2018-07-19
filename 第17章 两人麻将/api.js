function Sort_List(L)
{
	if(L.length>1)
	{
		for(var i=0;i<L.length;i++)
		{
			for(var j=i+1;j<L.length;j++)
			{
				if(L[j].type < L[i].type || ( L[j].type == L[i].type && L[j].value<L[i].value))
				{
					var tempcard = L[i];
					L[i]=L[j];
					L[j]=tempcard;
				}
			}
		}
	
	}
}

function Clscount_List(List,type)
{
	var count=0;
	for(var i=0;i<List.length;i++)
	{
		if(List[i].type==type)
		{	
			count++;
		}
	}
	return count;
}

function Showpos(list)
{
	for(var j=0;j<4;j++)	
	{
		clsct[j] = Clscount_List(list,j);
	}

	var ret=-1;
	//差>2
	if ( clsct[0] <=clsct [1] && clsct[1] <= clsct[2] )
	{	
		a=0;
		b=1;
		c=2;
	}
	else if( clsct [1] <= clsct[0] && clsct[0] <= clsct[2])
	{	
		a=1;
		b=0;
		c=2;
	}
	else if (clsct[0] <= clsct[2] && clsct[2]<= clsct[1] )
	{	
		a=0;
		b=2;
		c=1;
	}
	else if( clsct[2] <= clsct[0] && clsct[0]<= clsct[1])
	{	
		a=2;
		b=0;
		c=1;
	}
	else if (clsct[1] <= clsct[2] && clsct[2]<= clsct[0] )
	{	a=1;
		b=2;
		c=0;
	}
	else if( clsct[2] <= clsct[1] && clsct[1]<= clsct[0])
	{	a=2;
		b=1;
		c=0;
	}	
//2	
	ret = findpos(list,a,2);
	if ( ret == -1 )
		ret = findpos(list,b,2)
	
	if (ret == -1 )
		ret = findpos(list,c,2)
	
	if (ret == -1 )
		ret = findpos(list,3,0)
	
//1	
	if ( ret == -1)
		ret = findpos(list,a,1);
	if ( ret == -1)
		ret = findpos(list,b,1);
	if ( ret == -1)
		ret = findpos(list,c,1);
	
//0
	if ( ret == -1)
		ret = findpos(list,a,0);
	
	if (ret == -1)
		ret = findpos(list,b,0);
	
	if( ret == -1)
		ret = findpos(list,c,0);
		
	if(ret == -1)
	{		
		for(var i=0;i<list.length;i++) 
		{	
			if (list[i].type == a )
			{	
				if( Cardcount_List(list,i)<=2 )
				{	ret = i;
					break;
				}
			}	
			if( list[i].type == b )
			{	
				if( Cardcount_List(list,i)<=2 )
				{	ret = i;
					break;
				}
			}	
			if (list[i].type == c )
			{	
				if (Cardcount_List(list,i)<=2)
				{	ret = i;
					break;
				}
			}	
			if(list[i].type == 4 )
			{	
				if( Cardcount_List(list,i)<=2 )
				{	ret = i;
					break;
				}
			}	
		}
		
	}
	if(ret < 0 || ret>=list.length )
	{	
		alert("pos:" +ret + " list length:"+list.length);
	}
	return ret;
}


function findpos(list,type,deta)
{	
	if( clsct[type] == 0 )
	{	
		return -1;
	}
	
	for(var i=0;i<list.length;i++ ) 
	{	
		if (list[i].type == type)
		{	
			if (clsct[type] == 1 )
			{	
				return i;
			}
			
			var isok =false;
			if( (i+1) < list.length)
			{	
				if(list[i+1].type == type) 
				{	
					if( Math.abs(list[i+1].value - list[i].value) <= deta)
					{
						isok=true;
					}
				}	
			}
			
			if( (i-1)>=0  && isok ==false)  
			{	
				if(list[i-1].type == type) 
				{	
					if( Math.abs(list[i-1].value - list[i].value) <= deta)
					{	
						isok = true;
					}
				}	
			}
			if (isok == false)
				return i;
			
		}
	}
	return -1;

}

function findcard(list,type,value)
{	
	for (var i=0; i < list.length;i++)
	{	
		if( list[i].type==type && list[i].value == value)
			return i;				
		
	}
	return -1;
}

function Count_Card(L,xcard)
{
	var count=0;
	for(var i=0;i<L.length;i++)
	{
		if(L[i].type == xcard.type && L[i].value==xcard.value)
		{
			count++;
		}
	}
	return count;
}

function Cardcount_List(L,i)
{
	if(i<0 || i>=L.length )
		alert("i is out.");

	var fcard = L[i];
	return Count_Card(L,fcard);

}