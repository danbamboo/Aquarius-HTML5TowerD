//**********************************************************
// FleetSinkerTower Class for Fleet Sinker Tower Type
//**********************************************************

var FleetSinkerTower = function(TDgame){
    
    Phaser.Sprite.call(this, TDgame, 1700, 1830, 'spaceItems', 'enemyGreen3.png');
    this.scale.y=.6;
    this.scale.x=.6;
    
    this.towerType = "fleetSinker";
    this.anchor.setTo(.5,.5);
    this.angle += 180;
    this.inputEnabled = true; 
    this.input.enableDrag(true);
    this.weapon = game.add.weapon(30, 'spaceItems', 'laserGreen13.png');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 50;
    this.weapon.bulletSpeed = 4000;
    this.weapon.fireRate = 550;
    this.weapon.trackRotation = true;
    this.weapon.autoFire = true;    
    this.weapon.multiFire = true;
    this.weapon.damage = 8;
    
    this.inMenu = true;  
    this.pointerOn = false;
    this.statsMenu;

    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    fireRadius.lineStyle(5, 0x191970, 0.8);
    fireRadius.drawCircle(0, 0, 300);       //need to update size
    this.addChild(fireRadius);
    this.children[0].visible = false;
    
    //to show if the placement is invalid
    var invalidPlacement = game.add.graphics();
    game.physics.arcade.enable(invalidPlacement);
    invalidPlacement.beginFill(0xFF0000, 0.3);
    invalidPlacement.drawCircle(0, 0, 250);
    this.addChild(invalidPlacement);
    this.children[1].visible = false;
    
    game.world.add(this);
    

    
    
} 
 
FleetSinkerTower.prototype = Object.create(Phaser.Sprite.prototype);
FleetSinkerTower.prototype.constructor = FleetSinkerTower;
 
 
//************************
// FleetSinkerTower Setup
//************************ 

FleetSinkerTower.prototype.update = function(){
  
    //this.events.onDragStart.add(function(){dragTower(this)}, this);
    if(!game.physics.arcade.overlap(this, berzerkers, towerCollide, null, this)){;
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
    
    //Check when enemy enter boundary
    game.physics.arcade.overlap(this, enemies, boundCheck, null, this);
    
}
