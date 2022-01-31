const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[chunkhash].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            modules: './src/app/modules',
            utils: path.resolve(__dirname, 'src/app/utils/'),
            "@": path.resolve(__dirname, 'src')
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {test: /\.(pug|jade)$/, loader: 'pug-loader'},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html' // тут путь index.html
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3000
    }
};
