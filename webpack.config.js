const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }


  return config
}

function cssLoaders(extraLoader) {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    }, 'css-loader'
  ]

  if (extraLoader) {
    loaders.push(extraLoader)
  }

  return loaders
}

function babelOptions(preset) {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

function jsLoaders() {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}


module.exports = /*(env, options)*/() => {



  console.log('Production: ', isProd)
  console.log('Development: ', isDev)

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './main/index.jsx']
    },
    output: {
      filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      port: 8081,
      hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    resolve: {
      extensions: ['.js', '.jpg'],//чтобы в ручную в импортах не писать .exten
      alias: {
        '@App': path.resolve(__dirname, 'src/App'),
        '@': path.resolve(__dirname, 'src'),
      }
    },
    optimization: optimization(),
    plugins: [
      new HTMLWebpackPlugin({
        template: './main/index.html',
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]),
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].[hash].css'
      })

    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: jsLoaders(),
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')

          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react')

          },
        },
        {
          test: /\.css$/,
          use: cssLoaders()

        },
        {
          test: /\.less$/,
          use: cssLoaders('less-loader')

        },
        {
          test: /\.s[ac]ss$/,
          use: cssLoaders('sass-loader')

        },
        {
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
    }
  }
}




