# name

samplesTsScratch3

# Overview
A collection of samples written in TypeScript for using scratch3LikeJsLib.

このレポジトリはメンテを中止します(2025/5/10)。
以降は、https://github.com/amami-harhid/tscratch3likejs
にてメンテを続けます。

# how to use 

[Comparison with Scratch3](./documents/)

# Requirement

- Node ( > v18)
- EsLinker
- @eslint/js, 
- @types/node
- eslint
- glob
- globals
- ts-loader
- typescript
- typescript-eslint
- webpack-cli

# Features

Assisting with JavaScript(TypeScript) programming in the style of Scratch 3.

# Usage

npm install https://github.com/amami-harhid/tscratch3likejs.git --save-dev 

npm install @eslint/js @types/node eslint glob globals ts-loader typescript typescript-eslint webpack-cli --save-dev

# samples

[一覧ページ](https://amami-harhid.github.io/samplesTsScratch3/src/)

# Description

srcディレクトリの下に サブディレクトリを作成し、サブディレクトリ内に index.ts を作成する
サブディレクトリの下には、次のファイルを用意する。

- index.html
- index.ts
- tsconfig.json
- webpack.config.js

## index.html
```html
<title>TscratchJsLibSample</title>
<meta charset="utf-8" />
<link rel="icon" href="data:,">
<script src="../common/scriptLoader.js"></script>
```
## index.ts
```typescript
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
Pg.title = "[description]"
// 画像名
const Jurassic = "Jurassic";
// Stage変数
let stage:S3Stage;
// プレロード部
Pg.preload = function(this:S3PlayGround) {
    // イメージのロード
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}
// プリペア部
Pg.prepare = async function() {
    // ステージインスタンス作成
    stage = new Lib.Stage();
    // イメージの設定
    await stage.Image.add( Jurassic );
}
Pg.setting = function() {
    // ここでイベントを記述する
};
```
## tsconfig.json
```json
{
  "extends": "../../tsconfig",
  "include": ["./*.ts"],
}
```
## webpack.config.js

```javascript
const path = require('path');
const currentDir = __dirname;
const simpleDirName = currentDir.replace(/\\/g,'/').replace(/^.+\//, '');
module.exports = {
    extends: require.resolve('../../base-webpack.config.js'),
    output: {
        path: path.resolve(__dirname, "../../build/"+simpleDirName),
        filename: './bundle.js',
    },
}
```
## webpack
### コンパイルする場所にて(webpack)
npx webpack --mode development

### 全部をコンパイル(webpack)

トップディレクトリにて、
node ./build.js

#### build.js

```javascript
const fs = require('fs');
const {glob} = require('glob');
const { execSync } = require('child_process');

const entries = glob.sync('./src/**/index.ts');
const absolutePath = fs.realpathSync('./');
const npxWebpack = "npx webpack --mode development"
const dirArr = [];
try{
    for(const _entry of entries){
        const directory = _entry.replace('src\\','').replace(/\\.*.ts$/,'');
        dirArr.push(directory);
    }
    dirArr.sort();
    for(const _dir of dirArr){
        console.log(_dir)
        const workingDir = absolutePath+'/src/'+_dir;
        process.chdir(workingDir);
        execSync(npxWebpack);
    }
    
}catch(e){
    throw e;
}
```

### buildされたbundle.js

buildディレクトリの下にソースディレクトリと同名のディレクトリを作り、webpackされたbundle.jsを格納される。

# Author

amami-harhid

# Licence

[AGPL-3](https://www.gnu.org/licenses/agpl-3.0.en.html)

