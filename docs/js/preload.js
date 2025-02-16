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

		this.load.image('tree_1', 'assets/tree_1.png');
		this.load.image('tree_2', 'assets/tree_2.png');
		this.load.image('tree_3', 'assets/tree_3.png');
		this.load.image('cloud_1', 'assets/cloud_1.png');
		this.load.image('cloud_2', 'assets/cloud_1.png');
		this.load.image('cloud_3', 'assets/cloud_3.png');
		this.load.image('cloud_4', 'assets/cloud_4.png');
		this.load.image('cloud_5', 'assets/cloud_5.png');
		

		
		this.load.atlas('player', 'assets/player3.png', 'assets/player3.json'); // the player walk
		this.load.atlas('flying_ginger', 'assets/flying_ginger.png', 'assets/flying_ginger.json'); // the player walk
		

	},

	create: function(){
		this.game.state.start("MainMenu");
	}
}