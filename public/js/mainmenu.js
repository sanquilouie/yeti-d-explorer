var MainMenu = function(game){};

MainMenu.prototype = {
    create: function() {
        // Add background color (optional)
        this.game.add.image(0, 0, "background");

        // Add logo in the center
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, "gameLogo");
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.7, 0.7); // Adjust size if needed

        // Add play button below the logo
        this.playButton = this.game.add.button(
            this.game.world.centerX + 25, 
            this.game.world.centerY + 300, 
            "playIcon", 
            this.startGame, 
            this
        );
        this.playButton.anchor.setTo(0.5, 0.5);
        this.playButton.scale.setTo(0.1, 0.1); // Adjust size

        
        this.playButton.events.onInputOver.add(function() {
            this.playButton.scale.setTo(0.12, 0.12); // Increase size when hovered
        }, this);
        this.playButton.events.onInputOut.add(function() {
            this.playButton.scale.setTo(0.1, 0.1); // Revert when not hovered
        }, this);

        // Enable input sound after clicking play
        this.playButton.onInputDown.add(() => {
            if (this.game.sound.context.state === "suspended") {
                this.game.sound.context.resume();
            }
        });
    },

    startGame: function() {
        this.game.state.start("Main"); // Start the game when play is clicked
    }
};
