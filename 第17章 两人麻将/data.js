var game_s_stop = 0;
var game_s_mainmenu = 1;
var game_s_select = 2;
var game_s_info = 3;
var game_s_sessioninit = 4;
var game_s_sendcard = 5;
var game_s_changecard = 6;
var game_s_com1 = 7;
var game_s_com2 = 8;
var game_s_human1 = 9;
var game_s_human2 = 10;
var game_s_seamo = 11;
var game_s_nohu = 12;
var game_s_sessionend = 13;
var game_s_score = 14;
var game_s_submenu = 15;
var game_s = game_s_sessioninit ;
var game_s_save = game_s_stop;

var btn_down_touch = 0;
var AccOk = 1;
var Menu_Loop = true;
var Game_Loop = true;

var zhuang = 1;

var changecard=[];
var mark=[];
var clsmark=[];
var clsct=[];
//判断
var mk=[];
var jiang=0;
var mpos=1;
var clickpos=0;
var outpos=0;

var player  ={gold:5000,id:2,blacklist:[],whitelist:[],outedlist:[],is_menqing:true};
var computer ={gold:10000,id:1,blacklist:[],whitelist:[],outedlist:[],is_menqing:true};

var desktop ={cardlist:[],sealist:[],outedlist:[],outcount:0};
var winner;
var loser;
var xxs=0;
var xxx=0;
var tcls={};
var is_qing=false;
var is_hun=false;
var is_menqing=false;
var zipai=0;
var gangpai=0;
var sscore=0;

var can_peng = false;
var can_gang = false;
var can_hu = false;

var sendticks = 0;
var scoreticks =0;

var img_hu;
var img_hu1;
var img_peng;
var img_peng1;
var img_gang;
var img_gang1;
var img_zhuang;


var mp3_getcard;
var mp3_click;
var mp3_peng;
var mp3_gang;
var mp3_zimo;
var mp3_fangpao;