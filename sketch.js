var dog, happyDog;
var database;
var foodS, foodStock;
var button1, button2;
var fedTime, lastFed;
var foodObj;

//Create variables here

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  //load images here
}

function setup() {
  createCanvas(500, 500);
 
dog = createSprite(250,290);
dog.addImage(dogImage);
dog.scale=0.2

foodObj = new foodObj(300,290);

database=firebase.database();
foodStock=database.ref('Food');
foodStock.on("value",readStock);

feed = createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed==0) {
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
  //add styles here

  display();

  foodObj.display();
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

