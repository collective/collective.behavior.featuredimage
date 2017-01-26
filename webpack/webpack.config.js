var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'main.js',
    path: '../src/collective/behavior/featuredimage/static'
  },
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?importLoaders=1!postcss-loader'
      })
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file-loader?name=[name].[ext]',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
    }]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true })
  ]
}
