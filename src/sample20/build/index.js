/**
 * Sample20
 * メッセージを送信受信し、フキダシ(SAY,THINK)を制御する
 * メッセージはEventEmitterを使い実装している。
 * EventEmitterは同一IDの受信(on)の定義は10個までの制限があるが、
 * 『whenBroadcastReceived』を使うことで、同一IDの受信登録数について
 * 実装上の上限はない（ただし受信登録数が極端に多いときは動きが遅くなるかも）
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "Sample20】二匹のネコ、メッセージを送信受信して会話";
const BackDrop = "BackDrop";
const Cat1 = "Cat";
const Cat2 = "Cat";
let stage;
let cat;
let cat2;
import { bubbleTextArr, bubbleTextArr2, MessageCat1Say, MessageCat2Say, MessageCat2Think, MessageByeBye, MessageTAIJYO } from './bubble.js';
Pg.preload = async function preload($this) {
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/backdrop.png', BackDrop);
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat1);
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat2.svg', Cat2);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(BackDrop);
    cat = new Lib.Sprite("Cat");
    cat.Motion.setRotationStyle(Lib.RotationStyle.LEFT_RIGHT);
    await cat.Image.add(Cat1);
    await cat.Image.add(Cat2);
    cat.Motion.moveTo({ x: -150, y: 0 });
    cat.Motion.pointInDirection(90);
    cat2 = new Lib.Sprite("Cat2");
    cat2.Motion.setRotationStyle(Lib.RotationStyle.LEFT_RIGHT);
    await cat2.Image.add(Cat1);
    await cat2.Image.add(Cat2);
    cat2.Motion.pointInDirection(-90);
    cat2.Motion.moveTo({ x: 150, y: 0 });
};
Pg.setting = async function setting() {
    const BubbleScale = { scale: { x: 100, y: 100 } };
    stage.Event.whenFlag(async function () {
        // 1秒待つ
        await this.Control.wait(1); // 1秒待つ
        // (↓)順番にメッセージを送って待つ
        //(左) "こんにちは。良い天気ですね" (3秒間)
        await this.Event.broadcastAndWait(MessageCat1Say, bubbleTextArr[0], 3);
        //(右) "💚こんにちは💚青空がよい感じですね" (1秒間)
        await this.Event.broadcastAndWait(MessageCat2Say, bubbleTextArr2[0], 1);
        //(右) "どこにおでかけですか" (2秒間)
        await this.Event.broadcastAndWait(MessageCat2Say, bubbleTextArr2[1], 2);
        //(左) "ちょっと近くのスーパーに買い物にいくんですよ" (1秒間)
        await this.Event.broadcastAndWait(MessageCat1Say, bubbleTextArr[1], 1);
        //(右) "あらあらそれはいいですね" (4秒間)
        await this.Event.broadcastAndWait(MessageCat2Think, bubbleTextArr2[2], 4);
        // それではまた！ (2秒間) 
        await this.Event.broadcastAndWait(MessageByeBye, "それでは、また！", 2);
        // 退場する
        this.Event.broadcast(MessageTAIJYO);
    });
    // MessageCat1Say を受け取る。引数は受け取らずに 上下に変化させるだけ。
    cat.Event.whenBroadcastReceived(MessageCat1Say, async function* () {
        // 上下に揺らす。
        for (let count = 0; count < 10; count++) {
            this.Motion.changeY(+2);
            yield;
        }
        for (let count = 0; count < 10; count++) {
            this.Motion.changeY(-2);
            yield;
        }
    });
    // MessageCat1Say を受け取る。引数を受け取り、フキダシを表示する。
    cat.Event.whenBroadcastReceived(MessageCat1Say, async function (text, time) {
        const self = this;
        // Cat の フキダシ を出す
        if (time > 0) {
            await self.Looks.sayForSecs(text, time, BubbleScale);
        }
        else {
            self.Looks.say(text);
        }
    });
    // MessageTAIJYO を受け取る。引数を受け取り、フキダシを表示したあと、退場する
    cat.Event.whenBroadcastReceived(MessageTAIJYO, async function* () {
        const self = this;
        // Cat 退場
        self.Looks.say('');
        self.Motion.turnRightDegrees(180); // 反対方向へ
        for (;;) {
            self.Motion.moveSteps(5);
            if (self.Sensing.isTouchingEdge()) {
                break;
            }
            yield;
        }
        self.Looks.hide();
    });
    // MessageTAIJYO を受け取る。引数を受け取り、フキダシを表示したあと、退場する
    cat2.Event.whenBroadcastReceived(MessageTAIJYO, async function* () {
        const self = this;
        // Cat2 退場
        //console.log('Cat2 退場');
        self.Looks.say('');
        self.Motion.turnRightDegrees(180); // 反対方向へ
        for (;;) {
            self.Motion.moveSteps(5);
            if (self.Sensing.isTouchingEdge()) {
                break;
            }
            yield;
        }
        self.Looks.hide();
    });
    // MessageCat2Say を受け取る。引数は受け取らずに 上下に変化させるだけ。
    cat2.Event.whenBroadcastReceived(MessageCat2Say, async function* () {
        // 上下に揺らす。
        for (let count = 0; count < 10; count++) {
            this.Motion.changeY(+2);
            yield;
        }
        for (let count = 0; count < 10; count++) {
            this.Motion.changeY(-2);
            yield;
        }
    });
    // MessageCat2Say を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageCat2Say, async function (text = "", time = -1) {
        // Cat2 の フキダシ を出す
        if (time > 0) {
            await this.Looks.sayForSecs(text, time, BubbleScale);
        }
        else {
            this.Looks.say(text);
        }
    });
    // MessageCat2Think を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageCat2Think, async function (text = "", time = -1) {
        // Cat2 の フキダシ を出す
        //console.log('CAT2 フキダシ time='+time + " text="+text);
        if (time > 0) {
            await this.Looks.thinkForSecs(text, time);
        }
        else {
            this.Looks.think(text);
        }
    });
    // MessageByeBye を受け取る。引数を受け取り、フキダシを表示する。
    cat.Event.whenBroadcastReceived(MessageByeBye, async function (text = "", time = -1) {
        // それでは、という
        //console.log('CAT フキダシ time='+time + " text="+text);
        await this.Looks.thinkForSecs(text, time);
    });
    // MessageByeBye を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageByeBye, async function (text = "", time = -1) {
        // それでは、という
        //console.log('CAT2 フキダシ time='+time + " text="+text);
        await this.Looks.sayForSecs(text, time);
    });
};
//# sourceMappingURL=index.js.map