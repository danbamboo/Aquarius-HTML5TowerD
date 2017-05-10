//**********************************************************
// BrigBlasterTower Class for Brigantine Blaster Tower Type
//**********************************************************

var BrigBlasterTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1400, 1830, 'spaceItems', 'playerShip3_blue.png');
    this.scale.y=.6;
    this.scale.x=.6;
    
    this.towerType = "brigBlaster";
    this.towerName = "Brigantine Blaster";
    this.radius = 100;
    this.set = 0;
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    this.weapon = game.add.weapon(30, 'spaceItems', 'beam6.png');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 300;
    this.weapon.bulletSpeed = 2000;
    this.weapon.fireRate = 150;
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

    //to add one child for radius
    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    //to make it invisible upon creation
    fireRadius.lineStyle(5, 0x191970, 0.8);
    fireRadius.drawCircle(0, 0, 600);
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
 
BrigBlasterTower.prototype = Object.create(Phaser.Sprite.prototype);
BrigBlasterTower.prototype.constructor = BrigBlasterTower;
 
 
//************************
// BrigBlasterTower Setup
//************************ 

BrigBlasterTower.prototype.update = function(){

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
        if(this.inMenu)
        {
            removeStats(this);
        }
        this.children[0].visible = false;
    }
    
    this.weapon.trackSprite(enemies, 0, 0);
    
    game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}