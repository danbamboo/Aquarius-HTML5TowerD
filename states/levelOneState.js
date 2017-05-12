var levelOneState = function(game){

//***************************
// Global Variables
//***************************
    
var map;
var layer;
var sendWaveButton;
var collisionLayer;

//MenuBarVariables
var navbar;
var currentLevel,level;
var wave, currentWave;

//Sprites from spaceItems
var brigBlasterTower;
var clipCatastTower;
var fleetSinkerTower;

//Player Current Gold
var currentGold, goldMeter;
var brigCost, clipCost,fleetCost;
var rectangleEnding, enemySign;
    
//Tower Groups
var berzerkers;
//Ranage Tower Group
var towerRange;
//Groups
var enemies;
//Tower weapons
var weaponBrigBlaster;
var weaponClipCatast;
var weaponFleetSinker;
var spTree;
var villager1;
var village;

//Self Made Path Variables
var level1Path = [];
var path1,path2,path3,path4,path5;
var timeoutIndex =0;

}

 
levelOneState.prototype = {
  	create: function(){
  	    
      	this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //to load the map into the map
        map = this.game.add.tilemap('pirateMapOcean');
        //add the tileset from the json file
        map.addTilesetImage('tiles_sheet', 'tiles');
        
        
        layer = map.createLayer('Ground');
        layer.scale.y = .95;
        collisionLayer = map.createLayer('Background');
        collisionLayer.scale.y = .95;
        //layer = map.createLayer('Background');
        //layer.scale.y = .95;
        layer = map.createLayer('Foreground');
        layer.scale.y = .95;
        layer = map.createLayer('TowerCollision');
        layer.scale.y = .95;
        
        
        //Game Board Alignment
        layer.resizeWorld();
        collisionLayer.resizeWorld();
        
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true; 
        this.game.scale.refresh();
        
        //Enemies
        enemies = this.game.add.group();
        this.game.physics.arcade.enable(enemies);
       
        
        
        navbar = this.game.add.sprite(0, 1760, 'navbar');
        //Send Wave Button
        sendWaveButton = this.game.add.sprite(250,1800,'sendNextWaveButtn');
        sendWaveButton.inputEnabled = true;
        sendWaveButton.scale.x = 1.5;
        sendWaveButton.scale.y = 1.5;
        
        //====== MENU
        //CurrentLevelTextOnNavBar Initalize
        currentLevel = "Level 1";
        currentLevelName = "Tortuga";
        currentWave = '1 / 10';
        level = this.game.add.text(20,1800, currentLevel, { font: "40px Arial", fill: "#EBEBEB" });
        levelName = this.game.add.text(20,1850, currentLevelName, { font: "40px Arial", fill: "#7FFFD4" });
        this.game.add.text(277,1845, 'Wave:', { font: "30px Arial", fill: "#EBEBEB" });
        wave = this.game.add.text(280,1880, currentWave, { font: "30px Arial", fill: "#E74C3C" });
        //Menu Bar Gold Costs
        brigCost = 90;
        clipCost = 150;
        fleetCost = 210;
        currentGold = 250;  //Init player with 250 gold to start game
        this.game.add.text(510,1845, 'Gold:', { font: "30px Arial", fill: "#EBEBEB" });
        goldMeter = this.game.add.text(530,1880, currentGold, { font: "30px Arial", fill: "#F1C40F" });
        this.game.add.text(1385,1870, brigCost, { font: "30px Arial", fill: "#F1C40F" });
        this.game.add.text(1525,1870, clipCost, { font: "30px Arial", fill: "#F1C40F" });
        this.game.add.text(1680,1870, fleetCost, { font: "30px Arial", fill: "#F1C40F" });
        //====== MENU
        
        //to create group for berzerker towers
        berzerkers = this.game.add.group();
        towerRange = this.game.add.group();
        
        //Init first tower objects
        brigBlasterTower = new BrigBlasterTower(this.game);
        clipCatastTower = new ClipCatastTower(this.game);
        fleetSinkerTower = new FleetSinkerTower(this.game);
        
        brigBlasterTower.events.onDragStart.add(function(){dragTower(brigBlasterTower)}, this.game);
        clipCatastTower.events.onDragStart.add(function(){dragTower(clipCatastTower)}, this.game);
        fleetSinkerTower.events.onDragStart.add(function(){dragTower(fleetSinkerTower)}, this.game);
        
        
        //Misc Sprites
        spTree = this.game.add.sprite(1400, 1100, 'tree');
        spTree.scale.x = .6;
        spTree.scale.y = .6;
        
    
        village = this.game.add.sprite(675,1030,'village');
        village.scale.x = .7;
        village.scale.y = .7;
        villager1 = this.game.add.sprite(908, 1024, 'villager');
        villager1.scale.x = 1.6;
        villager1.scale.y = 1.6;
     
         //Self Made Path Variables
        path1 = [{x:200,y:500},{x:1695,y:500},{x:1695,y:840},{x:70,y:840},{x:70,y:1715},{x:2500,y:1715}];
        path2 = [{x:200,y:500},{x:1150,y:500},{x:1150,y:190},{x:1695,y:190},{x:1695,y:840},{x:70,y:840},{x:70,y:1715},{x:2500,y:1715}];
        //Path 3 goes around the first island
        path3 = [{x:200,y:500},{x:510,y:500},{x:510,y:840},{x:1050,y:840},{x:1050,y:1390},{x:70,y:1390},{x:70,y:1715},{x:2500,y:1715}];
        path4 = [{x:200,y:500},{x:1695,y:500},{x:1695,y:840},{x:1050,y:840},{x:1050,y:1390},{x:70,y:1390},{x:70,y:1715},{x:2500,y:1715}];
        level1Path = [path1,path2,path3,path4];
      
        //Initiate Tween
        sendWaveButton.events.onInputDown.add(wave1, this.game);
	
	},
	
	update: function(){
    
        //Check for collision between bullets and enemies
        this.game.physics.arcade.overlap(brigBlasterTower.weapon.bullets, enemies, this.collisionCheck, null, this.game);
        this.game.physics.arcade.overlap(clipCatastTower.bullets, enemies, this.collisionCheck, null, this.game);
        this.game.physics.arcade.overlap(fleetSinkerTower.bullets, enemies, this.collisionCheck, null, this.game);
    },
    
    //Removes enemies killed
    collisionCheck: function(star, enemy){
        console.log("HEALTH " + enemy.health);
        console.log("CURRENT DAMAGE " + star.data.bulletManager.damage);
    
        if(enemy.health > 0){
            
            enemy.health -= star.data.bulletManager.damage;
        }
        else{
            enemy.destroy();
        }    
            star.kill();
    },
	
	
	render: function(){
    
        this.game.debug.body(berzerkers);
    },
	
	
	//Nav Bar Update Functions for Text

    setLevel: function(levelNumberText,levelName){
        level.kill();
        levelName.kill();
        currentLevel = levelNumberText;
        currentLevelName = levelName;
        level = this.game.add.text(20,1800, currentLevel, { font: "40px Arial", fill: "#EBEBEB" })
        levelName = this.game.add.text(20,1850, currentLevelName, { font: "40px Arial", fill: "#7FFFD4" })
    },
    
    setWave: function(waveText){
        wave.kill();
        wave = this.game.add.text(280,1880, waveText, { font: "30px Arial", fill: "#E74C3C" })
    },
    
    setGold: function(goldValue){
        goldMeter.kill();
        goldMeter = this.game.add.text(530,1880, goldValue, { font: "30px Arial", fill: "#F1C40F" })
    },

	
	
	menu: function(){
		this.game.state.start("GameMenu");
	}
	
	
}