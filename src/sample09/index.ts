/**
 * Sample09 スプライトをクリックしたらクローンを作る。
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample09】スプライトをクリックしたらクローンを作る。端に触れたらミャーとないて折り返す。";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const Mya:string = "Mya";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = async function preload($this: S3PlayGround) {
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    $this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
    $this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite( "Cat" );
    await cat.Image.add( Cat );
    await cat.Sound.add( Mya );
}

// 向き
const direction01 = 1; // 実験としてグローバル変数とする

// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this:S3Stage){
        // 音量= 50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        };
    });
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:S3Sprite){
        // 初期化
        this.Motion.gotoXY( 0, 0 );  // 配置中央
        this.Motion.pointInDirection( 90 );  // 向き90度
        // ネコの音を 音量=20 とする
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
    });
    
    // 向き
    const direction02 = 1; // { }の外側のスコープを参照できることの実証
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite) {
        // ずっと繰り返す
        for(;;){
            // 右向きに回転する
            this.Motion.turnRightDegrees(direction01+direction02);
            yield;
        }
    });
    // タッチされたときの動作(ネコ)
    cat.Event.whenClicked( async function (this:S3Sprite) {
        // スプライトをクリックしたらクローンを作る
        this.Control.clone();
    });

    const catStep = 10;
    // クローンされたときの動作(ネコ)
    cat.Control.whenCloned( async function*(this:S3Sprite) {
        // 表示する
        this.Looks.show();
        // ずっと繰り返す
        for(;;){
            // 進む。
            this.Motion.moveSteps(catStep);
            // 端に触れたら跳ね返る
            this.Motion.ifOnEdgeBounds();
            // 端にタッチしたとき
            if(this.Sensing.isTouchingEdge() ){
                // ミャーと鳴く。
                this.Sound.play(Mya)
            }        
            yield;
        }
    });
}