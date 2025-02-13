var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('box', 'assets/box.png');
		
		this.load.atlas('player', 'assets/player2.png', 'assets/player2.json');
		

	},

	create: function(){
		this.game.state.start("Main");
	}
}