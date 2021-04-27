//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var sadDog, happyDog;
var foodObj;
var feedTime, lastFed, feed, addFood;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  foodObj = new Food();
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {  
  background("green");
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("Press up arrow to feed the dog", 50, 50);
    text("Food Remaining: "+ foodS,150,150);
    
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20; 
    }
  }
  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x= x-1;
    }
    database.ref("/").update({
      Food:x
    });
}

function readStock(data){
  foodS = data.val;
}


function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
