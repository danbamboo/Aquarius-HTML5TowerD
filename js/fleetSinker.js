//**********************************************************
// FleetSinkerTower Class for Fleet Sinker Tower Type
//**********************************************************

var FleetSinkerTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1265, 45, 'spaceItems', 'enemyGreen3.png');
    
    this.towerType = "fleetSinker";
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    game.physics.arcade.enable(this);
    this.body.setCircle(150,-100,-112);     //need to update size
    
    game.world.add(this);
    berzerkers.add(this);
    
} 
 
FleetSinkerTower.prototype = Object.create(Phaser.Sprite.prototype);
FleetSinkerTower.prototype.constructor = FleetSinkerTower;
 
 
//************************
// FleetSinkerTower Setup
//************************ 

FleetSinkerTower.prototype.update = function(){
  
    this.events.onDragStart.add(function(){dragTower(this)}, this);
    this.events.onDragStop.add(function(){setTower(this)}, this); 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){
        var fireRadius = game.add.graphics();
        game.physics.arcade.enable(fireRadius);
        fireRadius.lineStyle(5, 0xFF000B, 0.8);
        fireRadius.drawCircle(0, 0, 300);       //need to update size
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

