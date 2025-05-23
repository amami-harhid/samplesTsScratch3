/**
 * Sample06 スプライトをタッチしたらＢＧＭを繰返し鳴らす
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample06】スプライトをタッチしたらＢＧＭを繰返し鳴らす";

const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat = new Lib.Sprite( Cat );
    await cat.Image.add( Cat );
    await cat.Sound.add( Chill );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:S3Sprite) {
        // 音量 10
        await cat.Sound.setOption( Lib.SoundOption.VOLUME, 10 );
    });
    
    // スプライト（ネコ）をクリックしたときの動作
    cat.Event.whenClicked( async function*(this:S3Sprite){
        // 「終わるまで音を鳴らす」をずっと繰り返す
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
}
