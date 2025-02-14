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
	
		// Add the background window
		this.backgroundWindow = this.game.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY - 50,
			'scoreWindow' // Make sure to preload this image
		);
		this.backgroundWindow.anchor.setTo(0.5, 0.5);
		this.backgroundWindow.scale.setTo(0.1, 0.1);
		
		// Add text inside the background window
		this.scoreLabel = this.game.add.text(
			0, -300,  // Position inside the background
			"Your score is " + score,
			{ font: scoreFont, fill: "#fff" }
		);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		
		this.highScore = this.game.add.text(
			0, 300,  // Position inside the background
			"High score: 0",
			{ font: scoreFont, fill: "#fff" }
		);
		this.highScore.anchor.setTo(0.5, 0.5);
	
		// Add text to the background as children
		this.backgroundWindow.addChild(this.scoreLabel);
		this.backgroundWindow.addChild(this.highScore);
	
		// Handle high score logic
		this.hs = window.localStorage.getItem('HighScore');
	
		if (this.hs == null || parseInt(this.hs) < score) {
			window.localStorage.setItem('HighScore', score);
			this.highScore.setText("High score: " + score);
		} else {
			this.highScore.setText("High score: " + this.hs);
		}
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
