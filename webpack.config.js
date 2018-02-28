const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src/index'
    ],
    module: {
        loaders: [
            {test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader'},
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    target: "electron"
};
