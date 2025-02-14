var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('box', 'assets/box.png');
		this.load.image('retryIcon', 'assets/restart.png');
		this.load.image('shopIcon', 'assets/shop.png');
		this.load.image('scoreWindow', 'assets/gameover.png');

		
		this.load.atlas('player', 'assets/player.png', 'assets/player.json'); // the player walk
		

	},

	create: function(){
		this.game.state.start("Main");
	}
}