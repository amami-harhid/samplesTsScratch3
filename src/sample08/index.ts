/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Mya: string = "Mya";
const Cat1:string = "Cat1";
const Cat2:string = "Cat2";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat1);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat2.svg', Cat2);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    await cat.Sound.add( Mya );
    // 位置の初期化
    cat.Motion.gotoXY( 0, 0 );
    // 向きの初期化
    cat.Motion.pointInDirection( 40 );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this:S3Stage){
        // 音量= 20
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:S3Sprite){
        // 位置の初期化
        this.Motion.gotoXY( 0, 0 );
        // 向きの初期化
        this.Motion.pointInDirection( 40 );
        // コスチューム
        this.Looks.switchCostume(Cat1);
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite){
        // ずっと繰り返す
        for(;;){
            // 次のコスチュームに切り替える
            this.Looks.nextCostume();
            // ０．１秒待つ
            await this.Control.wait(0.1);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite){
        // ネコが進む速さ
        const catStep = 5;
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと繰り返す
        for(;;){
            // ネコが進む
            this.Motion.moveSteps(catStep);
            // もし端に触れていたら
            if(this.Sensing.isTouchingEdge()){
                // ネコの音を鳴らす
                this.Sound.play(Mya);
            }
            // もし端に触れたら跳ね返る
            this.Motion.ifOnEdgeBounds();
            yield;
        }
    });

}