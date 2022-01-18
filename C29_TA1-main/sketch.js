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
var ground, rope, fruit, fruit_con;

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  ground = new Ground(250, 700, width, 10);
  rope = new Rope(6, {x: 245, y: 30});
  fruit = new Link(rope, fruit);

  var fruitOptions = {
    density: 0.001
  }

  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Matter.Composite.add(rope.body, fruit)
}

function draw() 
{
  background(51);
  Engine.update(engine);

  ground.show();
  rope.show();   

  ellipse(fruit.position.x, fruit.position.y, 15, 15);
}






