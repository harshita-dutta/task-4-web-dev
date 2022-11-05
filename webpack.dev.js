const path =  require('path'); // To set the path for output and other files
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common,{
    // Mode of Operation:
    mode: "development",
    // Output point:
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
    },
}) 