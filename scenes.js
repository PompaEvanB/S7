
class titleScreen extends Phaser.Scene{
    constructor(){
        super("titleScreen");
    }
    preload(){
        this.load.image("button","button.png");
        this.load.image("bug","bug.png");
    }
    create(){
        let title = this.add.text(100, 50, 'Roly Poly: To the End', { font: '75px "Press Start 2P"' });

        let ground = this.add.rectangle(0,570,1800,80,0x0B7215);

        let snail = this.add.text(600, 490, '🐌', { font: '75px "Press Start 2P"' });

        let fairy = this.add.text(200, 200, '🧚‍♀️', { font: '75px "Press Start 2P"' });

        this.button = this.add.sprite(450,300,"button");
        this.button.alpha = 0;

        this.bug = this.add.sprite(200,390,"bug");
        this.bug.setScale(2);

        this.tweens.add({
            targets: snail,
            x: 300,
            duration: 3000,     
            // ease: 'Power1',
            yoyo: true,
            repeat: -1 // Set repeat to -1 for infinite repetitions             
        });

        this.tweens.add({
            targets: fairy,
            x: 700,
            duration: 3000,     
            ease: 'Power1',
            yoyo: true,
            repeat: -1 // Set repeat to -1 for infinite repetitions             
        });

        this.tweens.add({
            targets: fairy,
            y: 400,
            duration: 2600,     
            ease: 'Power1',
            yoyo: true,
            repeat: -1 // Set repeat to -1 for infinite repetitions             
        });

        this.tweens.add({
            targets: this.button,
            alpha: 1,
            duration: 3700,     
            // ease: 'Power1',
            yoyo: true,
            repeat: -1 // Set repeat to -1 for infinite repetitions             
        });

        this.tweens.add({
            targets: this.bug,
            y: 250,
            duration: 1000,
            ease: 'cubic',
            yoyo: true,
            repeat: -1
        });

        this.input.on('pointerdown', () => {this.scene.start('victory')});
    }
}

class victory extends Phaser.Scene{
    constructor(){
        super("victory");
    }
    preload(){
        this.load.image("bug","bug.png");
    }
    create(){
        let ground = this.add.rectangle(0,570,1800,80,0x0B7215);

        let trophy = this.add.text(470, 490, '🏆', { font: '75px "Press Start 2P"' });

        let header = this.add.text(300, 50, 'VICTORY', { font: '75px "Press Start 2P"' });
        header.alpha = 0;

        this.bug = this.add.sprite(200,390,"bug");
        this.bug.setScale(2);

        let confetti = this.add.text(200, 200, '🎊', { font: '75px "Press Start 2P"' });
        confetti.alpha = 0;
        let confetti2 = this.add.text(100, 320, '🎊', { font: '75px "Press Start 2P"' });
        confetti2.alpha = 0;
        let confetti3 = this.add.text(600, 400, '🎊', { font: '75px "Press Start 2P"' });
        confetti3.alpha = 0;

        this.tweens.add({
            targets: this.bug,
            x: 600,
            duration: 1000,
            delay: 1000,
        });

        this.tweens.add({
            targets: trophy,
            y: 450,
            duration: 1000,
            delay: 2500,
        });

        this.tweens.add({
            targets: header,
            alpha: 1,
            duration: 1000,
            delay: 4000,
        });

        this.tweens.add({
            targets: confetti,
            alpha: 1,
            duration: 1200,
            delay: 5500,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: confetti2,
            alpha: 1,
            duration: 9000,
            delay: 5700,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: confetti3,
            alpha: 1,
            duration: 600,
            delay: 5900,
            yoyo: true,
            repeat: -1
        });



        this.input.on('pointerdown', () => {this.scene.start('titleScreen')});
    }
    
}

class gameplay extends Phaser.Scene{

    constructor(){
        super("gameplay");
    }
    preload(){
        this.load.image("player","bug.png");
        this.load.image("enemy","SnailEmoji.png");
        this.load.image("enemy2","SnailEmoji.png");
        this.load.image("trophy","trophy.png");
    }
    create() {
      
        // Add the player sprite and enable physics
        this.player = this.physics.add.sprite(100, 600, 'player');
        this.player.setCollideWorldBounds(true); // Ensure the player stays within the game bounds
        this.player.setSize(40, 15);
        this.player.setOffset(5, 37);

        this.enemy = this.physics.add.sprite(600, 600, 'enemy');
        this.enemy.setCollideWorldBounds(true); // Ensure the player stays within the game bounds
        this.enemy.setScale(0.07);
        this.enemy.setSize(500, 550);
        this.enemy.setOffset(400, 510);

        this.enemy2 = this.physics.add.sprite(800, 600, 'enemy2');
        this.enemy2.setCollideWorldBounds(true); // Ensure the player stays within the game bounds
        this.enemy2.setScale(0.07);
        this.enemy2.setSize(500, 550);
        this.enemy2.setOffset(400, 510);

        this.trophy = this.physics.add.sprite(870, 600, 'trophy');
        this.trophy.setScale(0.008);
        this.trophy.setCollideWorldBounds(true);

        // Add cursor keys for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.enemy, die, null, this);
        this.physics.add.collider(this.player, this.enemy2, die, null, this);
        this.physics.add.collider(this.player, this.trophy, win, null, this);

        function die(){
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.restart());
            this.enemy.setVelocityX(0);
            this.enemy2.setVelocityX(0);
            this.player.alpha = 0;
        }

        function win(){
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.restart());
            this.enemy.setVelocityX(0);
            this.enemy2.setVelocityX(0);
            this.player.alpha = 0;
        }
    }
      
    update() {
        // Player movement logic
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160); // Move left
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160); // Move right
        } 
        else {
            this.player.setVelocityX(0); // Stop
        }
        if (!this.player.body.blocked.none && this.cursors.up.isDown) {
            this.player.setVelocityY(-170);
        }
        this.enemy.setVelocityX(-50);
        this.enemy2.setVelocityX(-40);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    backgroundColor: '#4a90e2',
    scene: [gameplay, titleScreen, victory]
};

let game = new Phaser.Game(config);