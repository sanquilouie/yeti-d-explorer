var MainMenu = function(game){};

MainMenu.prototype = {
    create: function() {
        // Add background color (optional)
        this.game.add.image(0, 0, "background");

        // Add logo in the center
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, "gameLogo");
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.5, 0.5); // Adjust size if needed

        this.bag = this.game.add.sprite(this.game.world.width - 100, 100, "bagIcon");
        this.bag.anchor.setTo(0.5, 0.5);
        this.bag.scale.setTo(0.07, 0.07); // Adjust size if needed

        // Enable input for the bag sprite
        this.bag.inputEnabled = true;

        // Add hover effect
        this.bag.events.onInputOver.add(function() {
            this.bag.scale.setTo(0.09, 0.09); // Increase size when hovered
        }, this);

        this.bag.events.onInputOut.add(function() {
            this.bag.scale.setTo(0.07, 0.07); // Revert when not hovered
        }, this);

        this.bag.events.onInputDown.add(function() {
            this.game.state.start("Inventory"); // Change to Inventory state
        }, this);


        // Add play button below the logo
        this.playButton = this.game.add.button(
            this.game.world.centerX + 15, 
            this.game.world.centerY + 225, 
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
