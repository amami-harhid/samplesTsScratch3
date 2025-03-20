import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;


Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg','Jurassic');
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav','Chill');
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg','Cat');
}
Pg.prepare = async function prepare(this:S3PlayGround) {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat = new Lib.Sprite("Cat", {scale:{x:200,y:200}});//サイズを２倍にしています
    await cat.Image.add( Cat );
}

Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(this:S3Stage){
        await this.Sound.add( Chill );
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        for(;;){
            await this.Sound.playUntilDone();
            yield;
        }
    })
    
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function*(this:S3Sprite){
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        while(true){
            if( this.Sensing.isMouseTouching() ) {
                this.Looks.say(words);
                await this.Event.broadcastAndWait('SPEECH', words, properties, 'male');
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                // await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching()); 
            }else{
                this.Looks.say(""); // フキダシを消す
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    cat.Event.whenClicked(async function(this:S3Sprite){
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500}
        if(catSpeeking === false){
            catSpeeking = true;
            await this.Event.broadcastAndWait('SPEECH', words, properties, 'female');
            catSpeeking = false;
        }
    });
    
    cat.Event.whenBroadcastReceived('SPEECH', 
                    async function(this:S3Sprite, 
                                    words:string, 
                                    properties:{'pitch': number, 'volume': number}, 
                                    gender:string='male', 
                                    locale:string='ja-JP'
                                ) {
        // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
        await this.Extensions.speechAndWait(words, properties, gender, locale);
    });

}