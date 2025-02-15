var Shop = function(game){};

Shop.prototype = {
    create: function(){
        this.game.add.image(0, 0, "background");
    
        // Add shop window sprite
        this.shopWindow = this.game.add.sprite(
            this.game.world.centerX, 
            this.game.world.centerY - 25, 
            "shopWindow"
        );
        this.shopWindow.anchor.setTo(0.5, 0.5); // Center the image
        this.shopWindow.scale.setTo(0.2, 0.2);   
    
        this.coinBar = this.game.add.sprite(
            this.shopWindow.x + this.shopWindow.width / 2 - 10, // Adjust for proper alignment
            this.shopWindow.y - this.shopWindow.height / 2 + 150, // Place it at the top
            "coinsIcon"
        );
        this.coinBar.anchor.setTo(1, 0); // Align to top-right
        this.coinBar.scale.setTo(0.15, 0.15); // Adjust the size if needed
        

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
        this.item1 = this.createShopItem("Out of Town", 20000, this.game.world.centerX - 275, this.shopWindow.y + 70);
        this.item1 = this.createShopItem("Burger King", 5000, this.game.world.centerX - 95, this.shopWindow.y + 70);
        this.item1 = this.createShopItem("Dinner Date", 5000, this.game.world.centerX + 95, this.shopWindow.y + 70);
        this.item1 = this.createShopItem("Chocolate", 2000, this.game.world.centerX + 275, this.shopWindow.y + 70);

        this.item1 = this.createShopItem("Grocery Shopping", 7000, this.game.world.centerX - 280, this.shopWindow.y + 280);
        this.item1 = this.createShopItem("Massage", 3000, this.game.world.centerX - 95, this.shopWindow.y + 280);
        this.item1 = this.createShopItem("One with Nature", 15000, this.game.world.centerX + 95, this.shopWindow.y + 280);
        this.item1 = this.createShopItem("Anything you want", 45000, this.game.world.centerX + 280, this.shopWindow.y + 280);

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
            { font: "23px Arial", fill: "#000" }
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
            this.purchaseItem(name, price);
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
    
    purchaseItem: function(name, price) {
        // Ensure coins is retrieved as a number
        this.coins = parseInt(window.localStorage.getItem("Coins")) || 0;
    
        if (this.coins < price) {
            console.log("Not enough coins!");
            return;
        }
    
        this.coins -= price; // Deduct price
    
        // Save back to localStorage
        window.localStorage.setItem("Coins", this.coins.toString()); 
    
        // Update coin display
        this.coinText.setText(this.coins.toLocaleString());
    
        // Handle item purchase
        var purchases = JSON.parse(window.localStorage.getItem("PurchasedItems")) || {};
        purchases[name] = (purchases[name] || 0) + 1;
        window.localStorage.setItem("PurchasedItems", JSON.stringify(purchases));
    
        console.log(name + " purchased! Remaining coins: " + this.coins);
        this.closeConfirmation(); // Close confirmation window
    }
    ,
    
    closeConfirmation: function() {
        this.confirmWindow.destroy();
        this.confirmText.destroy();
        this.yesButton.destroy();
        this.noButton.destroy();
    },
    
    showNotEnoughCoins: function() {
        // Create a semi-transparent background
        var bg = this.game.add.graphics(0, 0);
        bg.beginFill(0x000000, 0.8); // Black with 50% opacity
        bg.drawRect(
            this.game.world.centerX - 250, 
            this.game.world.centerY - 40, 
            500, 
            70
        );
        bg.endFill();
    
        // Add the "Not enough coins!" text
        var msg = this.game.add.text(
            this.game.world.centerX, this.game.world.centerY,
            "Not enough coins!",
            { font: "50px Arial", fill: "#ff0000", align: "center" }
        );
        msg.anchor.setTo(0.5, 0.5);
    
        // Group them together
        var group = this.game.add.group();
        group.add(bg);
        group.add(msg);
    
        // Destroy after 1.5 seconds
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
            group.destroy();
        }, this);
    },
    
    
    

    goBack: function(){
        this.game.state.start("MainMenu");
    }
};
