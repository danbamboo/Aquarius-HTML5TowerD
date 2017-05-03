//**********************************************************
// BrigBlasterTower Class for Brigantine Blaster Tower Type
//**********************************************************

var BrigBlasterTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1500, 45, 'spaceItems', 'playerShip3_blue.png');
    
    this.towerType = "brigBlaster";
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

BrigBlasterTower.prototype.update = function(){
  
    this.events.onDragStart.add(function(){dragTower(this)}, this);
    this.events.onDragStop.add(function(){setTower(this)}, this); 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){
        var fireRadius = game.add.graphics();
        game.physics.arcade.enable(fireRadius);
        fireRadius.lineStyle(5, 0xFF000B, 0.8);
        fireRadius.drawCircle(0, 0, 600);
        this.addChild(fireRadius);
    }    
    else{
            if(this.children[0] != null){
                this.children[0].destroy();
            }
    }
    
    weaponBrigBlaster.trackSprite(enemies, 0, 0);
    
    //Check when enemy enter boundary
   game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}

