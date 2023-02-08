//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: path.resolve(__dirname, "./src/index.js"),
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   mode: 'development',
   devServer: {
      static: path.resolve(__dirname, "./src"),
      historyApiFallback: true,
      port: 8081
   },
   module: {
      rules: [
         {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
      ]
   },
   plugins:[
       new HtmlWebpackPlugin({
            template: path.join(__dirname,'/src/index.html')
       })
   ]
}