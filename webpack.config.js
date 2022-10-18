const srcPath = path.resolve(__dirname, './src');
const buildPath = path.resolve(__dirname, './src');

module.exports = {
    entry: path.resolve(srcPath, './App/index.ts'),
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
}
