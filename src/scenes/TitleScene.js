import {Scene, Display, SPACE} from 'phaser';
import {calculateSize} from '../game';
import Jacob from '../sprites/Jacob';

/**
 * The title scene is presented to the user first and gives them
 * the option to start the game.
 */
class TitleScene extends Scene {
    constructor(test) {
        super({key: 'TitleScene'});
    }
    create() {
        const {width, height} = calculateSize();
        this.scene.bringToTop();
        this.add.image(width / 2, height / 2, 'water').setScale(10, 2);
        this.platforms = this.physics.add.staticGroup();
        this.platforms
            .create(0, height, 'ground')
            .setScale(10, 0.5)
            .refreshBody();

        this.title = this.add.text(width / 10, height / 10, 'Jacob Loves \n Ding Dongs', {
            fontSize: width / 10 + 'px',
            fill: '#fff',
        });
        this.subtitle = this.add.text(width / 10);

        this.pressStart = this.add.text(0, 0, 'TAP TO START', {
            fontSize: '16px',
            fill: '#fff',
        });
        Display.Align.In.TopCenter(this.title, this.add.zone(width / 2, height - height / 4, width, height));
        Display.Align.In.BottomCenter(this.pressStart, this.add.zone(width / 2, height / 4, width, height));
        this.start = false;
        this.input.on('pointerdown', (pointer) => {
            this.start = true;
        });
        this.jacob = new Jacob({
            scene: this,
            key: 'jacob',
            x: width / 2,
            y: height,
        });
    }

    update() {
        if (this.start) {
            this.scene.start('GameScene');
        }
    }
}

export default TitleScene;
