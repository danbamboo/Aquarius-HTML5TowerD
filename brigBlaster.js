//************************
// BrigBlasterTower Class
//************************

var BrigBlasterTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1500, 45, 'spaceItems', 'playerShip1_blue.png');
    
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    game.physics.arcade.enable(this);
    this.body.setCircle(150,-100,-112);
    game.world.add(this);
    berzerkers.add(this);
    
} 
 
BrigBlasterTower.prototype = Object.create(Phaser.Sprite.prototype);
BrigBlasterTower.prototype.constructor = BrigBlasterTower;
 
 
//************************
// BrigBlasterTower Setup
//************************ 

function dragBrigBlasterTower(){

    var newBrigBlasterTower = new BrigBlasterTower(game);
    //game.world.add(newBrigBlasterTower);
    //berzerkers.add(newBrigBlasterTower);
    
} 
 
function setBrigBlasterTower(tower){
    
    tower.input.disableDrag();
    tower.rotation = game.physics.arcade.angleBetween(tower, enemies); 
}


BrigBlasterTower.prototype.update = function(){
  
    this.events.onDragStart.add(dragBrigBlasterTower, this);
    this.events.onDragStop.add(function(){setBrigBlasterTower(this)}, this); 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){
        var fireRadius = game.add.graphics();
        game.physics.arcade.enable(fireRadius);
        fireRadius.lineStyle(5, 0xFF000B, 0.8);
        fireRadius.drawCircle(0, 0, 300);
        this.addChild(fireRadius);
    }    
    else{
            if(this.children[0] != null){
                this.children[0].destroy();
            }
    }
    
    weapon.trackSprite(enemies, 0, 0);
    
    //Check when enemy enter boundary
   game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
    
}

//Init tower to fire at enemy
function boundCheck(tower, enemy){
    
   weapon.trackSprite(tower, 0, 0);
   weapon.fireAtSprite(enemy);
   weapon.fire();
}
