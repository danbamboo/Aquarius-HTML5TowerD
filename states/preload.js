var preload = function(game){}

preload.prototype = {
	preload: function(){ 
	    var background = this.add.sprite(0, 0, 'stars');
        
        var gameLogo = this.add.sprite(this.world.centerX-840, 600, 'gameLogo');
        
        var bar = this.add.sprite(this.world.centerX-600, 1000,"bar");
        this.load.setPreloadSprite(bar);
    
        var status = this.add.text(this.world.centerX, 1200, 'Loading...', {font: "52px Arial", fill: 'white'});
        
        this.game.load.image("play","play.png");
        this.game.load.image("tutorial","tutorial.png");
        this.game.load.image("menu","menu.png");
        this.game.load.image("back","back.png");
        
		 //load map
        this.game.load.tilemap('pirateMapOcean', 'pirateMapProto4-2.json', null, Phaser.Tilemap.TILED_JSON);
        
        //Load Images
        this.game.load.image('tiles', 'tiles_sheet.png');
        this.game.load.image('sendNextWaveButtn', 'SendWaveRed.png');
        this.game.load.image('tree', 'Tree_1.png');
        this.game.load.image('shipsMisc3', '2nd_ship_new_3.png');
        this.game.load.atlasXML('shipsMisc1','shipsMiscellaneous_sheet.png','shipsMiscellaneous_sheet.xml');
        this.game.load.atlasXML('shipsMisc2','shipsMiscellaneous_sheet@2.png','shipsMiscellaneous_sheet@2.xml');
        this.game.load.image('villager', 'spr_m_unko.png'); 
        this.game.load.atlasXML('spaceItems', 'spaceItems.png', 'spaceItems.xml');
        this.game.load.image('navbar','gameNavBarLogo.png');
        this.game.load.image('village','village.png');
        this.game.load.image('scroll','scroll.png');

		
		//this.game.load.image("gameover","assets/gameover.png");
	},
  	create: function(){
		this.game.state.start("GameMenu");
	}
}