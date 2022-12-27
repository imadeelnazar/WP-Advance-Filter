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
            }
        ]
    }
};