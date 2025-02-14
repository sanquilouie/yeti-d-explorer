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
        var scoreFont = "60px Arial";

        this.scoreLabel = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY / 2,
            "Your score is " + score,
            { font: scoreFont, fill: "#fff" }
        );
        this.scoreLabel.anchor.setTo(0.5, 0.5);

        this.highScore = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY,
            "High score: 0",
            { font: scoreFont, fill: "#fff" }
        );
        this.highScore.anchor.setTo(0.5, 0.5);

        this.hs = window.localStorage.getItem('HighScore');

        if (this.hs == null || parseInt(this.hs) < score) {
            window.localStorage.setItem('HighScore', score);
            this.highScore.setText("High score: " + score);
        } else {
            this.highScore.setText("High score: " + this.hs);
        }
    },

    createButtons: function () {
        // Load cartoonish icons before using them
        var retryButton = this.game.add.button(
            this.game.world.centerX - 100,
            this.game.world.centerY * 1.5,
            'retryIcon',  // Replace with your cartoonish retry icon
            this.restartGame,
            this,
            1, 0, 2
        );
        retryButton.anchor.setTo(0.5, 0.5);
        
        var shopButton = this.game.add.button(
            this.game.world.centerX + 100,
            this.game.world.centerY * 1.5,
            'shopIcon',  // Replace with your cartoonish shop icon
            this.openShop,
            this,
            1, 0, 2
        );
        shopButton.anchor.setTo(0.5, 0.5);
    },

    restartGame: function () {
        this.game.state.start("Main");
    },

    openShop: function () {
        console.log("Shop button clicked! Open the shop menu here.");
        // Implement shop logic
    }
};
