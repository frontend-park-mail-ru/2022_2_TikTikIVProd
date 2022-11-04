const path = require('path');

const buildPath = path.resolve(__dirname, 'public');


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
                use: 'babel-loader',
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.hbs/,
                use: 'handlebars-loader',
            }
        ]
    }
}