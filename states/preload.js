var preload = function(game){}

preload.prototype = {
	preload: function(){ 
	    var background = this.add.sprite(0, 0, 'stars');
        
        var gameLogo = this.add.sprite(this.world.centerX-840, 600, 'gameLogo');
        
        var bar = this.add.sprite(this.world.centerX-600, 1000,"bar");
        this.load.setPreloadSprite(bar);
    
        var status = this.add.text(this.world.centerX, 1200, 'Loading...', {font: "52px Arial", fill: 'white'});
        
        this.game.load.image("play","assets/play.png");
        this.game.load.image("tutorial","assets/tutorial.png");
        this.game.load.image("menu","assets/menu.png");
        this.game.load.image("back","assets/back.png");
        
		 //load map
        this.game.load.tilemap('pirateMapOcean', 'assets/pirateMapProto4-2.json', null, Phaser.Tilemap.TILED_JSON);
        
        //Load Images
        this.game.load.image('tiles', 'assets/tiles_sheet.png');
        this.game.load.image('sendNextWaveButtn', 'assets/SendWaveRed.png');
        this.game.load.image('tree', 'assets/Tree_1.png');
        this.game.load.image('shipsMisc3', 'assets/2nd_ship_new_3.png');
        this.game.load.atlasXML('shipsMisc1','assets/shipsMiscellaneous_sheet.png','Spritesheets/shipsMiscellaneous_sheet.xml');
        this.game.load.atlasXML('shipsMisc2','assets/shipsMiscellaneous_sheet@2.png','Spritesheets/shipsMiscellaneous_sheet@2.xml');
        this.game.load.image('villager', 'assets/spr_m_unko.png'); 
        this.game.load.atlasXML('spaceItems', 'assets/spaceItems.png', 'Spritesheets/spaceItems.xml');
        this.game.load.image('navbar','assets/gameNavBarLogo.png');
        this.game.load.image('village','assets/village.png');
        this.game.load.image('scroll','assets/scroll.png');
		
		
		
		
		//this.game.load.image("gameover","assets/gameover.png");
	},
  	create: function(){
		this.game.state.start("GameMenu");
	}
}