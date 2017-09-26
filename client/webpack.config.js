const webpack = require("webpack")
const path = require('path');

// Set up the ENVIRONMENT variable
const NODE_ENV = process.env.NODE_ENV || "development";

const ProvidePluginConfig = new webpack.ProvidePlugin({
  'React': 'react',
  'ReactDOM': 'react-dom',
  'classnames' : 'classnames'
});

const cssModulesLoader = [
  'css-loader?modules=true',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2016', 'stage-1', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          cssModulesLoader,
          'sass-loader?sourceMap'
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [ProvidePluginConfig]
};

if (NODE_ENV === "production") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_console: true
      }
    })
  )
}