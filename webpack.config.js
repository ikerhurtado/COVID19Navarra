const HtmlWebpackPlugin = require('html-webpack-plugin')

const javascriptRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react']
      }
    }
  }

const stylesRules = {
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
}
 
module.exports = {
    output: {
        filename: 'app.js'
    },
    module: {
      rules: [
        javascriptRules,
        stylesRules
      ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
    },
}