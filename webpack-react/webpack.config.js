const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 를 추출해서 파일로 저장하는 플러그인

/**
 * [1] entry
 *  -  웹펙이 빌드할 파일을 알려줌
 *  -  src/test.js 파일 기준으로 import 되어 있는 모든 파일들을 찾아 하나의 파일로 합침
 * [2] output
 *  - 웹팩에서 빌드를 완료하면 output에 명시되어 있는 정보를 통해 빌드 파일을 생성
 * [3] mode
 *  - production : 최적화 빌드
 *  - development : 빠르게 빌드
 *  - none : 아무 기능 없이 웹팩으로 빌드
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/build")
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.(js||jsx)$/,
                exclude: "/node_modules",
                use: ["babel-loader"]
            },
            {
                test: /\.html$/, // 갖고 올 파일 정규식
                use: [
                    {
                        loader: "html-loader", // 사용할 로더 이름
                        options: { minimize: true } // 사용할 로더 옵션 (minimize 옵션은 빌드가 한줄로 됨)
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ // HtmlWebpackPlugin은 웹팩 빌드시 output에 있는 bundle.js를 자동으로 import
            template: './public/index.html', // public/index.html 파일을 읽는다
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}