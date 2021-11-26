var path = require("path")
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist", "assets"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js)$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ["@babel/preset-env", "@babel/preset-react"]},
        },
    {
        test: /\.(s[ca]ss)$/, use: [ "file-loader", "extract-loader", "sass-extract-loader", "sass-loader"], 
    },
    {
         test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file-loader?name=/fonts/[name].[ext]"
    },
]
    }
}