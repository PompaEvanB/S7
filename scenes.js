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

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: '#4a90e2',
    scene: [titleScreen, victory]
};

let game = new Phaser.Game(config);