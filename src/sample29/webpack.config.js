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
