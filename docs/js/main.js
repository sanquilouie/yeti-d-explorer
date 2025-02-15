var Main = function(game){

};

var score = 0;
var tileWidth = 64;
var tileHeight = 64; 

var floor;
Main.prototype = {

	create: function() {

		this.tileVelocity = -450;
		this.rate = 1500;
		score = 0;
		
		
		this.tileWidth = this.game.cache.getImage('tile').width;
		this.tileHeight = this.game.cache.getImage('tile').height;
		this.boxHeight = this.game.cache.getImage('box').height;

		this.game.stage.backgroundColor = '479cde';

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.createBackground();

		this.floor = this.game.add.group();
		this.floor.enableBody = true;

		for (let i = 0; i < Math.ceil(this.game.world.width / tileWidth); i++) {
			let tile = this.floor.create(i * tileWidth, this.game.world.height - tileHeight, 'tile');
			tile.body.immovable = true;
			tile.x = this.game.world.width + i * tileWidth;
		}

		this.game.time.events.loop(Phaser.Timer.SECOND / 60, this.updateFloor, this);

		//Ground Obstacle
		this.boxes = this.game.add.group();
		this.boxes.enableBody = true;
		this.boxes.createMultiple(20, 'box');
		this.game.world.bringToTop(this.floor);

		//Flying Obstacle
		this.flyingObstacles = this.game.add.group();
		this.flyingObstacles.enableBody = true;
		this.flyingObstacles.createMultiple(20, 'flying_ginger'); 


		this.jumping = false;

		this.addBase();
		this.createScore();
		this.createPlayer();
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.timer = game.time.events.loop(this.rate, this.addObstacles, this);
		this.Scoretimer = game.time.events.loop(100, this.incrementScore, this);

		this.jumpSfx = this.game.add.audio("jumpSound");
		this.hitSfx = this.game.add.audio("hitSound");

	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.floor);
		this.game.physics.arcade.collide(this.player, this.boxes, this.gameOver, null, this);
		this.game.physics.arcade.collide(this.player, this.flyingObstacles, this.gameOver, null, this);
	
		var onTheGround = this.player.body.touching.down;
	
		if (onTheGround) {
			this.jumps = 2;
			this.jumping = false;
			this.player.animations.play('run', 25, true);
		}
	
		if (this.jumps > 0 && this.upInputIsActive(5)) {
			this.player.body.velocity.y = -1000;
			this.jumping = true;
			this.player.animations.play('jump', 10, true);
			this.jumpSfx.play();
		}
	
		if (!onTheGround && this.player.body.velocity.y > 0) {
			if (this.player.animations.currentAnim.name !== 'fall') {
				this.player.animations.play('fall');
			}
		}
	
		if (this.jumping && this.upInputReleased()) {
			this.jumps--;
			this.jumping = false;
		}
	
		// Move the clouds
		this.clouds.forEachAlive(function(cloud) {
			cloud.x += this.tileVelocity * this.game.time.physicsElapsed;
			if (cloud.x < -100) {
				cloud.x = this.game.world.width + Math.random() * 100;
				cloud.y = Math.random() * 150;
			}
		}, this);
	
	
		// Move the trees
		this.trees.forEachAlive(function(tree) {
			tree.x += this.tileVelocity * this.game.time.physicsElapsed;
			if (tree.x < -200) {
				tree.x = this.game.world.width + Math.random() * 100;
			}
		}, this);

		this.updateFloor();	
	},
	
	// Define updateFloor outside the update function
	updateFloor: function() {
		this.floor.forEachAlive(function(tile) {
			tile.x -= 2;  // Move the tile to the left
			if (tile.x + tileWidth < 0) {
				// Reposition the tile to the right side when it goes off-screen
				tile.x = this.game.world.width;
			}
		}, this);
	},

	
	addBox: function (x, y) {

		var tile = this.boxes.getFirstDead();

		tile.reset(x, y);
		tile.body.velocity.x = this.tileVelocity;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addFlyingObstacle: function (x, y) {
		// Check if there is already an active flying obstacle on the screen
		if (this.flyingObstacles.countLiving() > 0) return; // Exit if one already exists
	
		var obstacle = this.flyingObstacles.getFirstDead();
		
		if (!obstacle) return; // If no available obstacle, exit
	
		obstacle.reset(x, y);  // Spawn off-screen to the right
		obstacle.body.velocity.x = -Math.abs(this.tileVelocity) * 2; // Move leftward
		obstacle.body.immovable = true;
		obstacle.checkWorldBounds = true;
		obstacle.outOfBoundsKill = true;
	
		// Define the frames for animation
		var flyFrames = ['ginger_0', 'ginger_1', 'ginger_2', 'ginger_3', 'ginger_4', 'ginger_5', 'ginger_6', 'ginger_7', 'ginger_8', 'ginger_9'];
		obstacle.animations.add('flying_ginger', flyFrames, 10, true);
		obstacle.animations.play('flying_ginger'); // Play animation
	
		obstacle.scale.setTo(2, 2); // Doubles the size
	},
	
	
	

	addObstacles: function () {
		var tilesNeeded = Math.floor(Math.random() * 5);
		
		// Reduce tileVelocity over time
		if (this.rate > 200) {
			this.rate -= 10;
			this.tileVelocity = -(675000 / this.rate);
		}
	
		// Randomly decide whether to spawn a ground or flying obstacle
		if (Math.random() < 0.5) {  
			// Ground obstacle (existing logic)
			for (var i = 0; i < tilesNeeded; i++) {
				this.addBox(this.game.world.width, this.game.world.height - this.tileHeight - ((i + 1) * this.boxHeight));
			}
		} else {  
			// Flying obstacle
			this.addFlyingObstacle(this.game.world.width, this.game.world.height - 250); // Adjust Y position as needed
		}
	},
	

	addTile: function (x, y) {
		var tile = this.floor.getFirstDead();
	
		if (!tile) {
			// If no dead tile is found, create a new one
			tile = this.floor.create(x, y, 'tile');
		} else {
			// Reset the existing tile's position
			tile.reset(x, y);
		}
	
		// Set additional properties for the tile
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},
	

	addBase: function () {
		var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
		var y = (this.game.world.height - this.tileHeight);

		for (var i = 0; i < tilesNeeded; i++) {

			this.addTile(i * this.tileWidth, y);

		}
	},

	upInputIsActive: function (duration) {
		var isActive = false;

		isActive = this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);
		isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
			this.game.input.activePointer.x > this.game.width / 4 &&
			this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

		return isActive;
	},

	slideInputIsActive() {
		return this.input.keyboard.RIGHT; // Adjust based on your input setup
	},

	// This function returns true when the player releases the "jump" control
	upInputReleased: function () {
		var released = false;

		released = this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);
		released |= this.game.input.activePointer.justReleased();

		return released;
	},

	createPlayer: function () {
		this.player = this.game.add.sprite(
			this.game.world.width / 5,
			this.game.world.height - (this.tileHeight * 2),
			'player' // This should match the texture atlas key
		);
	
		this.player.scale.setTo(0.25, 0.25);
		this.player.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2200;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.1;
		this.player.body.drag.x = 150;
	
		// 🛠 Fix: Manually define the animation frames using correct frame names
		var runFrames = ['run_0', 'run_1', 'run_2', 'run_3', 'run_4', 'run_5', 'run_6', 'run_7'];
		this.player.animations.add('run', runFrames, 10, true);

		var jumpFrames = ['jump_0', 'jump_1', 'jump_2', 'jump_3', 'jump_4', 'jump_5', 'jump_6', 'jump_7'];
		this.player.animations.add('jump', jumpFrames, 10, true);

		var fallFrames = ['fall_0', 'fall_1', 'fall_2', 'fall_3', 'fall_4', 'fall_5', 'fall_6', 'fall_7'];
		this.player.animations.add('fall', fallFrames, 15, true);
		
		var deadFrames = ['dead_0', 'dead_1', 'dead_2', 'dead_3', 'dead_4', 'dead_5', 'dead_6', 'dead_7', 'dead_8', 'dead_9'];
		this.player.animations.add('dead', deadFrames, 15, true);
		
		var slideFrames = ['slide_0', 'slide_1', 'slide_2', 'slide_3', 'slide_4', 'slide_5', 'slide_6', 'slide_7', 'slide_8', 'slide_9'];
		this.player.animations.add('slide', slideFrames, 15, true);
	},

	createScore: function () {
		var scoreFont = "30px Arial";
	
		// 🔹 Display Current Score (for coins earned in this session)
		/**this.scoreLabel = this.game.add.text(
			this.game.world.centerX, 70, 
			"0", 
			{ font: scoreFont, fill: "#fff" }
		);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);**/
	
		// 🔹 Create Coin Icon
		this.coinIcon = this.game.add.sprite(
			this.game.world.centerX * 1.6, 60, 
			"coinsIcon" // Replace with actual sprite key
		);
		this.coinIcon.anchor.setTo(0.5, 0.5);
		this.coinIcon.scale.setTo(0.15); // Adjust size as needed
	
		// 🔹 Display Total Coins (inside the sprite)
		this.coinLabel = this.game.add.text(
			this.coinIcon.x, this.coinIcon.y - 20, 
			"0", 
			{ font: scoreFont, fill: "#fff" }
		);
		this.coinLabel.anchor.setTo(0.5, 0); // Center it below the icon
	
		// 🔹 Load Coins from Local Storage
		if (window.localStorage.getItem('Coins') == null) {
			window.localStorage.setItem('Coins', 0);
		}
	
		this.coins = parseInt(window.localStorage.getItem('Coins'));
		this.coinLabel.setText(this.coins); // Update text inside the sprite
	
		// Ensure both are on top
		this.game.world.bringToTop(this.coinIcon);
		this.game.world.bringToTop(this.coinLabel);
	},
	
	
	createBackground: function () {
		// Cloud sprites array
		var cloudSprites = ['cloud_1', 'cloud_2', 'cloud_3', 'cloud_4', 'cloud_5'];
	
		// Create cloud group
		this.clouds = this.game.add.group();
		for (var i = 0; i < 3; i++) { // Generate 5 clouds
			var randomCloud = cloudSprites[Math.floor(Math.random() * 5)]; // Pick a different cloud sprite
			var cloud = this.clouds.create(
				Math.random() * this.game.world.width,  // Random X position
				Math.random() * 400,  // Random Y position near the top
				randomCloud
			);
			cloud.alpha = 0.9; // Make it slightly transparent
			cloud.scale.setTo(0.3 + Math.random() * 0.3); // Random size
			
			// Enable physics for the cloud
			this.game.physics.arcade.enable(cloud);
			cloud.body.velocity.x = -50; // Slow movement to the left
			cloud.body.immovable = true; // Ensure it doesn't collide with anything
		}
	
		
	
		this.trees = this.game.add.group();
		var treeSprites = ['tree_1', 'tree_2', 'tree_3'];
		var sectionWidth = this.game.world.width / 3; // Divide screen into 3 sections

		for (var i = 0; i < 2; i++) { 
			var randomTree = treeSprites[Math.floor(Math.random() * 3)]; // Pick a different tree sprite
			
			var minX = sectionWidth * i;  // Start of the section
			var maxX = sectionWidth * (i + 1); // End of the section
			var randomX = Math.random() * (maxX - minX) + minX; // Random X within section

			var tree = this.trees.create(
				randomX, // Randomized horizontal position in its section
				this.game.world.height - this.tileHeight - 350, // Near the ground
				randomTree
			);
			tree.scale.setTo(0.8, 0.8);
		}
	},
	
	
	incrementScore: function () {
		score += 1;
		//this.scoreLabel.setText(score);
		//this.game.world.bringToTop(this.scoreLabel);
	
		// Update Coins
		this.coins += 1;
		window.localStorage.setItem('Coins', this.coins);
		this.coinLabel.setText(this.coins);
		this.game.world.bringToTop(this.coinLabel);
	},
	
	/**render: function() {
		this.game.debug.body(this.player); // Draws a debug outline around the player
		this.game.debug.bodyInfo(this.player, 32, 32); // Optional: Display physics body info
	},**/
	

	gameOver: function(){
		this.hitSfx.play();
		this.game.state.start('GameOver');
	}
};
