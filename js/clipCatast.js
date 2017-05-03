//**********************************************************
// ClipCatastTower Class for Clipper Catastrophe Tower Type
//**********************************************************

var ClipCatastTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1380, 45, 'spaceItems', 'enemyRed1.png');
    
    this.towerType = "clipCatast";
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    game.physics.arcade.enable(this);
    this.body.setCircle(150,-100,-112);     //need to update size
    
    game.world.add(this);
    berzerkers.add(this);  
} 
 
ClipCatastTower.prototype = Object.create(Phaser.Sprite.prototype);
ClipCatastTower.prototype.constructor = ClipCatastTower;
 
 
//***********************
// ClipCatastTower Setup
//*********************** 

ClipCatastTower.prototype.update = function(){
  
    this.events.onDragStart.add(function(){dragTower(this)}, this);
    this.events.onDragStop.add(function(){setTower(this)}, this); 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){
        var fireRadius = game.add.graphics();
        game.physics.arcade.enable(fireRadius);
        fireRadius.lineStyle(5, 0xFF000B, 0.8); 
        fireRadius.drawCircle(0, 0, 500);     //need to update size
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