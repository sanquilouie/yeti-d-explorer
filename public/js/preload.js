var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		this.game.load.audio("jumpSound", "assets/jump.mp3");

		this.game.load.image("gameLogo", "assets/yetilogo.png"); 
    	this.game.load.image("playIcon", "assets/playbtn.png");
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('box', 'assets/box.png');
		this.game.load.image("background", "assets/background.png");

		this.load.image('retryIcon', 'assets/restart.png');
		this.load.image('shopIcon', 'assets/shop.png');
		this.load.image('backIcon', 'assets/back.png');
		this.load.image('scoreWindow', 'assets/gameover.png');
		this.load.image('shopWindow', 'assets/shopitemlist.png');
		this.load.image('coinsIcon', 'assets/coinsbar.png');
		this.load.image('buyingWindow', 'assets/buyingWindow.png');
		this.load.image('noIcon', 'assets/noButton.png');
		this.load.image('yesIcon', 'assets/yesButton.png');
		this.load.image('bagIcon', 'assets/inventory.png');
		this.load.image('inventoryWindow', 'assets/inventoryWindow.png');
		this.load.image('closeIcon', 'assets/closeIcon.png');
		

		
		this.load.atlas('player', 'assets/player.png', 'assets/player.json'); // the player walk
		

	},

	create: function(){
		this.game.state.start("MainMenu");
	}
}