var backImage,backgr;
var player, player_running;
var ground,ground_img;
var Stone, StoneI, StoneG, RanS;

var END =0;
var PLAY =1;
var gameState = PLAY;

var GO, GOi;

var banana, bananai, bananag, RanB;

function preload(){
  backImage=loadImage("1jun.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  StoneI = loadImage("stone.png");
  GOi = loadImage("gameOver.png");
  bananai = loadImage("banana.png");
}

function setup() {
  createCanvas(2000,600);

  RanS = Math.round(random(50, 70))
  RanB = Math.round(random(90, 100))

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-10;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.08;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  GO = createSprite(650, 200, 40, 40);
  GO.addImage("Goi", GOi);
  GO.visible = false;

  StoneG = createGroup();
  bananag = createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(frameCount%RanS===0){
    Stone = createSprite(1500, 300, 30, 30);
    Stone.addImage("stoneI", StoneI);
    Stone.scale = 0.4
    Stone.velocityX = -10;
    //Stone.debug = true;
    Stone.setCollider("circle", 40,30,120);
    StoneG.add(Stone);
  }
  if(frameCount%RanB===0){
    banana = createSprite(1500, 100, 30, 30);
    banana.addImage("bana", bananai);
    banana.scale = 0.07;
    banana.velocityX = -10;
    bananag.add(banana);
  }
  
    if(keyDown("space")&&player.y>200) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    if(player.isTouching(StoneG)){
      gameState = END;
    }
    if(player.isTouching(bananag)&&player.scale<0.3){
      player.scale = player.scale+0.01;
      bananag.destroyEach();
    }
    

  }
if(gameState===END){
  StoneG.setVelocityXEach(0);
  backgr.velocityX = 0;
  player.velocityY = 0;
  GO.visible =true;

}
  player.collide(ground);
  drawSprites();
}
