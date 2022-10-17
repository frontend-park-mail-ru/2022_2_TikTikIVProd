const path = require('path');

const buildPath = path.resolve(__dirname, 'src');


module.exports = {
    entry: path.resolve(__dirname,'./src/index.ts'),
    output: {
        path: buildPath,
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'babel-loader'
            }
        ]
    }
}