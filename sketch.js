const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, rope, rope2, rope3;
var fruit_con, fruit_con2, fruit_con3;
var bgImg, fImg, bImg, bunny, button, button2, button3;
var blink, eat, sad;
var bgSound, sadSound, eatingSound, airSound, cutSound;
var muteButton, blower;
var canw, canh;

function preload()
{
  bgImg = loadImage("background.png");
  fImg = loadImage("melon.png");
  bImg = loadImage("Rabbit-01.png");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  blink.looping = true;
  eat.looping = false;
  sad.looping = false;

  bgSound = loadSound("sound1.mp3");
  sadSound = loadSound("sad.wav");
  cutSound = loadSound("rope_cut.mp3");
  eatingSound = loadSound("eating_sound.mp3");
  airSound = loadSound("air.wav");

}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if(isMobile)
  {
    canw = diplayWidth;
    canh = displayHeight;
  }
  else
  {
    canw = windowWidth;
    canh = windowHeight;
  }

  createCanvas(canw,canh);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canw/2, canh - 20,canw,20);

  rope = new Rope(8,{x: canw/2 - 150,y:30});
  rope2 = new Rope(6,{x:canw/2 + 130,y:30});
  rope3 = new Rope(5,{x: canw/2 + 250, y:canh/3 - 70});

  fruit = Bodies.circle(canw/2,canh/2 + 100,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3, fruit);
  
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  bunny = createSprite(canw/2, canh - 120, 20, 20);
  bunny.addImage(bImg);
  bunny.scale = 0.25;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);

  bunny.changeAnimation("blinking");

  button = createImg("cut_button.png");
  button.position(canw/2 - 150, 30);
  button.size(30, 30);
  button.mouseClicked(drop);

  button2 = createImg("cut_button.png");
  button2.position(canw/2 + 120, 30);
  button2.size(30, 30);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.position(canw/2 + 230, canh/3 - 80);
  button3.size(30,30);
  button3.mouseClicked(drop3);

  bgSound.play();

  muteButton = createImg("mute.png");
  muteButton.position(450, 30);
  muteButton.size(30, 30);
  muteButton.mouseClicked(mute);

  blower = createImg("balloon.png");
  blower.position(canw/3, canh/3);
  blower.size(150, 100);
  blower.mouseClicked(airBlow);
}

function draw() 
{
  background(51);

  image(bgImg, canw/2, canh/2, canw, canh);

  rope.show();
  rope2.show();
  rope3.show();

  if(fruit != null)
  {
    image(fImg,fruit.position.x,fruit.position.y,70,70);
  }

  Engine.update(engine);
  ground.show();

  if(collide(fruit, bunny) == true)
  {
    bunny.changeAnimation("eating");

    eatingSound.play();
  }

  if(fruit != null && fruit.position.y >= 600)
  {
    bunny.changeAnimation("crying");

    bgSound.stop();

    sadSound.play();

    fruit = null;

  }
    
  drawSprites(); 
}

function drop()
{
  rope.break();
  fruit_con.break();

  fruit_con = null;

  cutSound.play();
}

function drop2()
{
  rope2.break();
  fruit_con2.break();

  fruit_con2 = null;

  cutSound.play();
}

function drop3()
{
  rope3.break();
  fruit_con3.break();

  fruit_con3 = null;

  cutSound.play();
}

function collide(body, sprite)
{
  if(body != null)
  {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
  }

  if(d <= 80)
  {
    World.remove(world, body);
    fruit = null;
    return true;
  }
  else
  {
    return false;
  }

}

function mute()
{
  if(bgSound.isPlaying())
  {
    bgSound.stop();
  }
  else
  {
    bgSound.play();
  }
}

function airBlow()
{
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});

  airSound.play();
}
