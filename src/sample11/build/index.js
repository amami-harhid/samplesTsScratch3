/**
 * Sample11
 * スプライト（CAT)を １秒で「どこかの」場所へ移動する
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample11】１秒で「どこかの」場所へ移動する";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY({ x: 0, y: 0 });
    await cat.Image.add(Cat);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function* () {
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 10);
        while (true) {
            await this.Sound.playUntilDone();
            yield;
        }
    });
    cat.Event.whenFlag(async function* () {
        while (true) {
            // 繰り返すごとに 1秒待つ
            await this.Control.wait(1);
            // １秒でどこかへ行く
            const randomPoint = Lib.randomPoint;
            await this.Motion.glideToPosition(1, randomPoint.x, randomPoint.y);
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map