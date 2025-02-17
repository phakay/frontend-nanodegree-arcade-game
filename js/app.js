// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // To ensure it doesn't continue off the screen, we reset it's x position
    if(this.x > 450){
        this.x = -50;
        // To ensure it starts off with a different velocity after reset
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    // check for collision with player
    this.checkCollisions(player);
};

Enemy.prototype.checkCollisions = function(player){
    // collision detection condition here:
    if(player.x < this.x + 80 && player.x > this.x - 80 && 
        player.y < this.y + 50 && player.y > this.y - 50){
        player.reset();
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    this.initialLoc = {x: x, y: y};
    this.x = this.initialLoc.x;
    this.y = this.initialLoc.y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
    this.mv_sound = 'audio/move.mp3';
    this.audio = new Audio(this.mv_sound);
};

Player.prototype.update = function(dt){
    // No need to implement update on Player, except we include some
    // some animaiton
    // this.x += 0 * dt;
    // this.y += 0 * dt;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress){
    if(typeof keyPress === 'undefined')
        return;
    if(keyPress == 'left' && this.x > 5 ){
        this.x -= 100;    
    }
    else if(keyPress == 'right' && this.x < 400){
        this.x += 100;
    }
    else if(keyPress == 'up' && this.y > -40){
        this.y -= 90;
    }
    else if(keyPress == 'down' && this.y < 410){
        this.y += 90;
    }
    this.playMoveSound();

    if(this.y <= -40){
        setTimeout(this.reset.bind(this), 800);
    }
};

Player.prototype.reset = function(){
    this.x = this.initialLoc.x;
    this.y = this.initialLoc.y;
};

Player.prototype.playMoveSound = function(){
    if(!this.audio.paused){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    this.audio.play();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(3);
allEnemies[0] = new Enemy(100, 60, 150);
allEnemies[1] = new Enemy(100, 230, 200);
allEnemies[2] = new Enemy(5, 310, 150);

var player = new Player(200, 410, 5);



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
