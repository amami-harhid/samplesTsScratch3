/**
 * sample24
 * 上下・左右に移動を繰り返す
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";


Pg.title = "【Sample24】上下・左右に移動を繰り返す"

const NeonTunnel:string = "NeonTunnel";
const Chill:string = "Chill";
const BallA:string = "BallA";

let stage: S3Stage;
let ball: S3Sprite

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('../../assets/Neon Tunnel.png', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/ball-a.svg', BallA );
}
Pg.prepare = async function prepare() {

    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( NeonTunnel );
    // Chill を追加
    await stage.Sound.add( Chill );

    // スプライト(ball)を作る
    ball = new Lib.Sprite("ball");
    // コスチュームを追加
    await ball.Image.add( BallA );
    // 大きさを 横120%,縦120% にする
    ball.Looks.setSize( 120, 120 );
}

Pg.setting = async function setting() {

    /**
     * 旗を押されたときの動作
     * 音を追加して、STARTメッセージを送る
     */
    stage.Event.whenFlag(async function(this:S3Stage){
        // 音量を 5にする
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });
    /**
     * START を受け取ったときの動作
     * ずっと繰返し音を鳴らす
     */
    stage.Event.whenBroadcastReceived('START', async function*(this:S3Stage){

        // ずっと繰り返す
        for(;;){
            // 終わるまで鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    /**
     * 旗を押されたときの動作
     * 位置の初期化、サイズの初期化
     */
    ball.Event.whenFlag(async function(this:S3Sprite){
        this.Motion.gotoXY( 0, 0 );
        this.Looks.setSize( 120, 120 );
    });

    /**
     * START を受け取ったときの動作
     * 上下に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function*(this:S3Sprite){
        
        // 上に5回移動
        for(const _ of Lib.Iterator(5)){
            this.Motion.changeY(+10);
            yield;
        }
        // ずっと繰り返す
        for(;;){
            // 下に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.changeY(-10);
                yield;
            }
            // 上に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.changeY(+10);
                yield;
            }
            yield;
        }
    });
    /**
     * START を受け取ったときの動作
     * 左右に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function*(this:S3Sprite){
        
        // 右に5回移動
        for(const _ of Lib.Iterator(5)){
            this.Motion.changeX(+10);
            yield;
        }
        // ずっと繰り返す
        for(;;){
            // 左に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.changeX(-10);
                yield;
            }
            // 右に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.changeX(+10);
                yield;
            }
            yield;
        }
    });
    

}
