module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: 'url-loader?limit=100000'
            },
        ]
    }
};