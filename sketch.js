var groundImg, ground, invisibleGround;
var bunnyIdle, bunny, bunny_run, bunnyDeath;

var START = 1;
var PLAY = 2;
var END = 3;

var gameState = START;

var gameOverImg, restartImg, startImg, nameImg;


var obstacleGroup, obstacle, snake, hyena, hyenaAttack, scorpian;

var currentObstacle; 


function preload(){

groundImg = loadImage("ground2.png");
bunnyIdle = loadAnimation("bunnyIdle1.png","bunnyIdle2.png","bunnyIdle3.png","bunnyIdle4.png");
bunny_run = loadAnimation("bunnyRun1.png","bunnyRun2.png","bunnyRun5.png","bunnyRun6.png");
bunnyDeath = loadAnimation("bunnyDeath1.png","bunnyDeath2.png","bunnyDeath3.png","bunnyDeath4.png","bunnyDeath5.png","bunnyDeath6.png","bunnyDeath7.png","bunnyDeath8.png")

snake = loadAnimation("snake1.png","snake2.png","snake3.png","snake4.png");
hyena = loadAnimation("hyena1.png","hyena2.png","hyena3.png","hyena4.png","hyena5.png","hyena6.png");
scorpian = loadAnimation("scropian1.png","scorpian2.png","scorpian3.png","scorpian4.png");
hyenaAttack = loadAnimation("hyenaAttack1.png","hyenaAttack2.png","hyenaAttack3.png","hyenaAttack4.png","hyenaAttack5.png","hyenaAttack6.png")

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restartText.png");
startImg = loadImage("startText.png");
nameImg = loadImage("name.png");


}

function setup() {
 createCanvas(600,600);
 ground = createSprite(300,300);
 ground.addImage("ground",groundImg);
 ground.x = width/2
 

 bunny = createSprite(70,100);
 bunny.addAnimation("idle",bunnyIdle);
 bunny.addAnimation("running",bunny_run);
 bunny.addAnimation("death",bunnyDeath);
 bunny.setCollider('circle',0,3,13)
 bunny.scale = 2;

 
 
 invisibleGround = createSprite(70,307,50,10);  
 invisibleGround.shapeColor = "white";
 invisibleGround.visible = true; 

 gameOver = createSprite(300,120);
 gameOver.addImage("gameOver",gameOverImg);
 gameOver.scale = 0.2;
 gameOver.visible = false;

 restart = createSprite(310,50);
 restart.addImage("restart",restartImg);
 restart.scale = 0.2
 restart.visible = false;

 start = createSprite(295,50);
 start.addImage("start",startImg);
 start.scale = 0.25;
 start.visible = true;

 Name = createSprite(290,120);
 Name.addImage("name",nameImg);
 Name.scale = 0.7
 Name.visible = true;

 obstacleGroup = new Group();
 

}

function draw() {
background(233, 233, 233);


if (ground.x < 0){
    ground.x= ground.width/2;
  }
  
  //if(gameState===START){
    //
    //invisibleGround.y  = 250;

  if(keyWentDown("a")){ 
    gameState = PLAY;
      
  }
  

  if(gameState===PLAY){
    if (keyDown("SPACE")){
      bunny.velocityY = -13;
     } 
    bunny.velocityY = bunny.velocityY + 0.8;
    bunny.changeAnimation("running", bunny_run);
    spawnObstacle();
    start.visible = false;
    Name.visible = false;
    ground.velocityX = -5; 
    bunny.x = 70;
    bunny.y = 270;
    invisibleGround.y = 308; 
    invisibleGround.x = 70;
    
    
   }
  else if (gameState===START){
      bunny.x = 290;
      invisibleGround.y  = 250;
      invisibleGround.x = 290;
    }
    

  // if(gameState===START){
  //   bunny.x = 290;
  //   invisibleGround.y  = 250;
  //   invisibleGround.x = 290;
  // }
    

    if(obstacleGroup.isTouching(bunny)){
     gameState = END;
     bunny.changeAnimation("death",bunnyDeath);

     if(gameState === END){
      obstacleGroup.setVelocityXEach(0);
      ground.velocityX = 0; 
      obstacleGroup.setLifetimeEach(-1);
      gameOver.visible = true;
      restart.visible = true;
     }
     
   }
  
//}

  
  if(keyWentDown("r")){
    reset();
  }
  
  if(touches.length > 0 || keyDown("space")){
    bunny.velocityY = -13;
    } 

  bunny.velocityY = bunny.velocityY + 0.8;

  bunny.collide(invisibleGround);

  


 drawSprites();
}

function spawnObstacle() {
  
    if(frameCount % 100 === 0) {
      obstacle = createSprite(width-20,267,20,30);
      obstacle.setCollider('circle',0,0,8)
      obstacle.velocityX = -5;
      

      var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addAnimation("x",snake);
              break;
      case 2: obstacle.addAnimation("y",hyena);
              break;
      case 3: obstacle.addAnimation("z",scorpian);
              break;
      default: break;
    }
    obstacle.scale = 1.4;

    obstacleGroup.add(obstacle);
      
    }}

function reset(){
  gameState = START;
  gameOver.visible = false;
  restart.visible = false;
  Name.visible = true;
  start.visible = true;
  bunny.x = 290;
  bunny.y = 70;
  invisibleGround.y  = 250;
  invisibleGround.x = 290;


  obstacleGroup.destroyEach();

  bunny.changeAnimation("idle",bunnyIdle);
}

    
    