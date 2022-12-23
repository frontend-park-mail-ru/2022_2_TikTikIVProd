const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

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
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(handlebars|hbs)$/,
                use: "handlebars-loader"
            },
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(publicPath, 'index.html'),
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({})
    ],
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        },
        extensions: ['.js', '.ts', '.json', 'handlebars', 'hbs'],
    },
}
