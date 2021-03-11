var balloon;
var database;
var backIg,position;


function preload() {

  backIg = loadImage("cityImage.png")

}

function setup() {
  database = firebase.database();

  createCanvas(800,400);

  balloon = createSprite(100, 350, 50, 50);

  var ballposition = database.ref('ball/position');
    ballposition.on("value", readPosition, showError);

}


function draw() {
  background(backIg); 
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  } 
  drawSprites();


}

function writePosition(x,y){
  database.ref('balloon/position').set(
{ 'x': position.x + x,
  'y': position.y + y
}
) 
}

function readPosition(data){

  position=data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}