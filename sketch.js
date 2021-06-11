var gamestate
var intro=2
var Game=1
var end=0
var monkey , monkey_running,ghost
var banana ,bananaImage, obstacle, obstacleImage,scenry,scenery1
var FoodGroup, obstacleGroup
var survive,score,play,play1;
var ground,invisibleGround,groundImage
var restart,restartImage
var cloud,cloudImage
var gameOver,gameOverImage
var settings,settings1,shop,shop1,enter,enter1,title,title1;
var player,player1


function preload(){
 play1=loadImage("play button.png")
  
   
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png")
  
  restartImage=loadImage("restart.png")
  
  cloudImage=loadImage("cloud.png")
  
  groundImage=loadImage("ground.png")

  gameOverImage=loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(400,400);
  gamestate=Game;
  
 play=createSprite(200,200,40,10);
  play.addImage(play1);
  play.scale=0.39
  
   ground = createSprite(200,390,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
   
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  monkey=createSprite(50,345,40,30)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
  survive=0
  score=0

   restart = createSprite(200,200);
  restart.addImage(restartImage);
  restart.scale=0.5
  
  
 invisibleGround=createSprite(200,382,400,20)
  invisibleGround.visible=false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  cloudsGroup=new Group();
}

function draw() {
  background("aquamarine");
  
  if(gamestate===Game){
    play.visible=false;
     restart.visible=false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
if(keyDown("space")&&monkey.y>200){
  monkey.velocityY=-18
}

   survive = survive + Math.round(frameCount/80);

   
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);

  spawnObstacle();
  spawnFood();

  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach(1)
   score=score+1
   monkey.scale=monkey.scale+0.02;

     }
   
  spawnClouds()
  if(obstacleGroup.isTouching(monkey)){
    gamestate=end;
  }

   
    
  if(gamestate===end){

     restart.visible = true;
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
      obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
    
     cloudsGroup.setLifetimeEach(-1);
     cloudsGroup.setVelocityXEach(0);
     
     foodGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);

     gameOver=createSprite(200,200,20,20);
     gameOver.addImage(gameOverImage);
    
    
      
  if(mousePressedOver(restart)) {
      reset();
    }
   }
  

    drawSprites();
  }
}
function spawnObstacle(){
if(frameCount%90===0){
  obstacle=createSprite(400,345,20,20)
  obstacle.velocityX=-5     
  obstacle.lifetime=80
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.15
  obstacleGroup.add(obstacle)
   
}
}
function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(400,220,20,20)
    banana.velocityX=-5     
    banana.lifetime=80
    banana.addImage(bananaImage)
    banana.scale=0.15
    foodGroup.add(banana)
     
  }
  }

function reset(){
  gameState=PLAY;
  
  restart.visible=false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score=0;
  survive=0;
  
  monkey.addAnimation("running",monkey_running)
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.9;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
  
   
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
