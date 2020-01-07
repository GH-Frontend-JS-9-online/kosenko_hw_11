// подключить модуль для управления путями
const path = require("path");
// подключить модуль webpack
const webpack = require("webpack");

//дополнительные плагины
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//настройка модуля
module.exports = {
    //базовый путь к проэкту
    context: path.resolve(__dirname, 'src'),
    //настройка точек входа JS
    entry: {
        //oсновной файл приложения
        main: [
            './main.js',
            './assets/styles/style.scss',
        ],
    },
    //путь для собраных файлов
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
    },
    //конфигурация devServer
    devServer: {
        contentBase: './src'
    },

    module: {
        rules: [
            //.SCSS
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: { sourceMap: true }
                    // },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    // 'style-loader',
                ],
            },
            // images
            {
                test: /\.(png|svg|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: { name: 'images/[name].[ext]' }
                    },
                    'img-loader',
                ]
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: { name: '[path][name].[ext]' }
                    },
                ]
            },
            //svg
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),

        new CleanWebpackPlugin(),

        new CopyWebpackPlugin(
            [
                { from: './assets/images', to: 'images' },
                { from: 'index.html', to: 'index.html' }
            ],

            {
                ignore: [
                    {glob: 'svg/*'},
                ]
            }
        ),
    ],
}