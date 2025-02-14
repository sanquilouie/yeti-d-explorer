var GameOver = function (game) {};

GameOver.prototype = {
    create: function () {
        this.game.stage.backgroundColor = '479cde';

        this.quit = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.resume = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.showScore();
        this.createButtons();
    },

    update: function () {
        if (this.resume.isDown) {
            this.restartGame();
        }
    },

    showScore: function () {
		var scoreFont = "400px Arial";
	
		// Add background window
		this.backgroundWindow = this.game.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY - 50,
			'scoreWindow'
		);
		this.backgroundWindow.anchor.setTo(0.5, 0.5);
		this.backgroundWindow.scale.setTo(0.1, 0.1);
	
		// Add text inside the background window
		this.scoreLabel = this.game.add.text(
			0, -300,
			"You earned " + score + " coins!",
			{ font: scoreFont, fill: "#fff" }
		);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
	
		this.coinLabel = this.game.add.text(
			0, 300,
			"Total Coins: 0",
			{ font: scoreFont, fill: "#fff" }
		);
		this.coinLabel.anchor.setTo(0.5, 0.5);
	
		this.backgroundWindow.addChild(this.scoreLabel);
		this.backgroundWindow.addChild(this.coinLabel);
	
		// 🔹 Load existing coins (if any) 🔹
		this.coins = parseInt(window.localStorage.getItem('Coins')) || 0;
	
		// 🔹 Add new coins earned 🔹
		this.coins += score;
		score = 0;
	
		// 🔹 Save new total 🔹
		window.localStorage.setItem('Coins', this.coins);
	
		// 🔹 Update coin display 🔹
		this.coinLabel.setText("Total Coins: " + this.coins);
	},

    createButtons: function () {
		var spacing = 300;

        // Retry Button with Hover Effect
		var retryButton = this.game.add.button(
			this.game.world.centerX - spacing / 2,
			this.game.world.centerY * 1.5,
			'retryIcon',
			this.restartGame,
			this,
			1, 0, 2
		);
		retryButton.anchor.setTo(0.5, 0.5);
		retryButton.scale.setTo(0.1, 0.1);

	// Hover Effect
	retryButton.events.onInputOver.add(function() {
		retryButton.scale.setTo(0.12, 0.12); // Increase size when hovered
	}, this);
	retryButton.events.onInputOut.add(function() {
		retryButton.scale.setTo(0.1, 0.1); // Revert when not hovered
	}, this);

	// Shop Button with Hover Effect
	var shopButton = this.game.add.button(
		this.game.world.centerX + spacing / 2,
		this.game.world.centerY * 1.5,
		'shopIcon', 
		this.openShop,
		this,
		1, 0, 2
	);
	shopButton.anchor.setTo(0.5, 0.5);
	shopButton.scale.setTo(0.1, 0.1);

	// Hover Effect
	shopButton.events.onInputOver.add(function() {
		shopButton.scale.setTo(0.12, 0.12); // Increase size when hovered
	}, this);
	shopButton.events.onInputOut.add(function() {
		shopButton.scale.setTo(0.1, 0.1); // Revert when not hovered
	}, this);

    },

    restartGame: function () {
        this.game.state.start("Main");
    },

    openShop: function () {
		console.log("Shop button clicked! Opening the Shop...");
		this.game.state.start("Shop"); // Switch to Shop state
	}
	
};
