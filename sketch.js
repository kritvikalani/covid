const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var saviour;
var saviourImage;
var corona, coronaImage, coronaGroup;
var corona2, corona2Image, corona2Group;
var mask1, mask1Image, mask1Group;
var mask2, mask2Image, mask2Group;
var mask3, mask3Image, mask3Group;
var mask4, mask4Image, mask4Group;
var score;
var brick1, brick1Image/*, brick1Group*/;
var brick2, brick2Image;
var bg, bgImage;
var gameState= 0;
var bricks1 = [];
var next_level
var textVisible = false
var text1
var end, endImage;

function preload() {
saviourImage= loadImage("ppe.png");
mask1Image= loadImage("mask.png");
mask2Image= loadImage("mask2.png");
coronaImage= loadImage("obstacle.png");
brick1Image= loadImage("BRICK.jpg");
bgImage= loadImage("bg.png");
endImage= loadImage("END.png")
//brick2Image= loadImage("level2BrickOp.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
    world = engine.world;

    bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight)
    bg.addImage(bgImage);
    bg.scale= 0.7;

    mask1Group = new Group();
    mask2Group = new Group();
    coronaGroup = new Group();
    mask3Group = new Group();
    mask4Group = new Group();
    corona2Group = new Group();
    brick1Group = new Group();

    score = 0;

  saviour= createSprite(displayWidth/2,800,50,50)
  saviour.scale = 0.75
 saviour.addImage(saviourImage);
 next_level = createSprite(displayWidth - 100, displayHeight/10, 80,20)
 next_level.visible = false
 



 /*brick1= createSprite(displayWidth/2, displayHeight/2, 30, 10)
 brick2.addImage(brick2Image);*/

 /*if(frameCount % 150 === 0){
 for(var i=0; i<1; i++){
  corona.push(new Obstacles(random(0,1200), random(200,1200)));
 }
}*/
}

function draw() {
  background(0); 
  Engine.update(engine);

  if(gameState === 0) {
    if (keyDown(RIGHT_ARROW)) {
      saviour.velocityX = 4;
      saviour.velocityY = 0;
    }
  
    if (keyDown(LEFT_ARROW)) {
      saviour.velocityX = -4;
      saviour.velocityY = 0;
    }

    if (keyDown(DOWN_ARROW)) {
      saviour.scale = 0.5
    }

    if (keyDown(UP_ARROW)) {
      saviour.scale = 0.75
    }
  
   /* if (keyDown(UP_ARROW)) {
      saviour.velocityY = -4;
      saviour.velocityX = 0;
    }
  
    if (keyDown(DOWN_ARROW)) {
      saviour.velocityY = 4;
      saviour.velocityX = 0;
    }
*/
    for(var i = 0; i < mask1Group.length; i++) {
    if (mask1Group.get(i).isTouching(saviour)) {
      score = score + 1
      mask1Group.get(i).remove();
    }
  }
  for(var j = 0; j < mask2Group.length; j++) {
    if (mask2Group.get(j).isTouching(saviour)) {
      score = score + 1
      mask2Group.get(j).remove();
    }
  }
  
    if (saviour.isTouching(mask2Group)) {
      score = score + 1
      mask2Group.destroyEach();
    }
  
    if (saviour.isTouching(coronaGroup)) {
      saviour.x = displayWidth/2;
      saviour.y = 800;
      saviour.velocityX = 0;
      saviour.velocityY = 0;
      score = 0;
    }

    Mask1();
  Mask2();
  covid();
  }

  if (score===1) {
    gameState=1;
    level1();
    next_level.visible = true
    textVisible = true
  }

/*if(score%2===0) {
  gameState = 1;
}  */

  /*for (var i in corona){

    
      if(saviour.intersects(corona[i])) {
      saviour.x = 380;
     saviour.y = 780;
    }

  }*/
  /*camera.position.x= displayWidth/2
  camera.position.y= saviour.y*/

 /* for(var i=0; i<1; i++){
  corona[i].display();
  corona[i].update();
  }*/



if(mouseIsPressed && score===1){
  gameState=2;
  level2();
}

  drawSprites();

stroke("white");
textSize(20);  
fill("white");
text("Masks collected= " + score, displayWidth - 200, displayHeight/6)
if(textVisible===true){
  noStroke()
  textSize(15);  
  fill("white");
  text("Next Level",displayWidth - 140, displayHeight/9.5) 
}

}

function Mask1() {
  if (frameCount%200===0) {
    mask1 = createSprite(random(100,displayWidth - 100), random(100, saviour.y - 20), 20,20)
    mask1.addImage(mask1Image);
    mask1.velocityX = 0;
    mask1.velocityY = random(1,3)
    mask1.scale = 0.1;
    mask1.setCollider("circle", 0, 0, 10)
    mask1.debug = true;
    mask1.lifetime = 1200
    mask1Group.add(mask1)
  }
}

function Mask2() {
  if (frameCount%300===0) {
    mask2 = createSprite(random(100, displayWidth - 100), random(50, saviour.y - 200), 20,20)
    mask2.addImage(mask2Image);
    mask2.velocityX = 0;
    mask2.velocityY = random(1,3)
    mask2.scale = 0.2;
    mask2.setCollider("circle", 0, 0, 20)
    mask2.debug = true;
    mask2.lifetime = 1200
    mask2Group.add(mask2)
  }
}

function covid() {
  if(frameCount%120===0) {
    corona = createSprite(random(100,displayWidth - 100), random(0, displayHeight - 300), 10);
    corona.velocityY = 2
    corona.shapeColor = "white"
    corona.addImage("covid", coronaImage)
    corona.scale = 0.04
    corona.setCollider("circle", 0, 0, 2)
    corona.debug = true;
    coronaGroup.add(corona);
  }
}

function level1() {
  if (gameState===1) {
    brick1= createSprite(displayWidth/2, 100, 30, 10)
    brick1.addImage(brick1Image);
    brick1.scale= 1;
   // brick1.visible = true
    mask1Group.destroyEach();
    mask2Group.destroyEach();
    coronaGroup.destroyEach();
    saviour.velocityX = 0;
    stroke("white");
    textSize(20);  
    //fill("white");    
    //text1 = text("YOU CREATED 10 BRICKS. CREATE 15 MORE TO MAKE A HOUSE", 400, displayHeight/2)
  //  brick1Group.add(brick1);
  if(mouseIsPressed){
    level2()
  }
  }
}

function Mask3() {
  if (frameCount%200===0) {
    mask3 = createSprite(random(100,displayWidth - 100), random(100, saviour.y - 20), 20,20)
    mask3.addImage(mask1Image);
    mask3.velocityX = 0;
    mask3.velocityY = random(1,3)
    mask3.scale = 0.1;
    mask3.setCollider("circle", 0, 0, 10)
    mask3.debug = true;
    mask3.lifetime = 1200
    mask3Group.add(mask3)
  }
}

function Mask4() {
  if (frameCount%300===0) {
    mask4 = createSprite(random(100, displayWidth - 100), random(50, saviour.y - 200), 20,20)
    mask4.addImage(mask2Image);
    mask4.velocityX = 0;
    mask4.velocityY = random(1,3)
    mask4.scale = 0.2;
    mask4.setCollider("circle", 0, 0, 20)
    mask4.debug = true;
    mask4.lifetime = 1200
    mask4Group.add(mask4)
  }
}

function covid2() {
  if(frameCount%200===0) {
    corona2 = createSprite(random(100,displayWidth - 100), random(0, displayHeight - 300), 10);
    corona2.velocityY = 3
    corona2.shapeColor = "white"
    corona2.addImage("covid", coronaImage)
    corona2.scale = 0.04
    corona2.setCollider("circle", 0, 0, 2)
    corona2.debug = true;
    corona2Group.add(corona2);
  }
}


function level2() {
  if(gameState===2){
    textVisible = false
   // brick1.destroy();
   brick1.removeSprite();
   next_level.visible = false
    mask1Group.destroyEach();
    mask2Group.destroyEach();
    coronaGroup.destroyEach();
    text1.visible = false
    score = 0;
 
  if (keyDown(RIGHT_ARROW)) {
    saviour.velocityX = 4;
    saviour.velocityY = 0;
  }

  if (keyDown(LEFT_ARROW)) {
    saviour.velocityX = -4;
    saviour.velocityY = 0;
  }

  if (keyDown(DOWN_ARROW)) {
    saviour.scale = 0.5
  }

  if (keyDown(UP_ARROW)) {
    saviour.scale = 0.75
  }

 /* if (keyDown(UP_ARROW)) {
    saviour.velocityY = -4;
    saviour.velocityX = 0;
  }

  if (keyDown(DOWN_ARROW)) {
    saviour.velocityY = 4;
    saviour.velocityX = 0;
  }
*/
  for(var i = 0; i < mask3Group.length; i++) {
  if (mask3Group.get(i).isTouching(saviour)) {
    score = score + 1
    mask3Group.get(i).remove();
  }
}
for(var j = 0; j < mask4Group.length; j++) {
  if (mask4Group.get(j).isTouching(saviour)) {
    score = score + 1
    mask4Group.get(j).remove();
  }
}

  if (saviour.isTouching(mask3Group)) {
    score = score + 1
    mask3Group.destroyEach();
  }

  if (saviour.isTouching(mask4Group)) {
    score = score + 1
    mask4Group.destroyEach();
  }

  if (saviour.isTouching(corona2Group)) {
    saviour.x = displayWidth/2;
    saviour.y = 800;
    saviour.velocityX = 0;
    saviour.velocityY = 0;
    score = 0;
  }
  if (score===2) {
    gameOver();
  }
  Mask3();
  Mask4();
  covid2();
}
}

function gameOver(){
  end = createSprite(displayWidth/2, displayHeight/2,displayWidth, displayHeight)
  end.addImage(endImage);
}

/*function intersects(other){

  var d = dist(saviour.x,saviour.y,other.x,other.y)
  if(d< saviour.x + other.x){
    return true;
  }
  else{
    return false;
  }
}*/
