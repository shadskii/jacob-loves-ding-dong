import {Scene} from 'phaser';
import Seal from '../sprites/Seal';
import Fish from '../sprites/Fish';

const MISS_LIMIT = 3;
const MISS = 'X';

/**
 * This is the primary scene. The game is played during this scene.
 */
class GameScene extends Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.add.image(this.width / 2, this.height / 2, 'water').setScale(10, 2);
        this.add.image(this.width / 2, 'derp-cloud');
        this.platforms = this.physics.add.staticGroup();
        this.platforms
            .create(0, this.height, 'ground')
            .setScale(10, 0.5)
            .refreshBody();

        this.score = 0;
        this.numMissed = 0;
        this.scoreText = this.add.text(24, 24, `${this.score} ${MISS.repeat(MISS_LIMIT - this.numMissed)}`, {
            fontSize: '32px',
            fill: '#fff',
        });

        this.x = this.width / 2;
        this.seal = new Seal({
            scene: this,
            key: 'seal',
            x: this.x,
            y: this.height,
        });

        this.fishies = this.add.group();

        this.time.addEvent({
            delay: 400,
            callback: () => this.addFishBetween(0, 20),
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: 200,
            callback: () => this.addFishBetween(20, 150),
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: 160,
            callback: () => this.addFishBetween(151, 250),
            callbackScope: this,
            loop: true,
        });

        this.input.on(
            'pointerdown',
            (pointer) => {
                this.x = pointer.x;
            },
            this
        );
        this.input.on(
            'pointermove',
            (pointer) => {
                this.x = pointer.x;
            },
            this
        );
    }

    update() {
        this.seal.update(this.x);
        this.fishies.children.entries.forEach((element) => {
            element.update();
        });
        if (this.numMissed > MISS_LIMIT) {
            this.scene.start('GameOverScene', {score: this.score});
        }
    }

    enemySpawnXValue() {
        let range = this.width * 0.9;
        let pad = this.width * 0.02;
        return Math.floor(Math.random() * range) + pad;
    }

    addFish() {
        this.fishies.add(
            new Fish({
                scene: this,
                key: 'fish',
                x: this.enemySpawnXValue(),
                y: -this.height / 4,
            })
        );
    }
    addFishBetween(min, max) {
        if (this.score >= min && this.score <= max) {
            this.addFish();
        }
    }
    incrementScore() {
        this.score++;
        this.updateScoreText();
    }

    incrementMiss() {
        this.numMissed++;
        this.updateScoreText();
    }

    updateScoreText() {
        let num = MISS_LIMIT - this.numMissed;
        num = num >= 0 ? num : 0;
        this.scoreText.setText(`${this.score} ${MISS.repeat(num)}`);
    }
}

export default GameScene;
