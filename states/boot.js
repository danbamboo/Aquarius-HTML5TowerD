var boot = function(game){
	console.log("%cStarting Space Pirate TD Game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("bar","bar.png"); 
          this.game.load.image("gameLogo","gameLogo.png");
          this.game.load.image("stars", "stars.jpg");
          
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVertically = true;
    	this.scale.pageAlignHorizontally = true; 
    	this.scale.refresh();
		//this.scale.setScreenSize();
		this.game.state.start("Preload");
	}
}