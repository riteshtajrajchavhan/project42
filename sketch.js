var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  ritesh = loadAnimation("ritesh.png");
  bananaImage=loadImage("banana.png");
obstaceImage=loadImage("stone.png");
endImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;

  player2 = createSprite(100,300,20,50);
  player2.addAnimation("collided",ritesh);
  player2.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  end = createSprite(340,200,20,50);
  end.addImage(endImg);
  end.scale = 0.9;


  foodGroup = createGroup();
  obstacleGroup = createGroup();


}

function draw() { 
  background(0);
  drawSprites();

  player.collide(ground);


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

 end.visible=false;
player2.visible=false;
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
  



    if(player.isTouching(foodGroup)){ 
      foodGroup.destroyEach();
      score=score+100
       }  

       if(player.isTouching(obstacleGroup)){ 
      gameState=END;
        
         }  
  

    banana();
    obstacles();

    textSize(35);
    fill("Aqua");
    text("score = "+score,550,30);

  }

  else if(gameState === END){
end.visible=true;
backgr.velocityX=0;

player2.visible=true;
player.visible=false;

obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);

  }

  
 
 
 
 

}

function banana() {

  if (frameCount % 180 === 0) {
     bananas = createSprite(600,150,40,10);
   
    bananas.addImage(bananaImage);
    bananas.scale = 0.095;
    bananas.velocityX = -8;
    
     
    bananas.lifetime = 204;
    
      foodGroup.add(bananas);
    }


}


function obstacles() {

  if (frameCount % 250 === 0) {
    obstacle = createSprite(600,300,40,10);
   
    obstacle.addImage( obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    
     
    obstacle.lifetime = 204;
    
     obstacleGroup.add(obstacle);
    }


}

