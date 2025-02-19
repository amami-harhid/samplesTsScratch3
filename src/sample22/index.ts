import {Pg,Libs,St,Images,Sounds} from "./importer.js";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける"

Pg.preload = async function preload() {
    this.loadImage('../assets/Jurassic.svg','Jurassic');
    this.loadSound('../assets/Chill.wav','Chill');
    this.loadImage('../assets/cat.svg','Cat');
}
Pg.prepare = async function prepare() {
    St.stage = new Libs.Stage("stage");
    St.stage.addImage( Images.Jurassic );
    St.cat = new Libs.Sprite("Cat", {scale:{x:200,y:200}});//サイズを２倍にしています
    St.cat.addImage( Images.Cat );
}

Pg.setting = async function setting() {

    St.stage.whenFlag(async function(){
        await this.addSound( Sounds.Chill, { 'volume' : 20 } );
        await this.while(true, async ()=>{
            await this.startSoundUntilDone();
        });
    })
    
    // ネコにさわったらお話する
    St.cat.whenFlag( async function(){
        this.__waitTouching = false;
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        this.while(true, async _=>{
            if( this.isMouseTouching() ) {
                this.say(words);
                await this.broadcastAndWait('SPEECH', words, properties, 'male');
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                //await Libs.waitWhile( ()=>this.isMouseTouching()); 
            }else{
                this.say(""); // フキダシを消す
            }
        });
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    St.cat.whenClicked(async function(){
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500}
        if(catSpeeking === false){
            catSpeeking = true;
            await this.broadcastAndWait('SPEECH', words, properties, 'female');
            catSpeeking = false;
        }
    });
    
    St.cat.whenBroadcastReceived('SPEECH', async function(words, properties, gender='male', locale='ja-JP') {
        // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
        const $this:S3Sprite = this;
        await $this.speechAndWait(words, properties, gender, locale);
    });

}