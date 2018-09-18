import Phaser from 'phaser';

/**
 * A hungry yet lovable loaf 
 */
export default class Seal extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.alive = true;
        this.body.setCollideWorldBounds(true);
        this.setScale(.15, .15);

    }

    update(x) {
        this.x = x;
    }
}
