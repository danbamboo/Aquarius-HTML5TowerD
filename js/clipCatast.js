//**********************************************************
// ClipCatastTower Class for Clipper Catastrophe Tower Type
//**********************************************************

var ClipCatastTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1550, 1830, 'spaceItems', 'enemyRed1.png');
    this.scale.y=.6;
    this.scale.x=.6;
    
    this.towerType = "clipCatast";
    this.towerName = "Clipper Catastrophe";
    this.cost = 150;
    this.placedOnWater = false;
    this.hasBeenMoved=false;
    this.radius = 100;
    this.set = 0;
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    this.weapon = game.add.weapon(30, 'spaceItems', 'laserRed06.png');
    this.weapon.bulletAngleOffset = 90;
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 400;
    this.weapon.bulletSpeed = 3000;
    this.weapon.fireRate = 300;
    this.weapon.trackRotation = true;
    this.weapon.autoFire = true;    
    this.weapon.multiFire = true;
    this.weapon.damage = 3;
    
    this.inMenu = true;
    this.pointerOn = false;
    this.statsMenu;
    this.nameMenuText;
    this.damageMenuText;
    this.fireRateText;
    this.rangeText;

    //to add radius around the tower
    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    fireRadius.lineStyle(5, 0x191970, 0.8); 
    fireRadius.drawCircle(0, 0, 800);     //need to update size
    this.addChild(fireRadius);
    this.children[0].visible = false;
    
    //to show if the placement is invalid
    var invalidPlacement = game.add.graphics();
    game.physics.arcade.enable(invalidPlacement);
    invalidPlacement.beginFill(0xFF0000, 0.3);
    invalidPlacement.drawCircle(0, 0, 110);
    this.addChild(invalidPlacement);
    this.children[1].visible = false;
    
    game.world.add(this);
   
    
} 
 
ClipCatastTower.prototype = Object.create(Phaser.Sprite.prototype);
ClipCatastTower.prototype.constructor = ClipCatastTower;
 
 
//***********************
// ClipCatastTower Setup
//*********************** 

ClipCatastTower.prototype.update = function(){
  
    //this.events.onDragStart.add(function(){dragTower(this)}, this);
    if((towerCollision(berzerkers, this) == 0) && (this.set == 0)){
        this.events.onDragStop.add(function(){setTower(this)}, this); 
    }
 
 
    //Add Radius on hover 
    if(this.input.pointerOver()){

        this.children[0].visible = true;
        if(this.inMenu && !this.pointerOn){
            getStats(this);
        }
        
    }    
    else{
        if(this.inMenu && this.pointerOn)
        {
            removeStats(this);
        }
        this.children[0].visible = false;
    }

    
    
    this.weapon.trackSprite(enemies, 0, 0);
    
    //to cycle through each enemy checking if it is within shooting range, if so fire upon first enemy in range
    if(this.set == 1){
        enemies.forEach(function(IndEnemy){
            // console.log(IndEnemy);
            if(game.physics.arcade.distanceBetween(this, IndEnemy) < this.weapon.bulletKillDistance){
                boundCheck(this, IndEnemy);
            }
    
            
        }, this);
    }
    
    this.game.physics.arcade.overlap(this.weapon.bullets, enemies, collisionCheck, null, this);
    
}