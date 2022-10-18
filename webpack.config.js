const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.resolve(__dirname, './public/');
const srcPath = path.resolve(__dirname, './src/');
const buildPath = path.resolve(__dirname, './build/');

module.exports = {
    entry: path.resolve(srcPath, 'index.ts'),
    output: {
        path: buildPath,
        filename: 'index_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template:  path.resolve(publicPath, 'index.html'),
      }),
    ],
    resolve: {
        alias: {
           handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
}
