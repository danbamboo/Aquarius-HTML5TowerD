var tutorial = function(game){}
 
tutorial.prototype = {
  	create: function(){
  	    
  	    var background = this.add.sprite(0, 0, 'stars');
  	    
  	    var gameLogo = this.add.sprite(this.world.centerX-840, 200, 'gameLogo');
        //gameLogo.anchor.setTo(0.5, 0.5);
		
		var text = this.add.text(this.world.centerX-240, 700, 'Tutorial Page', {font: "80px Arial", fill: 'white'});
		
		var backButton = this.game.add.button(310, 1800, 'back', this.menu, this);
		backButton.anchor.setTo(0.5,0.5);
		
		
	},
	
	
	menu: function(){
		this.game.state.start("GameMenu");
	}
	
	
}