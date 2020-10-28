var monkey , monkey_running,money_hurt,house,houseImg;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground,jungle,gravity,gravityCount;
var hunger;
var gameOver, retry,gameImg,retryImg,congrats,congratsImg;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_hurt = loadAnimation("sprite_8.png");
  
  congratsImg = loadImage("congrats.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  gameImg = loadImage("gameover.png");
  
  houseImg = loadImage("house.jpg");
  
  retryImg = loadImage("retry.jpg");
  
  groundImg = loadImage("jungle56.jpg");
  
}



function setup() {
createCanvas(windowWidth,windowHeight);

  jungle = createSprite(width/2,height/2);
  jungle.addAnimation("jungle",groundImg);
  jungle.velocityX = -2
  jungle.scale = 1;
  
  house = createSprite(width/2,height/2);
  house.addImage("house",houseImg);
  house.scale = 0.5
  house.visible = false
  
  gravity = createSprite(width - 200,height - 300,400,3);
 gravity.visible = false;
  
  monkey = createSprite(80,height - 70,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_hurt);
  monkey.scale = 0.1;
  
  gameOver = createSprite(200,height - 275,30,30);
  gameOver.addImage("ok",gameImg)
  gameOver.scale = 1;
  gameOver.visible = false;
  
  retry = createSprite(200,height - 250,30,30); 
  retry.addImage("ok",retryImg)
  retry.scale = 0.04;
  retry.visible = false;

  ground = createSprite(400,height - 65,900,10);
  ground.velocityX =-4;
  ground.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",39,0,monkey.width,monkey.height);
  //monkey.debug = true;
  
  gravityCount = 0;
  survivalTime = 0;
  hunger = 100;
  
}


function draw() {
background("white")
  
 textSize(20);
  fill("black")
  text("Survival : "+ survivalTime,30,50);

  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  

 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

  
 if(touches.length > 0 && monkey.y  >= height- 320) {
      monkey.velocityY = -10;
       touches = [];
    }
  
  if (keyDown("space") && monkey.y  >= height- 320){
monkey.velocityY = -10
  }
  
   monkey.velocityY = monkey.velocityY + 0.9

  monkey.collide(ground);
  
  if(monkey.isTouching(gravity)){
    monkey.scale = monkey.scale - 0.0001
    gravityCount = gravityCount + 1;
  }
  
  if (gravityCount < 56){
reset()
  }

    if(obstacleGroup.isTouching(monkey)){
   retry1()
    }
  
  if (bananaGroup.isTouching(monkey)){
    monkey.scale = monkey.scale + 0.005;
    bananaGroup.destroyEach();
    hunger = hunger - 5;
  }

  textSize(18);
  text("HUNGER = " + hunger,200,25);
  
  if(hunger<1){
obstacleGroup.destroyEach();
bananaGroup.destroyEach();
obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setVelocityXEach(0);            
bananaGroup.setLifetimeEach(-1);
house.visible = true;
monkey.changeAnimation("collided",monkey_hurt);
  }

  
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
drawSprites();
spawnObstacles();
Bananas();
  
}

function Bananas(){
   if (frameCount % 80 === 0){
   banana = createSprite(600,165,10,40);
   banana.y = Math.round(random(120,200));  
   banana.addImage(bananaImage);
   banana.velocity.x = -6;
   banana.scale = 0.1;
   banana.lifetime = 100;
   bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 250 === 0) {
    obstacle = createSprite(width + 10,height - 85,10,40);
    obstacle.velocityX = -6;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    //obstacle.debug = true;
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  monkey.scale = 0.1;
  jungle.velocityX = -2
  hunger = 100;
  retry.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);
  survivalTime = 0;

  
}

function retry1(){
   bananaGroup.destroyEach();
       jungle.velocityX = 0;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setVelocityXEach(0);
        bananaGroup.setLifetimeEach(-1);
        survivalTime = 0;
        //gameOver.visible = true;
        retry.visible = true;
        monkey.changeAnimation("collided",monkey_hurt);
       if(mousePressedOver(retry)) {
      reset(); }
}

