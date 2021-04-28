class Food{
    constructor(foodStock,lastFed){
      this.image = loadImage("Milk.png")



    }
    
     getFoodStock(){
      foodStock  = database.ref('Food');
      foodStock.on("value",function(data){
         foodS = data.val();
      })
    
    }
    
     updateFoodStock(x){
      if(x !== 0){
        x--;
      }
    
      database.ref('/').update({Food:x});
    }

    deductFood(){

    }

    addFoodStock(x){
      x++;
      database.ref('/').update({Food:x});
    }

    display(){
      var x = 0;
      var y = 100;

      imageMode(CENTER);
      image(this.image,720,220,70,70);
    }
    
  }

