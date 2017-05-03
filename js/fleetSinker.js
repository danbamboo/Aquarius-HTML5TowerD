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
    game.world.add(this);

    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    fireRadius.lineStyle(5, 0xFF000B, 0.8);
    fireRadius.drawCircle(0, 0, 300);       //need to update size
    this.addChild(fireRadius);
    this.children[0].visible = false;
    
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
    if(this.children[0] != null){
   
        if(this.input.pointerOver()){

            this.children[0].visible = true;

        }    
        else{
        
            this.children[0].visible = false;
        }
    }    
    
    weaponFleetSinker.trackSprite(enemies, 0, 0);
    
    //Check when enemy enter boundary
    game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}

