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
        this.item1 = this.createShopItem("Burger King", 2000, this.game.world.centerX - 118, this.shopWindow.y + 88);
        this.item1 = this.createShopItem("Dinner Date", 3000, this.game.world.centerX + 118, this.shopWindow.y + 88);
        this.item1 = this.createShopItem("Chocolate", 1000, this.game.world.centerX + 345, this.shopWindow.y + 88);

        this.item1 = this.createShopItem("Flowers", 1000, this.game.world.centerX - 345, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("Massage", 2000, this.game.world.centerX - 118, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("One with Nature", 10000, this.game.world.centerX + 118, this.shopWindow.y + 351);
        this.item1 = this.createShopItem("Anything you want", 45000, this.game.world.centerX + 345, this.shopWindow.y + 351);

        this.coinText = this.game.add.text(
            this.coinBar.x - this.coinBar.width / 2 + 25, // Center the text inside the coin bar
            this.coinBar.y + this.coinBar.height / 2 - 5, 
            "200, 000", // Initial text
            { font: "40px Arial", fill: "#ffffff", align: "center" }
        );
        this.coinText.anchor.setTo(0.5, 0.5);
        
    },

    createShopItem: function(name, price, x, y) {
        var item = this.game.add.text(
            x, y, 
            price, 
            { font: "28px Arial", fill: "#000" }
        );
        item.anchor.setTo(0.5, 0.5);
        item.inputEnabled = true;
        // Change color on hover
        item.events.onInputOver.add(function() {
            item.fill = "#ffcc00"; // Yellow when hovered
        }, this);

        // Reset color when not hovered
        item.events.onInputOut.add(function() {
            item.fill = "#000"; // Back to white
        }, this);

        // Click event
        item.events.onInputDown.add(function(){
            console.log(name + " purchased!");
            // Add logic to subtract coins and give the player the item
        }, this);

        return item;
    },

    goBack: function(){
        this.game.state.start("GameOver");
    }
};
