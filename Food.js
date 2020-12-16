class Food{
    constructor(){
        var foodStock1,lastFed
        this.foodStock1 = 20
        this.image = loadImage('Milk.png')
    }
    getFoodStock(){
        foodStock1 = database.ref('foodStock')
        foodStock1.on('value',function(data){
            foodStock = data.val();
        })
    }
updateFoodStock(count){
    database.ref('/').update({
        foodStock:count
    });
}
deductFood(count){
    database.ref('/').update({
        foodStock:count
    })
}
display(){
    var x=200,y=400;

    imageMode(CENTER);
    image(this.image,200,400,70,70);
    if(this.foodStock1!=0){
        for(var i=0;i<this.foodStock1;i++){
            if(i%10===0){
            x=80;
            y=y+50
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}
}