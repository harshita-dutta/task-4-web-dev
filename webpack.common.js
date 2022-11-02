const path =  require('path'); // To set the path for output and other files
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry point:
    entry: "./src/firebaseUtils.js",

    //  Plugins
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', 
        template: './src/index.html' 
      }),
      new HtmlWebpackPlugin({
        filename:'otherinfo.html', 
        template: './src/otherinfo.html' 
      }),
      new HtmlWebpackPlugin({
        filename:'login.html', 
        template: './src/login.html' 
      })
      // Add your html file plugin for specific files here
      ],


    // CSS loaders 
    module: {
        rules: [
          {
            test: /\.css$/,                     // Regex for .css extension
            use: ["style-loader", "css-loader"] // style-loader(css-loader(main.css))
          },
        ],
      },

        

}
