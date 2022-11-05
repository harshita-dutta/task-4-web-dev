const path =  require('path'); // To set the path for output and other files
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry point:
    // entry: "./src/js/firebaseUtils.js",
    entry: {
      firebaseUtils: './src/js/firebaseUtils.js',
      formUtils: './src/js/formUtils.js',
    },

    //  Plugins
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', 
        template: './src/index.html' 
      }),
      new HtmlWebpackPlugin({
        filename:'mainpage.html', 
        template: './src/templates/mainpage.html' 
      }),
      new HtmlWebpackPlugin({
        filename:'passpage.html', 
        template: './src/templates/passpage.html' 
      }),
      new HtmlWebpackPlugin({
        filename:'eventform.html', 
        template: './src/templates/eventform.html',
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
