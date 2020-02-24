const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jpg'],//чтобы в ручную в импортах не писать .exten
    alias: {
      '@App': path.resolve(__dirname, 'src/App'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './main/index.html'
    }),
    new CleanWebpackPlugin()

  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']

      }, {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }, {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }, {
        test: /\.xml$/,
        use: ['xml-loader']
      }

    ]
  },





}




