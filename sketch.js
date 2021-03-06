var dogHappy,dogNormal,database,foodS,foodStock, ButtonFeed, ButtonAdd,fedTime, lastFed,food;

function preload(){
  dogNormal = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

 function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  food = new Food();
  
  dog = createSprite(250,350,20,20);
  dog.addImage("normal",dogNormal);
  dog.scale = 0.1

  foodStock = database.ref('gameState');
  foodStock.on("value",function(data){
    gameState = data.val();
 })

  ButtonFeed = createButton("Feed the dog");
  ButtonAdd = createButton("Add food");
  ButtonAdd.position(displayWidth/2 - 40,70)
  ButtonFeed.position(displayWidth/2 + 30,70)
  ButtonAdd.mousePressed(addFoods);
  ButtonFeed.mousePressed(feedDog);


  
}

function draw() {  
  background(46, 139, 87);

  textSize(10);
  fill("white");

  food.display()
  food.getFoodStock();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  if(foodS){
    text("food remaining = " + foodS,50,50);
  }

  if(lastFed==0){
    text("Last Fed: 12 AM", 180,50);
  }
  else if(lastFed>=12){
    text("Last Fed: " + lastFed%12 + "PM", 180,50);
  }
  else{
    text("Last Fed: " + lastFed + "AM", 180,50);
  }


  if(foodS === 0){
    text("No food remaining",50,50);
  }

  

  drawSprites();
}

function updateFoodStock(x){
  if(x !== 0){
    x--;
  }

  database.ref('/').update({Food:x});
}

function addFoodStock(x){
  x++;
  database.ref('/').update({Food:x});
}

function feedDog(){
  dog.addImage(dogHappy);
  if(foodS){
    food.updateFoodStock(1);
  }

  lastFed = hour();

}

function addFoods(){
  if(foodS < 30){
    foodS++;
    database.ref('/').update({
      Food:foodS,
    })
  }
}
