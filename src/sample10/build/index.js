/**
 * Sample10
 * スプライトのクローンを作る（スプライトに触ったらクローンを作る）
 * クローンされたら動きだす（端に触れたらミャーとないて折り返す）
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample10】スプライトに触ったらクローンを作る(5秒で死ぬ)";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const Mya = "Mya";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat");
    await cat.Image.add(Cat);
    cat.Motion.gotoXY({ x: 200, y: 150 });
    cat.Motion.pointInDirection(90);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function () {
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
    });
    stage.Event.whenFlag(async function* () {
        while (true) {
            await this.Sound.playUntilDone();
            yield;
        }
    });
    cat.Event.whenFlag(async function () {
        // 音を登録する
        await this.Sound.add(Mya);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
    });
    cat.Event.whenFlag(async function () {
        // 初期化
        this.Motion.gotoXY({ x: 200, y: 150 });
        this.Motion.pointInDirection(90);
    });
    const _changeDirection = 1;
    cat.Event.whenFlag(async function* () {
        // ずっと繰り返して回転する
        while (true) {
            this.Motion.turnRightDegrees(_changeDirection); // 外側Scope 参照可能
            yield;
        }
    });
    cat.Event.whenFlag(async function* () {
        // 次をずっと繰り返す
        // マウスカーソルでタッチしたら、クローンを作る
        while (true) {
            if (this.Sensing.isMouseTouching()) {
                await this.Control.clone();
            }
            // マウスタッチしないまで待つ
            await this.Control.waitWhile(() => this.Sensing.isMouseTouching());
            yield;
        }
    });
    const steps = 10;
    cat.Control.whenCloned(async function* () {
        const clone = this;
        this.Motion.gotoXY({ x: 100, y: -100 });
        clone.Looks.setSize({ x: 50, y: 50 });
        clone.Looks.setEffect(Lib.ImageEffective.COLOR, 50);
        clone.life = 5000; // 約5秒
        clone.Looks.show();
        // ずっと繰り返す
        while (true) {
            clone.Motion.moveSteps(steps);
            // 端に触れたら
            clone.Motion.ifOnEdgeBounds();
            if (clone.Sensing.isTouchingEdge()) {
                // ミャーと鳴く。
                clone.Sound.play();
            }
            if (clone.life < 0) {
                break;
            }
            yield;
        }
        clone.Control.remove();
    });
};
//# sourceMappingURL=index.js.map