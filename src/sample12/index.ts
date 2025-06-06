/**
 * Sample12
 * スプライト（CAT)を クリックした場所へ移動する
 */

import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";
import type {S3Point} from "@typeJS/s3Point";

Pg.title = "【Sample12】クリックした場所へ移動する"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY( 0, 0 );
    await cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this:S3Stage ) {
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // ステージをクリックしたときの動作
    stage.Event.whenClicked(async function(this:S3Stage) {
        // マウスカーソルの位置を取得する
        const mousePosition = Lib.mousePosition;
        // 取得した位置へ移動する
        this.Event.broadcast('MOUSE_CLICK', mousePosition);
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag(async function( this:S3Sprite ){
        this.Motion.gotoXY( 0, 0 );
    });

    // メッセージ(MOUSE_CLICK)を受け取ったときの動作
    cat.Event.whenBroadcastReceived('MOUSE_CLICK', 
        async function(this:S3Sprite, mousePosition:S3Point){
            this.Motion.gotoXY(mousePosition.x, mousePosition.y);
        }
    );

}