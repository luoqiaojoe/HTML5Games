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

function Computer_outCard(list) {
	//电脑智能出牌V1.0，计算出牌的索引号
	for(var j=0;j<38;j++ ){	
		mk[j]=0;  
	}		
	for(var i=0;i< list.length ;i++){	//统计每种牌的个数
		k= list[i].value + (list[i].type)*10;
		mk[k]=mk[k]+1;
	}

	//电脑智能选牌
	//1.判断字牌的单张 ，有则找到
	for (j = 31; j <=37; j++) {
		if(mk[j]==1){
			//获取在手中牌的位置下标
			k=findcard(list,3,j-30);
			return k;
		}
	}
	//2.判断顺子，刻子（三张相同的）
	for (i = 0; i < 3; i++) {
		for (j = 1; j < 10; j++) {
			if(mk[i*10+j]>=3)//刻子
				mk[i*10+j]-=3;
			if(j<=7 && mk[i*10+j]>=1 && mk[i*10+j+1]>=1
				&& mk[i*10+j+2]>=1){//顺子
				mk[i*10+j]-=1;
				mk[i*10+j+1]-=1;
				mk[i*10+j+2]-=1;
			}
		}
	}
	//3.判断单张非字牌（饼，条，万） ，有则找到
	for (i = 0; i < 3 ; i++) {
		for (j = 1; j < 10; j++)	{
			if(mk[i*10+j]==1){
				//获取在手中牌的位置下标
				k= findcard (list,i,j);
				return k;
			}	
		}
	}
	//4.判断两张牌（饼，条，万，包括字牌） ，有则找到,拆双牌
	for (i = 3; i >=0; i--) {
		for (j = 1; j < 10; j++)	{
			if(mk[i*10+j] ==2){
				//获取在手中牌的位置下标
				k= findcard (list,i,j);
				return k;
			}
		}
	}
	//5.如果以上情况均没出现则随机选出1张牌; Math.floor(Math.random() * ( n + 1));
	k= Math.floor(Math.random() * ( list.length));			//随机选出1张牌;
	while(mk[j]==0)//如果此牌没有，因为可能已形成顺子或刻牌
		k= Math.floor(Math.random() * ( list.length));		//随机选出1张牌;

	return k;
}
//获取某种牌在list中的下标索引位置
function findcard(list,type,value)
{	
	for (var i=0; i < list.length;i++)
	{	
		if( list[i].type==type && list[i].value == value)
			return i;
	}
	return -1;
}
//统计xcard牌的个数
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
//统计索引号为i的牌的个数
function Cardcount_List(L,i)
{
	if(i<0 || i>=L.length )
		alert("i is out.");
	var fcard = L[i];
	return Count_Card(L,fcard);

}