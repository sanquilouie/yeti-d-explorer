var Inventory = function(game){};

Inventory.prototype = {
    create: function() {
        // Add background overlay (optional)
        this.game.add.image(0, 0, "background");

        // Add inventory window sprite
        this.window = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "inventoryWindow");
        this.window.anchor.setTo(0.5, 0.5);
        this.window.scale.setTo(0.3, 0.3);

        // Add close button
        this.closeButton = this.game.add.sprite(this.window.x + 500, 100, "closeIcon");
        this.closeButton.anchor.setTo(0.5, 0.5);
        this.closeButton.scale.setTo(0.3, 0.3);
        this.closeButton.inputEnabled = true;

        // Hover effect for close button
        this.closeButton.events.onInputOver.add(() => this.closeButton.scale.setTo(0.4, 0.4));
        this.closeButton.events.onInputOut.add(() => this.closeButton.scale.setTo(0.3, 0.3));
        
        // Close inventory
        this.closeButton.events.onInputDown.add(() => {
            this.game.state.start("MainMenu");
        });

        // Display Purchased Items
        this.displayPurchasedItems();
    },

    displayPurchasedItems: function() {
        // Define all possible inventory items with default value 0
        let allItems = {
            "Grocery Shopping": 0,  
            "Burger King": 0,
            "Dinner Date": 0,
            "One with Nature": 0,
            "Chocolate": 0,
            "Massage": 0,
            "Out of Town": 0,
            "Anything you want": 0
        };
    
        // Retrieve PurchasedItems from localStorage
        let storedItems = localStorage.getItem("PurchasedItems");
        let purchasedItems = {};
    
        try {
            purchasedItems = storedItems ? JSON.parse(storedItems) : {};
            if (typeof purchasedItems !== "object" || purchasedItems === null) {
                purchasedItems = {};
            }
        } catch (error) {
            console.error("Error parsing PurchasedItems:", error);
            purchasedItems = {};
        }
    
        // Merge stored data with default items (ensuring all items exist)
        Object.keys(allItems).forEach(item => {
            if (purchasedItems[item] !== undefined) {
                allItems[item] = purchasedItems[item]; // Use stored value if available
            }
        });
    
        // Convert to array for iteration
        let itemsArray = Object.entries(allItems); // [["Burger King", 3], ["Dinner Date", 2], ...]
    
        // Predefined positions for the 8 slots
        let itemPositions = [
            { x: this.window.x - 215, y: this.window.y - 105 },
            { x: this.window.x + 55, y: this.window.y - 105 },
            { x: this.window.x + 325, y: this.window.y - 105 },
            { x: this.window.x - 215, y: this.window.y + 60 },
            { x: this.window.x + 55, y: this.window.y + 60 },
            { x: this.window.x + 325, y: this.window.y + 60 },
            { x: this.window.x - 120, y: this.window.y + 220 },
            { x: this.window.x + 170, y: this.window.y + 220 }
        ];
    
        // Loop through all items and display them
        itemsArray.forEach(([itemName, quantity], index) => {
            let { x, y } = itemPositions[index];
    
            // Display quantity text below the item
            let quantityText = this.game.add.text(x, y + 40, `x${quantity}`, {
                font: "30px Arial",
                fill: "#00000",
                align: "center"
            });
            quantityText.anchor.setTo(0.5, 0.5);
        });
    }
    
    
    
};
