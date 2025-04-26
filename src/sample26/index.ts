/**
 * sample26
 * スペースキーでコスチューム切り替え
 */
import {Pg, Lib} from "@amami-harhid/tscratch3likejs/s3lib-importer/index.js";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";


Pg.title = "【Sample26】スペースキーでコスチューム切り替え"

const Apple = "Apple";
const Arrow1_a = "Arrow1-a";
const Ballerina_a = "Ballerina-a";
const Balloon1_a = "Balloon1-a";
const Bananas = "Bananas";
const Basketball = "Basketball";
const Bell1 = "Bell1";
const Ben_a = "Ben-a";
const Bowl_a = "Bowl-a";
const Bear_a = "Bear-a";
const Bowtie = "Bowtie";
const Bread = "Bread";
const Broom = "Broom";
const Cake_a = "Cake-a";
const Casey_a = "Casey-a";
const CatFlying_a = "Cat Flying-a";
const Catcher_a = "Catcher-a";
const Chick_a = "Chick-a";
const CityBus_a = "City Bus-a";
const Cloud = "Cloud";
const Crab_a = "Crab-a";
const Crystal_b = "Crystal-b";
const Dinosaur1_a = "Dinosaur1-a";
const Dinosaur2_a = "Dinosaur2-a";
const Dinosaur3_a = "Dinosaur3-a";
const Dinosaur4_a = "Dinosaur4-a";
const Diver2 = "Diver2-a";
const Dog1_a = "Dog1-a";
const Dog2_c = "Dog2-c";
const Donut = "Donut";
const Dorian_a = "Dorian-a";
const Dove_a = "Dove-a";
const Dragon1_b = "Dragon1-b";
const Dragon_a = "Dragon-a";
const Glow_1 = "Glow-1";
const Gobo_a = "Gobo-a";
const Story_Z_3 = "story-Z-3";
const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Rip:string = "Rip";


let stage: S3Stage;
let sprite: S3Sprite;

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic );
    this.Sound.load('../../assets/Chill.wav', Chill );
    this.Sound.load('../../assets/Rip.wav', Rip);
    this.Image.load('../../assets/Apple.svg', Apple);
    this.Image.load('../../assets/Arrow1-a.svg', Arrow1_a);
    this.Image.load('../../assets/Ballerina-a.svg', Ballerina_a);
    this.Image.load('../../assets/Balloon1-a.svg', Balloon1_a);
    this.Image.load('../../assets/Bananas.svg', Bananas);
    this.Image.load('../../assets/Basketball.svg', Basketball);
    this.Image.load('../../assets/Bell1.svg', Bell1);
    this.Image.load('../../assets/Ben-a.svg', Ben_a);
    this.Image.load('../../assets/Bear-a.svg', Bear_a);
    this.Image.load('../../assets/Bowl-a.svg', Bowl_a);
    this.Image.load('../../assets/Bowtie.svg', Bowtie);
    this.Image.load('../../assets/Bread.svg', Broom);
    this.Image.load('../../assets/Bread.svg', Bread);
    this.Image.load('../../assets/Cake-a.svg', Cake_a);
    this.Image.load('../../assets/Casey-a.svg', Casey_a);
    this.Image.load('../../assets/CatFlying-a.svg', CatFlying_a);
    this.Image.load('../../assets/Catcher-a.svg', Catcher_a);
    this.Image.load('../../assets/Chick-a.svg', Chick_a);
    this.Image.load('../../assets/CityBus-a.svg', CityBus_a);
    this.Image.load('../../assets/Cloud.svg', Cloud);
    this.Image.load('../../assets/Crab-a.svg', Crab_a);
    this.Image.load('../../assets/Crystal-b.svg', Crystal_b);
    this.Image.load('../../assets/Dinosaur1-a.svg', Dinosaur1_a);
    this.Image.load('../../assets/Dinosaur2-a.svg', Dinosaur2_a);
    this.Image.load('../../assets/Dinosaur3-a.svg', Dinosaur3_a);
    this.Image.load('../../assets/Dinosaur4-a.svg', Dinosaur4_a);
    this.Image.load('../../assets/Diver2.svg', Diver2);
    this.Image.load('../../assets/Dog1-a.svg', Dog1_a);
    this.Image.load('../../assets/Dog2-c.svg', Dog2_c);
    this.Image.load('../../assets/Donut.svg', Donut);
    this.Image.load('../../assets/Dorian-a.svg', Dorian_a);
    this.Image.load('../../assets/Dove-a.svg', Dove_a);
    this.Image.load('../../assets/Dragon1-b.svg', Dragon1_b);
    this.Image.load('../../assets/Dragon-a.svg', Dragon_a);
    this.Image.load('../../assets/Glow-1.svg', Glow_1);
    this.Image.load('../../assets/Gobo-a.svg', Gobo_a);
    this.Image.load('../../assets/Story-Z-3.svg', Story_Z_3);

}

Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    sprite = new Lib.Sprite("sprite");
    sprite.Looks.hide(); // 非表示
    await sprite.Image.add( Apple );
    await sprite.Image.add( Arrow1_a );
    await sprite.Image.add( Ballerina_a );
    await sprite.Image.add( Balloon1_a );
    await sprite.Image.add( Bear_a );
    await sprite.Image.add( Bell1 );
    await sprite.Image.add( Bowl_a );
    await sprite.Image.add( Bowtie );
    await sprite.Image.add( Broom );
    await sprite.Image.add( Bread );
    await sprite.Image.add( Cake_a );

    await sprite.Image.add( Casey_a );
    await sprite.Image.add( CatFlying_a );
    await sprite.Image.add( Catcher_a );
    await sprite.Image.add( Chick_a );
    await sprite.Image.add( CityBus_a );
    await sprite.Image.add( Cloud );
    await sprite.Image.add( Crab_a );
    await sprite.Image.add( Crystal_b );
    await sprite.Image.add( Dinosaur1_a );
    await sprite.Image.add( Dinosaur2_a );
    await sprite.Image.add( Dinosaur3_a );
    await sprite.Image.add( Dinosaur4_a );

    await sprite.Image.add( Diver2 );
    await sprite.Image.add( Dog1_a );
    await sprite.Image.add( Dog2_c );
    await sprite.Image.add( Donut );
    await sprite.Image.add( Dorian_a );
    await sprite.Image.add( Dove_a );

    await sprite.Image.add( Dragon1_b );
    await sprite.Image.add( Dragon_a );
    await sprite.Image.add( Glow_1 );
    await sprite.Image.add( Gobo_a );
    await sprite.Image.add( Story_Z_3 );

    await sprite.Sound.add( Rip );
    // 縦横 200%のサイズにする
    sprite.Looks.setSize({w:200, h:200}); 

}


Pg.setting = async function setting() {

    
    // 旗が押されたときの動作
    stage.Event.whenFlag(async function*(this:S3Stage){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    
    // 旗が押されたときの動作
    sprite.Event.whenFlag(async function(this:S3Sprite){
        // 初期設定
        this.Motion.gotoXY( 0, 0 );
        // サイズ
        this.Looks.setSize( 200, 200 ); 
        // 表示
        this.Looks.show();
        // 回転しない
        this.Motion.setRotationStyle(Lib.RotationStyle.DONT_ROTATE);
    });

    // 旗が押されたときの動作
    sprite.Event.whenFlag(async function*(this:S3Sprite){
        // スプライトに登録されている画像の名前を配列として取り出す
        const SpriteImageNames = this.Image.names();

        // ずっと繰り返す
        for(;;){
            // イメージ名の配列をシャッフルする（順番をランダムに変える）
            shuffle(SpriteImageNames);
            // イメージ名の配列
            for(const name of SpriteImageNames){
                // スペースキーが押されていない間、待つ
                await this.Control.waitWhile( ()=>Lib.keyIsNotDown('Space'));
                // 音を鳴らす
                this.Sound.play(Rip);
                // コスチュームを切り替える
                this.Looks.switchCostume(name);
                // 0.1秒待つ
                await this.Control.wait(0.1); 
                yield;
            }
            yield;
        }
    });
}
/**
 * 配列をシャッフルする
 * @param array 配列
 */
function shuffle(array: string[]){
    array.sort(() => Math.random() - 0.5);
}
