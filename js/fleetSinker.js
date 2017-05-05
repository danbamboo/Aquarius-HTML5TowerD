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
    this.weapon = game.add.weapon(30, 'spaceItems', 'laserGreen13.png');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 50;
    this.weapon.bulletSpeed = 4000;
    this.weapon.fireRate = 550;
    this.weapon.trackRotation = true;
    this.weapon.autoFire = true;    
    this.weapon.multiFire = true;
    this.weapon.damage = 8;
    var fireRadius = game.add.graphics();
    game.physics.arcade.enable(fireRadius);
    fireRadius.lineStyle(5, 0xFF000B, 0.8);
    fireRadius.drawCircle(0, 0, 300);       //need to update size
    this.addChild(fireRadius);
    this.children[0].visible = false;
    game.world.add(this);
    

    
    
} 
 
FleetSinkerTower.prototype = Object.create(Phaser.Sprite.prototype);
FleetSinkerTower.prototype.constructor = FleetSinkerTower;
 
 
//************************
// FleetSinkerTower Setup
//************************ 

FleetSinkerTower.prototype.update = function(){
  
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
