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
    game.world.add(this);
   
    //to add radius around the tower
    var fireRadius = game.add.graphics();
        game.physics.arcade.enable(fireRadius);
        fireRadius.lineStyle(5, 0xFF000B, 0.8); 
        fireRadius.drawCircle(0, 0, 500);     //need to update size
        this.addChild(fireRadius);
        this.children[0].visible = false;
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
    if(this.children[0] != null){
   
        if(this.input.pointerOver()){

            this.children[0].visible = true;

        }    
        else{
        
            this.children[0].visible = false;
        }
    }    
    
    weaponClipCatast.trackSprite(enemies, 0, 0);
    
    //Check when enemy enter boundary
    game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}