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
    this.weapon = game.add.weapon(30, 'spaceItems', 'beam1.png');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 75;
    this.weapon.bulletSpeed = 3000;
    this.weapon.fireRate = 400;
    this.weapon.trackRotation = true;
    this.weapon.autoFire = true;    
    this.weapon.multiFire = true;
    this.weapon.damage = 6;
    //to add radius around the tower
    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    fireRadius.lineStyle(5, 0xFF000B, 0.8); 
    fireRadius.drawCircle(0, 0, 500);     //need to update size
    this.addChild(fireRadius);
    this.children[0].visible = false;
    game.world.add(this);
   
    
} 
 
ClipCatastTower.prototype = Object.create(Phaser.Sprite.prototype);
ClipCatastTower.prototype.constructor = ClipCatastTower;
 
 
//***********************
// ClipCatastTower Setup
//*********************** 

ClipCatastTower.prototype.update = function(){
  
    //this.events.onDragStart.add(function(){dragTower(this)}, this);
    this.events.onDragStop.add(function(){setTower(this)}, this); 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){

        this.children[0].visible = true;
        
    }    
    else{
        
        this.children[0].visible = false;
    }

    
    
    this.weapon.trackSprite(enemies, 0, 0);
    
    //Check when enemy enter boundary
    game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}