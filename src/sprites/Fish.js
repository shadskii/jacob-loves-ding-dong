import { GameObjects } from 'phaser';

/**
 * Debatably delicious but definitely edible.
 */
export default class extends GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.seal = this.scene.seal;
        this.scene.physics.add.collider(this, this.seal, this.getEaten, this.getEaten, this);
        this.body.velocity.y = 50;

        this.body.acceleration.y = 9.8;
        this.body.setAllowGravity(true);
        this.setScale(0.25, 0.25);
        this.eaten = false;
    }

    getEaten() {
        this.eaten = true;
    }

    update() {
        if (this.eaten) {
            this.scene.incrementScore();
            this.destoryFish();
        } else if (this.y > this.scene.height * 1.2) {
            this.scene.incrementMiss();
            this.destoryFish();
        }
    }

    destoryFish() {
        this.scene.fishies.remove(this);
        this.destroy();
    }
}
