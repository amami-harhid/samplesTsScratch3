/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";


Pg.title = "【Sample23】ボールがパドルに触れたら跳ね返る"

const NeonTunnel:string = "NeonTunnel";
const Chill:string = "Chill";
const BallA:string = "BallA";
const Paddle:string = "Paddle";
const Block:string = "Block";
const Line:string = "Line";
const Pew: string = "Pew";
const YouWon: string = "YouWon";
const GameOver: string = "GameOver";

let stage: S3Stage;
let ball: S3Sprite, paddle: S3Sprite, block:S3Sprite, line:S3Sprite;
let title: S3Sprite;

let score = 0;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('../../assets/Neon Tunnel.png', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/ball-a.svg', BallA );
    this.Image.load('../../assets/Paddle.svg', Paddle );
    this.Image.load('../../assets/Button3-b.svg', Block );
    this.Image.load('../../assets/Line.svg', Line );
    this.Sound.load(AssetHost+'/assets/Pew.wav', Pew);
    this.Image.load('../../assets/YouWon.svg', YouWon );
    this.Image.load('../../assets/GameOver.svg', GameOver );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( NeonTunnel );
    await stage.Sound.add( Chill );
    ball = new Lib.Sprite("cat");
    await ball.Image.add( BallA );
    //ball.Motion.setXY(0,-100);
    ball.Looks.setSize(50, 50);
    paddle = new Lib.Sprite("paddle");
    await paddle.Image.add( Paddle );
    paddle.Motion.setXY(0, -140);
    block = new Lib.Sprite( "block");
    await block.Image.add( Block );
    await block.Sound.add(Pew);
    block.Motion.setXY(-220,180);
    block.Looks.hide();
    line = new Lib.Sprite( "line" );
    await line.Image.add( Line );
    line.Motion.setXY(0, -180);
    title = new Lib.Sprite("title");
    await title.Image.add(YouWon);
    await title.Image.add(GameOver);
    title.Looks.hide();
}

Pg.setting = async function setting() {
    stage.Event.whenFlag(async function*(this:S3Stage){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    ball.Event.whenFlag(async function(this:S3Sprite){
        this.Motion.setXY(0,-100);
    });
    
    const BallSpeed = 10;
    const InitDirection = 25;
    ball.Event.whenBroadcastReceived('Start', async function*(this:S3Sprite){
        score = 0;
        this.Motion.pointInDirection(InitDirection);
        this.Motion.setXY(0,-100);
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        for(;;){
            this.Motion.moveSteps(BallSpeed);
            this.Motion.ifOnEdgeBounds();
            if(this.Sensing.isTouchingEdge()){
                const randomDegree = Lib.getRandomValueInRange(-25, 25);
                this.Motion.turnRightDegrees(randomDegree);    
            }
            yield;
        }
    });
    ball.Event.whenBroadcastReceived('Start', async function*(this:S3Sprite){
        while(true){
            if(this.Sensing.isTouchingTarget(block)){
                this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-5, 5)+180 );
            }
            yield;
        }
    });
    ball.Event.whenBroadcastReceived('Start', async function*(this:S3Sprite){
        for(;;){
            if( this.Sensing.isTouchingTarget(paddle)){
                this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-2, 2)+180 );
                this.Motion.moveSteps(BallSpeed*2);
                await this.Control.wait(0.2); // 0.2秒待つ
            }
            yield;
        }
    });
    line.Event.whenFlag(async function*(this:S3Sprite){
        for(;;){
            if( this.Sensing.isTouchingTarget(ball)){
                // Ball に触れたとき
                this.Event.broadcast(GameOver);
                break;
            }
            yield;
        }
    });
    paddle.Event.whenBroadcastReceived('Start', async function*(this:S3Sprite){
        while(true){
            const mousePos = Lib.mousePosition;
            const selfPosition = this.Motion.getCurrentPosition();
            this.Motion.moveTo(mousePos.x, selfPosition.y);
            //const ballPosition = ball.Motion.getCurrentPosition();
            //this.Motion.moveTo(ballPosition.x, selfPosition.y);
            yield;
        }
    });

    let blockCount = 0;
    block.Event.whenFlag( async function*(this:S3Sprite){
        this.Looks.setSize({w:50, h:50});
        const pos = this.Motion.getCurrentPosition();
        const demension = this.Looks.drawingDimensions();
        blockCount = 0;
        for(let y=0; y<3; y++){
            for(let x=0; x<10; x++){
                const blkPos = { x: pos.x + x*demension.width, y: pos.y + (-y)*demension.height };
                await this.Control.clone({position: blkPos});
                yield;
            }
            yield;
        }
        this.Event.broadcast('Start');
    });
    block.Control.whenCloned(async function*(this:S3Sprite){
        blockCount+=1;
        this.Looks.show();
        while(true){
            if(this.Sensing.isTouchingTarget(ball)){
                score += 1;
                this.Sound.play(Pew);
                this.Looks.hide();
                break;
            }    
            yield;
        }
        if(score == blockCount) {
            this.Event.broadcast(YouWon);
        }
        this.Control.remove();
    })
    title.Event.whenFlag(async function(this:S3Sprite){
        this.Looks.hide();
    })
    title.Event.whenBroadcastReceived(YouWon, async function(this:S3Sprite){
        this.Looks.switchCostume(YouWon);
        this.Looks.show();
        Pg.Control.stopAll();
    });
    title.Event.whenBroadcastReceived(GameOver, async function(this:S3Sprite){
        this.Looks.switchCostume(GameOver);
        this.Looks.show();
        Pg.Control.stopAll();
    });

}