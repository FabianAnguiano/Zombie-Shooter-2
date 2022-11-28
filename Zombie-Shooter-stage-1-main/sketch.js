var bulletGroup;
var zombieGroup;
var health = 3;

function preload() {

  bgIMG = loadImage("assets/bg.jpeg");
  playerShooterIMG = loadImage("assets/shooter_2.png");
  playerShootingIMG = loadImage("assets/shooter_3.png");
  zombieIMG = loadImage("assets/zombie.png");
  heart1IMG = loadImage("assets/heart_1.png");
  heart2IMG = loadImage("assets/heart_2.png");
  heart3IMG = loadImage("assets/heart_3.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bulletGroup = new Group();
  zombieGroup = new Group();

  bg = createSprite(displayWidth/2,displayHeight/2)
  bg.addImage("graveyard",bgIMG);
  bg.scale = 1.2;

  playerHealth1 = createSprite(1400,40)
  playerHealth1.addImage("health1",heart1IMG);
  playerHealth1.scale = 0.4;

  playerHealth1.visible = false;

  playerHealth2 = createSprite(1300,40)
  playerHealth2.addImage("health2",heart2IMG);
  playerHealth2.scale = 0.4;

  playerHealth2.visible = false;

  playerHealth3 = createSprite(1200,40)
  playerHealth3.addImage("health3",heart3IMG);
  playerHealth3.scale = 0.4;

  playerHealth3.visible = true;
  
  player = createSprite(200,500);
  player.addImage(playerShooterIMG);
  player.scale = 0.5;

}

function draw() {
  background("black");

  if(zombieGroup.isTouching(player)) {
    health -= 1;
  }

  if(health == 3) {
    playerHealth1.visible = false;
    playerHealth2.visible = false;
    playerHealth3.visible = true;
  } 
  else if(health == 2) {
    playerHealth1.visible = false;
    playerHealth2.visible = true;
    playerHealth3.visible = false;
  }
  else if(health == 1) {
  playerHealth1.visible = true;
  playerHealth2.visible = false;
  playerHealth3.visible = false;

  } 
  

  

  if(keyDown("left")) {
    player.x -= 10;
  }

  if(keyDown("right")) {
    player.x += 10;
  }

  if(keyDown("up")) {
    player.y -= 10;
  }

  if(keyDown("down")) {
    player.y += 10;
  }



 
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(playerShooterIMG)
  bullet = createSprite(player.x + 80,player.y -40);
  bullet.scale = 0.1;
  bullet.velocityX = 10;
  bulletGroup.add(bullet);

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(playerShootingIMG)
}

if(zombieGroup.isTouching(bulletGroup)) {
 for(var i = 0; i < zombieGroup.length; i++) {
  if(zombieGroup[i].isTouching(bulletGroup)) {
    bulletGroup.destroyEach();
    zombieGroup[i].destroy();
  }
 }
}
  //calling function
  spawnZombies();
  
  drawSprites();
}

function spawnZombies() {

  if(frameCount % 50 == 0) {
  var zombie = createSprite(1500,500);
  zombie.y = Math.round(random(150,450));
  zombie.addImage("Zombie",zombieIMG,);
  zombie.scale = 0.2;
  zombie.velocityX = -5;
  zombieGroup.add(zombie);

  }

}