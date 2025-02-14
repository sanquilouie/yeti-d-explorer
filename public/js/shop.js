var Shop = function(game){};

Shop.prototype = {
    create: function(){
        this.game.stage.backgroundColor = '#222'; // Dark background
    
        // Add shop window sprite
        this.shopWindow = this.game.add.sprite(
            this.game.world.centerX, 
            this.game.world.centerY - 25, 
            "shopWindow"
        );
        this.shopWindow.anchor.setTo(0.5, 0.5); // Center the image
        this.shopWindow.scale.setTo(0.25, 0.25);   
    
        this.coinBar = this.game.add.sprite(
            this.shopWindow.x + this.shopWindow.width / 2 - 150, // Adjust for proper alignment
            this.shopWindow.y - this.shopWindow.height / 2 + 210, // Place it at the top
            "coinsIcon"
        );
        this.coinBar.anchor.setTo(1, 0); // Align to top-right
        this.coinBar.scale.setTo(0.2, 0.2); // Adjust the size if needed
        

        // Back Button (to return to GameOver screen)
        this.backButton = this.game.add.sprite(
            this.game.world.centerX, 
            this.shopWindow.y + this.shopWindow.height / 2 - 50, 
            "backIcon"
        );
        this.backButton.anchor.setTo(0.5, 0.5);
        this.backButton.scale.setTo(0.1, 0.1);
        this.backButton.inputEnabled = true;

        this.backButton.events.onInputOver.add(function() {
            this.backButton.scale.setTo(0.12, 0.12); 
        }, this);
        
        this.backButton.events.onInputOut.add(function() {
            this.backButton.scale.setTo(0.1, 0.1);
        }, this);

        this.backButton.events.onInputDown.add(this.goBack, this);
    
        // Example shop items (positioning them inside the shop window)
        this.item1 = this.createShopItem("Out of Town", 20000, this.game.world.centerX - 345, this.shopWindow.y + 88);
        this.item1 = this.createShopItem("Burger King", 5000, this.game.world.centerX - 118, this.shopWindow.y + 88);
        this.item1 = this.createShopItem("Dinner Date", 7000, this.game.world.centerX + 118, this.shopWindow.y + 88);
        this.item1 = this.createShopItem("Chocolate", 2000, this.game.world.centerX + 345, this.shopWindow.y + 88);

        this.item1 = this.createShopItem("Flowers", 3000, this.game.world.centerX - 345, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("Massage", 5000, this.game.world.centerX - 118, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("One with Nature", 15000, this.game.world.centerX + 118, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("Anything you want", 45000, this.game.world.centerX + 345, this.shopWindow.y + 351);

        this.coins = parseInt(window.localStorage.getItem('Coins')) || 0;
        this.coinText = this.game.add.text(
            this.coinBar.x - this.coinBar.width / 2 + 25, // Center the text inside the coin bar
            this.coinBar.y + this.coinBar.height / 2 - 5, 
            this.coins.toLocaleString(),
            { font: "40px Arial", fill: "#ffffff", align: "center" }
        );
        this.coinText.anchor.setTo(0.5, 0.5);
        
    },

    createShopItem: function(name, price, x, y) {
        var item = this.game.add.text(
            x, y, 
            price.toLocaleString(), 
            { font: "28px Arial", fill: "#000" }
        );
        item.anchor.setTo(0.5, 0.5);
        item.inputEnabled = true;
    
        // Hover effects
        item.events.onInputOver.add(function() { item.fill = "#ffcc00"; }, this);
        item.events.onInputOut.add(function() { item.fill = "#000"; }, this);
    
        // Click event - Show confirmation window
        item.events.onInputDown.add(function() {
            if (this.coins >= price) {
                this.showConfirmation(name, price);
            } else {
                this.showNotEnoughCoins();
            }
        }, this);
    
        return item;
    },
    
    showConfirmation: function(name, price) {
        // Create the confirmation window sprite
        this.confirmWindow = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "buyingWindow");
        this.confirmWindow.anchor.setTo(0.5, 0.5);
        this.confirmWindow.scale.setTo(0.3, 0.3);
    
        // Confirmation text
        this.confirmText = this.game.add.text(
            this.confirmWindow.x, this.confirmWindow.y - 40,
            "Buy " + name + " for " + price.toLocaleString() + " coins?",
            { font: "22px Arial", fill: "#fff", align: "center" }
        );
        this.confirmText.anchor.setTo(0.5, 0.5);
    
        // Yes Button (Confirm Purchase)
        this.yesButton = this.game.add.sprite(this.confirmWindow.x - 150, this.confirmWindow.y + 170, "yesIcon");
        this.yesButton.anchor.setTo(0.5, 0.5);
        this.yesButton.scale.setTo(0.1, 0.1);

        this.yesButton.events.onInputOver.add(function() {
            this.yesButton.scale.setTo(0.12, 0.12); // Increase size when hovered
        }, this);
        this.yesButton.events.onInputOut.add(function() {
            this.yesButton.scale.setTo(0.1, 0.1); // Revert when not hovered
        }, this);

        this.yesButton.inputEnabled = true;
        this.yesButton.events.onInputDown.add(function() {
            this.purchaseItem(price);
        }, this);
    
        // No Button (Cancel)
        this.noButton = this.game.add.sprite(this.confirmWindow.x + 150, this.confirmWindow.y + 170, "noIcon");
        this.noButton.anchor.setTo(0.5, 0.5);
        this.noButton.scale.setTo(0.1, 0.1);

        this.noButton.events.onInputOver.add(function() {
            this.noButton.scale.setTo(0.12, 0.12); // Increase size when hovered
        }, this);
        this.noButton.events.onInputOut.add(function() {
            this.noButton.scale.setTo(0.1, 0.1); // Revert when not hovered
        }, this);

        this.noButton.inputEnabled = true;
        this.noButton.events.onInputDown.add(this.closeConfirmation, this);
    },
    
    purchaseItem: function(price) {
        this.coins -= price; // Deduct price
        window.localStorage.setItem("Coins", this.coins); // Save new balance
        this.coinText.setText(this.coins.toLocaleString()); // Update UI
        this.closeConfirmation(); // Close the window
    },
    
    closeConfirmation: function() {
        this.confirmWindow.destroy();
        this.confirmText.destroy();
        this.yesButton.destroy();
        this.noButton.destroy();
    },
    
    showNotEnoughCoins: function() {
        var msg = this.game.add.text(
            this.game.world.centerX, this.game.world.centerY,
            "Not enough coins!",
            { font: "28px Arial", fill: "#ff0000", align: "center" }
        );
        msg.anchor.setTo(0.5, 0.5);
    
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
            msg.destroy();
        }, this);
    },
    
    

    goBack: function(){
        this.game.state.start("MainMenu");
    }
};
