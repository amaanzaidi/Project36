var dog,happyDog,database,foodS,foodStock,dogImage;
var lastFed,fedTime,foodObj,addFood,Feed,Name
function preload()
{
dogImage = loadImage('dogImg.png');
happyDog = loadImage('dogImg1.png');
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  dog = createSprite(600,400,10,10);
  dog.addImage(dogImage);
  foodObj = new Food()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  Feed = createButton('Feed the dog');
  Feed.position(500,100);
  Feed.mousePressed(feedDog);
  Name = createInput("Pet name")
  Name.position(400,150)
  addFood = createButton("Add Food");
  addFood.position(400,100);
  addFood.mousePressed(addFood);
}


function draw() {  
background(46,139,87)
foodObj.display();
  drawSprites();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+"PM", 350,30)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }
}
function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour
 })
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
    'Food':x
  })
}

