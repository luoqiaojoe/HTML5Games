var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
//三个类，Bird类，Obstacle类，FlappyBird类（游戏主要函数）
function Bird(x, y, image) {
	this.x = x,
	this.y = y,
	this.width = image.width / 2,
	this.height = image.height,
	this.image = image;
	this.draw = function(context, state) {
		if (state === "up")
			context.drawImage(image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		else{
			context.drawImage(image, this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		}
	}
};

function Obstacle(x, y, h, image) {
	this.x = x,
	this.y = y,
	this.width = image.width / 2,
	this.height = h,
	this.flypast=false;//没被飞过
	this.draw = function(context, state) {
		if (state === "up") {
			context.drawImage(image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		} else {
			context.drawImage(image, this.width, image.height - this.height, this.width, this.height, this.x, this.y, this.width, this.height);
		}
	}
};
//FlappyBird类包括了游戏主要参数及运行时需要的函数。
function FlappyBird() {}
FlappyBird.prototype = {
	bird: null, // 小鸟
	bg: null, // 背景图
	obs: null, // 障碍物
	obsList: [],

	mapWidth: 340, // 画布宽度
	mapHeight: 453, // 画布高度
	startX: 90, // 起始位置  
	startY: 225,
	obsDistance: 150, // 上下障碍物距离  
	obsSpeed: 2, // 障碍物移动速度  
	obsInterval: 2000, // 制造障碍物间隔ms  
	upSpeed: 8, // 上升速度  
	downSpeed: 3, // 下降速度  
	line: 56, // 地面高度
	score: 0, // 得分  
	touch: false, // 是否触摸
	gameOver: false,

/*变化参数可以改变游戏难度。 
函数列表：

CreateMap: function() {}    // 绘制画布
CreateObs: function() {}    // 创造障碍物
DrawObs: function() {}       // 绘制障碍物
CountScore: function() {}   // 判断是否启动记分器
ShowScore: function() {}   // 显示分数
CanMove: function() {}       // 判断是否可以移动及游戏结束
CheckTouch: function() {} // 判断是否触摸
ClearScreen: function() {} // 清屏
ShowOver: function() {}     // 显示游戏结束
*/

	CreateMap: function() {
		//背景
		this.bg = new Image();
		this.bg.src = "img/bg.png";
		var startBg = new Image();
		startBg.src = "img/start.jpg";
		// 由于Image异步加载, 在加载完成时在绘制图像
		startBg.onload = function(){
			c.drawImage(startBg, 0, 0);
		};

		//小鸟
		var image = new Image();
		image.src = "img/bird.png";		
		image.onload = function(){
			this.bird = new Bird(this.startX, this.startY, image);
			//this.bird.draw(c, "down");
		}.bind(this);

		//障碍物  
		this.obs = new Image();
		this.obs.src = "img/obs.png";
		this.obs.onload = function() {
			var h = 100; // 默认第一障碍物上管道高度为100
			var h2 = this.mapHeight - h - this.obsDistance;
			var obs1 = new Obstacle(this.mapWidth, 0, h, this.obs);
			var obs2 = new Obstacle(this.mapWidth, this.mapHeight - h2, h2 - this.line, this.obs);
			this.obsList.push(obs1);
			this.obsList.push(obs2);
		}.bind(this);
	},
	CreateObs: function() {
		// 随机产生障碍物上管道高度
		var h = Math.floor(Math.random() * (this.mapHeight - this.obsDistance - this.line));
		var h2 = this.mapHeight - h - this.obsDistance;
		var obs1 = new Obstacle(this.mapWidth, 0, h, this.obs);
		var obs2 = new Obstacle(this.mapWidth, this.mapHeight - h2, h2 - this.line, this.obs);
		this.obsList.push(obs1);
		this.obsList.push(obs2);

		// 移除越界障碍物  
		if (this.obsList[0].x < -this.obsList[0].width)
			this.obsList.splice(0, 2);
	},
	DrawObs: function() { //绘制障碍物 
		c.fillStyle = "#00ff00";
		for (var i = 0; i < this.obsList.length; i++) {
			this.obsList[i].x -= this.obsSpeed;
			if (i % 2)
				this.obsList[i].draw(c, "up");
			else
				this.obsList[i].draw(c, "down");
		}
	},
	CountScore: function() { // 计分
		if (this.obsList[0].x + this.obsList[0].width < this.startX &&this.obsList[0].flypast==false) {
			//小鸟坐标超过obsList[0]障碍物
			this.score += 1;
			this.obsList[0].flypast=true;			
		}
	},
	ShowScore: function() { // 显示分数  
		c.strokeStyle = "#000";
		c.lineWidth = 1;
		c.fillStyle = "#fff"
		c.fillText(this.score, 10, 50);
		c.strokeText(this.score, 10, 50);
	},
	CanMove: function() { // 碰撞检测
		if (this.bird.y < 0 || this.bird.y > this.mapHeight - this.bird.height - this.line) {
			this.gameOver = true;
		} else {
			var boundary = [{
				x: this.bird.x,
				y: this.bird.y
			}, {
				x: this.bird.x + this.bird.width,
				y: this.bird.y
			}, {
				x: this.bird.x,
				y: this.bird.y + this.bird.height
			}, {
				x: this.bird.x + this.bird.width,
				y: this.bird.y + this.bird.height
			}];
			for (var i = 0; i < this.obsList.length; i++) {
				for (var j = 0; j < 4; j++)
				    if (boundary[j].x >= this.obsList[i].x && boundary[j].x <= this.obsList[i].x + this.obsList[i].width
                     && boundary[j].y >= this.obsList[i].y && boundary[j].y <= this.obsList[i].y + this.obsList[i].height)
                    {
						this.gameOver = true;
						break;
					}
				if (this.gameOver)
					break;
			}
		}
	},
	CheckTouch: function() { // 检测触摸       
		if (this.touch) {
			this.bird.y -= this.upSpeed;
			this.bird.draw(c, "up");
		} else {
			this.bird.y += this.downSpeed;
			this.bird.draw(c, "down");
		}
	},
	ClearScreen: function() { // 清屏
		c.drawImage(this.bg, 0, 0);
	},
	ShowOver: function() {
		var overImg = new Image();
		overImg.src = "img/over.png";
		overImg.onload = function(){
			c.drawImage(overImg, (this.mapWidth - overImg.width) / 2, (this.mapHeight - overImg.height) / 2 - 50);
		}.bind(this);
		return;
	}
};

var game = new FlappyBird();
var Speed = 20;
var IsPlay = false;
var GameTime = null;
var btn_start;
window.onload = InitGame;

function InitGame() {
	c.font = "3em 微软雅黑";
	game.CreateMap();
	canvas.onmousedown = function() {
		game.touch = true;
	}
	canvas.onmouseup = function() {
		game.touch = false;
	};
	canvas.onclick = function() {
		if (!IsPlay) {
			IsPlay = true;
			GameTime = RunGame(Speed);
		}
	}
}
//游戏运行函数
function RunGame(speed) {
	var updateTimer = setInterval(function() {
		// 若小鸟通过第一个障碍物启动记分器
		game.CanMove();
		if (game.gameOver) {
			game.ShowOver();
			clearInterval(updateTimer);
			return;
		}
		game.ClearScreen();
		game.DrawObs();
		game.CheckTouch();
		game.CountScore();
		game.ShowScore();
	}, speed);
	var obsTimer = setInterval(function() {
		if (game.gameOver) {
			clearInterval(obsTimer);
			return;
		}
		game.CreateObs();
	}, game.obsInterval);
}