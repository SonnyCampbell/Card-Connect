var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

  var config = {
    // TODO: Add common Configuration
    module: {},
};

let serverConfig = Object.assign({}, config,{
  entry: './server/main.js',
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  output: {
    path: path.join(__dirname),
    filename: 'backend.js',
    libraryTarget : "commonjs"
  },
  externals: nodeModules
});

let clientConfig = Object.assign({}, config,{
    entry: './client/index.js',
    output: {
      path: path.join(__dirname, 'client'),
      filename: 'clientBundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js?/,
                exclude: /node_modules/
            }
        ]
    },
});

module.exports = [
    serverConfig, clientConfig,    	
];