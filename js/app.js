// Draw the enemy on the screen, required method for game
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    //    this.speed = 2*(20*Math.floor(Math.random() * 200)+100);
    this.speed = 2 * Math.floor((Math.random() * 200) + 100);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var pi = 3.14;
    this.x = this.x + 10 * 1.5 * Math.random();
    if (this.x > 505) {
        this.x = 0;
    }

    if (player.x >= this.x - 20 && player.x <= this.x + 30) {
        if (player.y <= this.y + 30 && player.y >= this.y - 30) {
            var audio = new Audio('Sound_Effect_1.mp3');
            audio.play();
            player.reset();
        }
    }
};
//////////
//Player//
//////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};
//reset player's postion
Player.prototype.reset = function() {
    console.log("New Player");
    player.x = 200;
    player.y = 400;
};
Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x < 400) {
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 85;
    } else if (this.ctlKey === 'down' && this.y < 400) {
        this.y = this.y + 85;
    }
    this.ctlKey = null;

    if (this.y <= 25) {
        var audio = new Audio('Sound_Effect_2.mp3');
        audio.play();
        this.reset();
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var len = allEnemies.length;
for (i = 0; i <= len; i++) {
    var x = 0;
    for (j = 50; j <= 300; j += 75) {
        var y = j;
        console.log(y);
        allEnemies.push(new Enemy(x, y));
    }
}
var player = new Player();

Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
//Sound Effect
var SoundEffect1 = function() {
    var audio = new Audio('Sound_Effect_1.mp3');
};
var SoundEffect2 = function() {
    var audio = new Audio('Sound_Effect_2.mp3');
};