var gameMenu = function(game){}
 
gameMenu.prototype = {
  	create: function(){
  	    
  	    var background = this.add.sprite(0, 0, 'stars');
  	    
  	    var gameLogo = this.add.sprite(this.world.centerX-840, 200, 'gameLogo');
        
        var menu = this.add.sprite(this.world.centerX, 650, 'menu');
        menu.anchor.setTo(0.5, 0.5);

		var playButton = this.game.add.button(220, 900, 'play', this.playGame, this);
		playButton.anchor.setTo(0.5,0.5);
		
		var tutorialButton = this.game.add.button(310, 1100, 'tutorial', this.tutorial, this);
		tutorialButton.anchor.setTo(0.5,0.5);
		
		
	},
	
	
	playGame: function(){
		this.game.state.start("LevelOneState");
	},
	
	tutorial: function(){
		this.game.state.start("Tutorial");
	}
}